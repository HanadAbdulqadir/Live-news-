"""Verify pinned Rumble streams and regenerate src/rumbleStreams.js.

    python scripts/check-rumble.py

Rumble has no channel-level live URL. YouTube gives us
`embed/live_stream?channel=UC...`, which always plays whatever that channel is
streaming now; Rumble can only embed one specific video. So the embed IDs are
pinned by hand in data/rumble-streams.psv and re-checked by this script.

Pinning is workable because a broadcaster's 24/7 slot is long-lived — RT's has
carried the same ID since March 2022 — but it is not self-maintaining, which is
why this check exists. For each pinned ID it asks Rumble's player API:

  * does the ID still resolve at all,
  * is the channel that owns it still the broadcaster we expected,
  * is it broadcasting right now, or serving a recording of an earlier stream.

Only a stream that is actually live gets a player. A pinned ID whose author no
longer matches is dropped, not re-pointed: that is how a re-upload from some
unrelated account ends up on the page wearing a broadcaster's name.
"""

import gzip
import io
import json
import re
import subprocess
import sys
import urllib.request
from datetime import date

SOURCE = "data/rumble-streams.psv"
OUT = "src/rumbleStreams.js"
API = "https://rumble.com/embedJS/u3/?request=video&ver=2&v=%s"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def fetch(url):
    """Fetch via curl, falling back to urllib.

    Rumble rejects Python's urllib on the TLS handshake — every request 403s no
    matter what headers are set, while the identical request through curl gets a
    200. So curl is the primary path here. (The YouTube resolver has no such
    problem and stays on urllib.)
    """
    try:
        result = subprocess.run(
            ["curl", "-sL", "--compressed", "-m", "30", "-A", UA, url],
            capture_output=True, timeout=45)
        if result.returncode == 0 and result.stdout:
            return result.stdout.decode("utf-8", "replace")
    except (OSError, subprocess.SubprocessError):
        pass

    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip",
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read()
        if resp.headers.get("Content-Encoding") == "gzip":
            raw = gzip.GzipFile(fileobj=io.BytesIO(raw)).read()
    return raw.decode("utf-8", "replace")


def normalise(text):
    return re.sub(r"[^a-z0-9]+", "", (text or "").lower())


def playback_urls(payload):
    urls = []
    formats = payload.get("ua")
    if not isinstance(formats, dict):
        return urls
    for variants in formats.values():
        if not isinstance(variants, dict):
            continue
        for variant in variants.values():
            if isinstance(variant, dict) and variant.get("url"):
                urls.append(variant["url"])
    return urls


def check(embed_id, expected_author):
    """(verdict, live, author, title, note) for one pinned embed ID.

    verdict is 'ok', 'drop', or 'unknown'. The distinction matters: 'drop' means
    Rumble answered and the answer was bad, 'unknown' means we never got an
    answer. Only 'drop' is allowed to remove a pinned stream.
    """
    try:
        body = fetch(API % embed_id)
    except Exception as exc:                       # noqa: BLE001 - report, don't crash
        return "unknown", False, "", "", "unreachable: %s" % exc

    if "Just a moment" in body[:400] or body.lstrip().startswith("<!DOCTYPE"):
        return "unknown", False, "", "", "blocked by Cloudflare, not checked"

    try:
        payload = json.loads(body)
    except ValueError:
        return "unknown", False, "", "", "unparseable response, not checked"
    if not isinstance(payload, dict):
        return "drop", False, "", "", "no video behind this ID any more"

    author = (payload.get("author") or {}).get("name", "")
    title = payload.get("title", "")

    if normalise(author) != normalise(expected_author):
        return "drop", False, author, title, (
            "owned by %r now, expected %r" % (author, expected_author))

    # `live` is truthy only while actually broadcasting. A 24/7 slot that is off
    # air serves the recording of its last stream, marked .rec. in the CDN path.
    live = bool(payload.get("live"))
    recorded = any(".rec." in url for url in playback_urls(payload))
    if live and recorded:
        live = False
    note = "live" if live else "off air (serving a recording)"
    return "ok", live, author, title, note


def previous_entries():
    """What the last successful run wrote, keyed by broadcaster."""
    try:
        existing = open(OUT, encoding="utf-8").read()
    except OSError:
        return {}
    entries = {}
    entry_pattern = re.compile(r"  '([^']+)': \{(.*?)\n  \},", re.S)
    for name, body in entry_pattern.findall(existing):
        def field(key, text=body):
            found = re.search(r"%s: '([^']*)'" % key, text)
            return found.group(1) if found else ""
        entries[name] = {
            "broadcaster": name,
            "country": field("country"),
            "embedId": field("embedId"),
            "author": field("author"),
            "title": field("title"),
            "live": "live: true" in body,
        }
    return entries


def read_rows():
    rows = []
    for line in open(SOURCE, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("|")
        if len(parts) >= 4:
            rows.append(parts[:4])
    return rows


def main():
    rows = read_rows()
    print("checking %d pinned Rumble streams..." % len(rows), file=sys.stderr)

    previous = previous_entries()
    verified, unknown = [], 0
    for country, broadcaster, embed_id, author in rows:
        verdict, live, actual, title, note = check(embed_id, author)
        print("  %-4s %-10s %-14s %s" % (verdict.upper(), broadcaster, embed_id, note),
              file=sys.stderr)
        if verdict == "ok":
            verified.append({
                "broadcaster": broadcaster,
                "country": country,
                "embedId": embed_id,
                "author": actual,
                "title": title,
                "live": live,
            })
        elif verdict == "unknown":
            unknown += 1
            # Never delete on a failed check. Keep what the last good run knew,
            # but drop the live flag: we cannot claim a stream is broadcasting
            # when we could not reach it.
            carried = previous.get(broadcaster)
            if carried:
                verified.append(dict(carried, live=False))

    if unknown and not any(v for v in verified):
        print("every check was inconclusive; leaving %s untouched" % OUT,
              file=sys.stderr)
        return 1

    lines = [
        "// Pinned Rumble streams — generated, do not edit by hand.",
        "//",
        "//   python scripts/check-rumble.py",
        "//",
        "// Rumble has no channel-level live URL the way YouTube does, so each stream",
        "// is pinned to one embed ID and re-checked by the script above. Every entry",
        "// here was confirmed to still be owned by the broadcaster named in it.",
        "//",
        "// This is the only route to broadcasters YouTube has removed: RT has no",
        "// YouTube presence at all, and the channels search returns for it are",
        "// re-uploads from unrelated accounts.",
        "",
        "export const RUMBLE_CHECKED = '%s';" % date.today().isoformat(),
        "",
        "export const RUMBLE_CHANNELS = {",
    ]
    for entry in verified:
        lines += [
            "  '%s': {" % entry["broadcaster"].replace("'", "\\'"),
            "    embedId: '%s'," % entry["embedId"],
            "    country: '%s'," % entry["country"].replace("'", "\\'"),
            "    author: '%s'," % entry["author"].replace("'", "\\'"),
            "    title: '%s'," % entry["title"].replace("'", "\\'"),
            "    live: %s," % ("true" if entry["live"] else "false"),
            "  },",
        ]
    lines += [
        "};",
        "",
        "// Embed URL for a Rumble stream that is broadcasting now, else null.",
        "// An off-air 24/7 slot serves a recording of its last broadcast, which must",
        "// not be presented as live.",
        "export const getRumbleStreamUrl = (broadcaster) => {",
        "  const channel = RUMBLE_CHANNELS[broadcaster];",
        "  return channel && channel.live",
        "    ? `https://rumble.com/embed/${channel.embedId}/`",
        "    : null;",
        "};",
        "",
        "// Watch page for a pinned stream, live or not.",
        "export const getRumbleWatchUrl = (broadcaster) => {",
        "  const channel = RUMBLE_CHANNELS[broadcaster];",
        "  return channel ? `https://rumble.com/embed/${channel.embedId}/` : null;",
        "};",
        "",
        "export const hasRumbleStream = (broadcaster) =>",
        "  Object.prototype.hasOwnProperty.call(RUMBLE_CHANNELS, broadcaster);",
        "",
    ]

    open(OUT, "w", encoding="utf-8").write("\n".join(lines))
    live_count = sum(1 for entry in verified if entry["live"])
    print("wrote %s: %d streams, %d live%s"
          % (OUT, len(verified), live_count,
             ", %d could not be checked" % unknown if unknown else ""),
          file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main() or 0)
