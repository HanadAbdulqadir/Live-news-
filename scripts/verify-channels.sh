#!/usr/bin/env bash
# Resolve and re-verify the live channels behind src/verifiedStreams.js.
#
#   bash scripts/verify-channels.sh channels.psv     # verify a "Name|@handle" list
#   bash scripts/verify-channels.sh --search "CNA"   # find a channel ID by name
#
# Output columns: name | handle | channelId | LIVE/not_live | videoId | channelTitle
# A channel that does not resolve to an official ID must NOT be given a stream
# URL — leave it out rather than guessing.
set -u
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
TMP="${TMPDIR:-/tmp}/verify-channels"; mkdir -p "$TMP"

search() {
  local q; q=$(printf '%s' "$1" | sed 's/ /+/g')
  curl -sL -m 30 -A "$UA" -o "$TMP/s.html" \
    "https://www.youtube.com/results?search_query=$q&sp=EgIQAg%253D%253D"
  grep -o '"channelId":"UC[A-Za-z0-9_-]*","title":{"simpleText":"[^"]*"' "$TMP/s.html" \
    | head -5 | sed 's/"channelId":"//;s/","title":{"simpleText":/ => /;s/"$//'
}

verify_one() {
  local name="$1" handle="$2" f="$TMP/c.html" code id title live vid
  code=$(curl -sL -m 30 -A "$UA" -o "$f" -w "%{http_code}" "https://www.youtube.com/$handle")
  if [ "$code" != "200" ]; then echo "$name|$handle|HTTP_$code|-|-|-"; return; fi
  id=$(grep -o '"externalId":"UC[A-Za-z0-9_-]*"' "$f" | head -1 | sed 's/^.*:"//;s/"$//')
  if [ -z "$id" ]; then echo "$name|$handle|NO_ID|-|-|-"; return; fi
  title=$(grep -o '"channelMetadataRenderer":{"title":"[^"]*"' "$f" | head -1 | sed 's/.*"title":"//;s/"$//')
  curl -sL -m 30 -A "$UA" -o "$f" "https://www.youtube.com/channel/$id/live"
  if grep -q '"isLiveNow":true\|"isLive":true' "$f"; then live="LIVE"; else live="not_live"; fi
  vid=$(grep -o '<link rel="canonical" href="https://www.youtube.com/watch?v=[A-Za-z0-9_-]*"' "$f" \
    | head -1 | sed 's/.*v=//;s/"//')
  echo "$name|$handle|$id|$live|${vid:--}|${title:--}"
}

if [ "${1:-}" = "--search" ]; then
  search "${2:?usage: --search \"channel name\"}"
  exit 0
fi

while IFS='|' read -r name handle; do
  [ -z "${name:-}" ] && continue
  case "$name" in \#*) continue ;; esac
  verify_one "$name" "$handle"
done < "${1:-/dev/stdin}"
