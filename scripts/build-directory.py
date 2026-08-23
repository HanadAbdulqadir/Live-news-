"""Generate src/globalNewsData.js from the verified directory tables.

    python scripts/build-directory.py

Inputs
    data/countries-meta.psv   country|iso2|continent
    data/resolved.psv         country|broadcaster|category|website|channelId|live|title|confidence
    data/broadcaster-websites.psv  country|broadcaster|website   (link fallbacks)
    data/channel-overrides.psv     country|broadcaster|category|channelId|live  (hand-verified)

A broadcaster only gets a streamUrl when resolve-directory.py confirmed both an
official channel and a live feed. Everything else keeps its website link and is
marked type: 'website', so the UI never renders a player it cannot back up.
"""

import re
from datetime import date

META = "data/countries-meta.psv"
RESOLVED = "data/resolved.psv"
WEBSITES = "data/broadcaster-websites.psv"
OVERRIDES = "data/channel-overrides.psv"
OUT = "src/globalNewsData.js"

CATEGORY_LABEL = {
    "state": "Public Broadcaster",
    "private": "Commercial Broadcaster",
    "intl": "International Service",
    "unknown": "General News",
}


def flag(iso2):
    if iso2 == "XK":          # Kosovo has no emoji flag
        return "\U0001F3F4"
    return "".join(chr(0x1F1E6 + ord(ch) - ord("A")) for ch in iso2)


def slug(text):
    return re.sub(r"^-+|-+$", "", re.sub(r"[^a-z0-9]+", "-", text.lower()))


def js(text):
    return text.replace("\\", "\\\\").replace("'", "\\'")


def read_psv(path, fields):
    rows = []
    for line in open(path, encoding="utf-8"):
        line = line.rstrip("\n")
        if not line.strip() or line.startswith("#"):
            continue
        parts = line.split("|")
        parts += [""] * (fields - len(parts))
        rows.append(parts[:fields])
    return rows


# Words that carry no identity: "Channels TV" and "Channels Television" are one
# broadcaster, and so are "TBS" and "TBS NEWS DIG".
GENERIC_WORDS = re.compile(
    r"\b(tv|television|news|network|networks|channel|channels|radio|media|"
    r"broadcasting|corporation|online|prime|dig|live|hd|24)\b")


def name_core(name):
    stripped = re.sub(r"[^a-z0-9]+", "", GENERIC_WORDS.sub(" ", name.lower()))
    if stripped:
        return stripped
    # A name made entirely of generic words ("TBS", "Channels TV") still has to
    # match its longer sibling, so fall back to its first word.
    return re.split(r"[^a-z0-9]+", name.lower().strip())[0]


def dedupe(sources):
    """Collapse the same broadcaster listed twice under different names.

    The automated pass and the hand-verified overrides often disagree on a name
    ("Channels TV" vs "Channels Television", "TBS" vs "TBS NEWS DIG"). Same
    channel ID, or one name contained in the other, means one broadcaster.
    The richer entry — the one with a live feed, then a channel — survives.
    """
    kept = []
    for source in sorted(sources, key=lambda s: (not s["live"], not s["channelId"])):
        name = name_core(source["name"])
        clash = None
        for other in kept:
            other_name = name_core(other["name"])
            same_channel = source["channelId"] and source["channelId"] == other["channelId"]
            # Two confirmed channels that differ are two channels, whatever the
            # names suggest — BBC News and BBC Persian are not the same feed.
            distinct_channels = (source["channelId"] and other["channelId"]
                                 and source["channelId"] != other["channelId"])
            same_name = (not distinct_channels
                         and len(name) >= 3 and len(other_name) >= 3
                         and (name in other_name or other_name in name))
            if same_channel or same_name:
                clash = other
                break
        if clash is None:
            kept.append(source)
        elif not clash["website"] and source["website"]:
            clash["website"] = source["website"]
    return kept


# Short forms inherited from the old hand-written lists.
COUNTRY_ALIASES = {
    "DR Congo": "Democratic Republic of the Congo",
    "UAE": "United Arab Emirates",
}


def main():
    meta = {c: (iso, cont) for c, iso, cont in read_psv(META, 3)}

    # Hand-supplied websites for broadcasters with no resolvable channel.
    websites = {}
    for country, name, url in read_psv(WEBSITES, 3):
        websites[(COUNTRY_ALIASES.get(country, country), name)] = url

    by_country = {}
    dropped = []
    for country, name, category, website, cid, live, title, conf in read_psv(RESOLVED, 8):
        country = COUNTRY_ALIASES.get(country, country)
        website = website or websites.get((country, name), "")
        # A source with no channel and no website links nowhere. Listing it would
        # be a name on a page and nothing behind it.
        if not website and not cid:
            dropped.append("%s / %s" % (country, name))
            continue
        by_country.setdefault(country, []).append({
            "name": name,
            "category": CATEGORY_LABEL.get(category, CATEGORY_LABEL["unknown"]),
            "website": website,
            "channelId": cid,
            "live": live == "1",
            "title": title,
            "confidence": conf,
        })

    # Hand-verified channels, merged in on top of the automated results. These
    # win on conflict: a human checked the channel page.
    for country, name, category, cid, live in read_psv(OVERRIDES, 5):
        country = COUNTRY_ALIASES.get(country, country)
        entry = {
            "name": name,
            "category": CATEGORY_LABEL.get(category, CATEGORY_LABEL["unknown"]),
            "website": websites.get((country, name), ""),
            "channelId": cid,
            "live": live == "1",
            "title": name,
            "confidence": "manual",
        }
        bucket = by_country.setdefault(country, [])
        existing = next((s for s in bucket if s["channelId"] == cid or s["name"] == name), None)
        if existing:
            existing.update(entry)
        else:
            bucket.append(entry)

    # A channel belongs to one country. Al Arabiya is Saudi-owned but based in
    # Dubai, and the old lists filed it under both; the first country to claim a
    # channel keeps it, and the duplicate falls back to its website.
    claimed = {}
    countries = []
    for country in sorted(meta):
        iso, continent = meta[country]
        sources = []
        for source in dedupe(by_country.get(country, [])):
            cid = source["channelId"]
            if cid and claimed.get(cid, country) != country:
                if not source["website"]:
                    dropped.append("%s / %s (channel belongs to %s)"
                                   % (country, source["name"], claimed[cid]))
                    continue
                source = dict(source, channelId="", live=False)
            elif cid:
                claimed[cid] = country
            sources.append(source)
        if not sources:
            continue
        countries.append((country, iso, continent, sources))

    total_sources = sum(len(s) for _, _, _, s in countries)
    live_sources = sum(1 for _, _, _, s in countries for x in s if x["live"])
    resolved = sum(1 for _, _, _, s in countries for x in s if x["channelId"])

    out = []
    w = out.append
    w("// Global news directory — generated, do not edit by hand.")
    w("//")
    w("//   python scripts/build-directory.py")
    w("//")
    w("// Every channelId below was resolved from the broadcaster's own YouTube")
    w("// channel page and name-matched against it. A broadcaster with no confirmed")
    w("// channel keeps its website and gets streamUrl: null — the app shows a link")
    w("// rather than an iframe that cannot load.")
    w("//")
    w("// %d countries · %d broadcasters · %d with a confirmed channel · %d live at build"
      % (len(countries), total_sources, resolved, live_sources))
    w("")
    w("export const DIRECTORY_BUILT = '%s';" % date.today().isoformat())
    w("")
    w("export const GLOBAL_NEWS_SOURCES = [")

    for country, iso, continent, sources in countries:
        w("  {")
        w("    id: '%s'," % slug(country))
        w("    name: '%s'," % js(country))
        w("    iso: '%s'," % iso)
        w("    flag: '%s'," % flag(iso))
        w("    continent: '%s'," % continent)
        w("    sources: [")
        seen = set()
        for s in sources:
            sid = slug(s["name"])
            if sid in seen:
                continue
            seen.add(sid)
            stream = ("'https://www.youtube.com/embed/live_stream?channel=%s'" % s["channelId"]
                      if s["live"] else "null")
            channel = "'https://www.youtube.com/channel/%s'" % s["channelId"] if s["channelId"] else "null"
            website = "'%s'" % js(s["website"]) if s["website"] else "null"
            w("      {")
            w("        id: '%s'," % sid)
            w("        name: '%s'," % js(s["name"]))
            w("        websiteUrl: %s," % website)
            w("        channelUrl: %s," % channel)
            w("        streamUrl: %s," % stream)
            w("        type: '%s'," % ("live" if s["live"] else "website"))
            w("        verified: %s," % ("true" if s["channelId"] else "false"))
            w("        category: '%s'," % js(s["category"]))
            w("        description: '%s'," % js("%s — %s in %s" % (s["name"], s["category"].lower(), country)))
            w("      },")
        w("    ],")
        w("  },")

    w("];")
    w("""
// Countries grouped by continent.
export const getSourcesByContinent = () => {
  const continents = {};
  GLOBAL_NEWS_SOURCES.forEach((country) => {
    if (!continents[country.continent]) continents[country.continent] = [];
    continents[country.continent].push(country);
  });
  return continents;
};

// Countries whose name, or any of whose sources, match the query.
export const searchSources = (query) => {
  const term = query.toLowerCase();
  return GLOBAL_NEWS_SOURCES.filter(
    (country) =>
      country.name.toLowerCase().includes(term) ||
      country.sources.some(
        (source) =>
          source.name.toLowerCase().includes(term) ||
          source.category.toLowerCase().includes(term)
      )
  );
};

const flatten = (predicate) =>
  GLOBAL_NEWS_SOURCES.flatMap((country) =>
    country.sources
      .filter(predicate)
      .map((source) => ({ ...source, country: country.name, flag: country.flag, continent: country.continent }))
  );

// Every broadcaster with a confirmed live feed.
export const getLiveStreams = () => flatten((source) => Boolean(source.streamUrl));

// Broadcasters with no live feed — link-only.
export const getWebsiteSources = () => flatten((source) => !source.streamUrl);

// Directory totals, for anything that wants to state real numbers.
export const getDirectoryStats = () => ({
  countries: GLOBAL_NEWS_SOURCES.length,
  sources: GLOBAL_NEWS_SOURCES.reduce((n, c) => n + c.sources.length, 0),
  live: getLiveStreams().length,
  verified: GLOBAL_NEWS_SOURCES.reduce(
    (n, c) => n + c.sources.filter((s) => s.verified).length,
    0
  ),
});""")

    open(OUT, "w", encoding="utf-8").write("\n".join(out) + "\n")
    print("wrote %s: %d countries, %d sources, %d resolved, %d live"
          % (OUT, len(countries), total_sources, resolved, live_sources))
    if dropped:
        print("dropped %d unreachable sources (no channel, no website):" % len(dropped))
        for entry in dropped:
            print("    " + entry)
    missing = sorted(set(meta) - {c for c, _, _, _ in countries})
    if missing:
        print("countries with no reachable source: %d" % len(missing))
        for entry in missing:
            print("    " + entry)


if __name__ == "__main__":
    main()
