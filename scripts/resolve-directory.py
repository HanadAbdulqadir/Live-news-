"""Resolve broadcasters to verified YouTube channels.

Reads a `country|broadcaster|category|website` table, searches YouTube for each
broadcaster, and accepts a channel only when its own title or handle clearly
matches the broadcaster name. Anything that does not match confidently is
written out with no channel at all — the app then shows a link instead of a
player, which is the whole point: a guessed channel ID is worse than none.

    python scripts/resolve-directory.py data/broadcasters.psv data/resolved.psv

Output columns:
    country|broadcaster|category|website|channelId|live|channelTitle|confidence
"""

import concurrent.futures as futures
import gzip
import io
import json
import re
import sys
import urllib.parse
import urllib.request

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
TIMEOUT = 30

# Handles ending in a run of digits are the classic mirror/impostor pattern
# (@sabcnews4207 next to the real @sabcdigitalnews).
SUSPICIOUS_HANDLE = re.compile(r"\d{3,}$")

PIPE_OR_SPACE = re.compile(r"[|\s]+")

STOPWORDS = {"tv", "news", "channel", "official", "the", "network", "live",
             "television", "radio", "broadcasting", "media", "hd"}


def fetch(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip",
    })
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        raw = resp.read()
    if resp.headers.get("Content-Encoding") == "gzip":
        raw = gzip.GzipFile(fileobj=io.BytesIO(raw)).read()
    return raw.decode("utf-8", "replace")


def normalise(text):
    return re.sub(r"[^a-z0-9]+", "", text.lower())


def tokens(text):
    return {t for t in re.split(r"[^a-z0-9]+", text.lower()) if t and t not in STOPWORDS}


def score(broadcaster, title):
    """0.0-1.0 confidence that `title` is the broadcaster's own channel."""
    nb, nt = normalise(broadcaster), normalise(title)
    if not nb or not nt:
        return 0.0
    if nb == nt:
        return 1.0
    if nb in nt or nt in nb:
        return 0.9
    tb, tt = tokens(broadcaster), tokens(title)
    if not tb or not tt:
        return 0.0
    # A name that reduces to one meaningful word ("Dubai TV" -> {dubai}) scores a
    # perfect overlap against anything containing that word ("Daily News Dubai").
    # Single-token names have to match as strings or not at all.
    if len(tb) < 2:
        return 0.0
    overlap = len(tb & tt) / len(tb)
    return round(overlap, 2)


# Country names as YouTube reports them, against the names this project uses.
COUNTRY_ALIASES = {
    "united states": {"united states", "usa", "us"},
    "united kingdom": {"united kingdom", "uk", "great britain"},
    "south korea": {"south korea", "korea", "republic of korea"},
    "north korea": {"north korea", "democratic people's republic of korea"},
    "russia": {"russia", "russian federation"},
    "czech republic": {"czech republic", "czechia"},
    "turkey": {"turkey", "türkiye", "turkiye"},
    "ivory coast": {"ivory coast", "côte d'ivoire", "cote d'ivoire"},
    "cabo verde": {"cabo verde", "cape verde"},
    "eswatini": {"eswatini", "swaziland"},
    "east timor": {"east timor", "timor-leste"},
    "myanmar": {"myanmar", "burma"},
    "democratic republic of the congo": {"democratic republic of the congo", "dr congo",
                                         "congo - kinshasa", "drc"},
    "congo": {"congo", "congo - brazzaville", "republic of the congo"},
    "vatican city": {"vatican city", "holy see"},
    "palestine": {"palestine", "palestinian territories", "state of palestine"},
    "netherlands": {"netherlands", "the netherlands", "holland"},
    "united arab emirates": {"united arab emirates", "uae"},
    "uae": {"united arab emirates", "uae"},
    "taiwan": {"taiwan", "chinese taipei"},
    "micronesia": {"micronesia", "federated states of micronesia"},
}


def country_matches(expected, declared):
    a, b = expected.strip().lower(), declared.strip().lower()
    if a == b:
        return True
    return b in COUNTRY_ALIASES.get(a, {a})


def search_channels(query, limit=5):
    url = ("https://www.youtube.com/results?search_query="
           + urllib.parse.quote_plus(query) + "&sp=EgIQAg%253D%253D")
    html = fetch(url)
    seen, out = set(), []
    pattern = r'"channelId":"(UC[\w-]{20,})","title":\{"simpleText":"((?:[^"\\]|\\.)*)"'
    for cid, title in re.findall(pattern, html):
        if cid in seen:
            continue
        seen.add(cid)
        out.append((cid, json.loads('"%s"' % title)))
        if len(out) >= limit:
            break
    return out


def channel_details(channel_id):
    """Channel title, @handle and the country the channel itself declares."""
    html = fetch("https://www.youtube.com/channel/%s/about" % channel_id)
    handle = re.search(r'"vanityChannelUrl":"[^"]*?/(@[\w.-]+)"', html)
    title = re.search(r'"channelMetadataRenderer":\{"title":"((?:[^"\\]|\\.)*)"', html)
    country = re.search(r'"country":"([^"]+)"', html)
    return (json.loads('"%s"' % title.group(1)) if title else "",
            handle.group(1) if handle else "",
            country.group(1) if country else "")


def is_live(channel_id):
    html = fetch("https://www.youtube.com/channel/%s/live" % channel_id)
    return '"isLiveNow":true' in html or '"isLive":true' in html


def resolve(row):
    country, broadcaster, category, website = row
    blank = [country, broadcaster, category, website, "", "", "", "0"]
    try:
        candidates = search_channels("%s %s news" % (broadcaster, country))
    except Exception:
        return blank

    best, best_score = None, 0.0
    for cid, title in candidates:
        s = score(broadcaster, title)
        if s > best_score:
            best, best_score = (cid, title), s

    # Below this the match is a guess, and a guess is exactly what we refuse.
    if not best or best_score < 0.6:
        return blank

    cid, title = best
    try:
        real_title, handle, declared_country = channel_details(cid)
    except Exception:
        return blank

    # Re-score against the channel's own metadata, not the search snippet.
    confirmed = max(best_score, score(broadcaster, real_title or title))
    if confirmed < 0.6 or (handle and SUSPICIOUS_HANDLE.search(handle)):
        return blank

    # Generic station names — Canal 6, TVN, NTV, Metro TV — exist in a dozen
    # countries, and a name match alone happily returns the wrong one. When the
    # channel declares a country, it has to be the country we asked about.
    if declared_country and not country_matches(country, declared_country):
        return blank

    try:
        live = "1" if is_live(cid) else "0"
    except Exception:
        live = "0"

    # A pipe or newline in the channel title would corrupt the output table.
    clean_title = re.sub(PIPE_OR_SPACE, " ", real_title or title).strip()
    return [country, broadcaster, category, website, cid, live,
            clean_title, str(confirmed)]


def main():
    src, dest = sys.argv[1], sys.argv[2]
    rows = []
    for line in open(src, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("|")
        if len(parts) >= 4:
            rows.append(parts[:4])

    print("resolving %d broadcasters..." % len(rows), file=sys.stderr)
    results = []
    with futures.ThreadPoolExecutor(max_workers=8) as pool:
        for i, row in enumerate(pool.map(resolve, rows), 1):
            results.append(row)
            if i % 25 == 0:
                print("  %d/%d" % (i, len(rows)), file=sys.stderr)

    with open(dest, "w", encoding="utf-8") as fh:
        for row in results:
            fh.write("|".join(row) + "\n")

    matched = sum(1 for r in results if r[4])
    live = sum(1 for r in results if r[5] == "1")
    print("resolved %d/%d channels, %d live" % (matched, len(results), live),
          file=sys.stderr)


if __name__ == "__main__":
    main()
