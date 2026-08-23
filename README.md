# NEWSFLIX — global live news directory

A React app for watching live news from around the world, built around one rule:
**a channel is only shown as a player if its official channel was confirmed.**
Anything unconfirmed is a link to the broadcaster, never an iframe that cannot load.

Current directory: **197 countries · 411 broadcasters · 285 with a confirmed
channel · 117 live** at the last build.

## What it does

### Browse by country
Every sovereign state, grouped by continent, with the broadcasters we could
place there. Each source shows whether it has a live feed or is link-only.

### Compare coverage
The part worth having. For 28 countries the directory records the same story from
four positions:

| Tier | What it is |
| --- | --- |
| **State / public** | The government or public broadcaster account |
| **International** | Foreign outlets aimed at a global audience |
| **Independent domestic** | Domestic outlets outside direct state control |
| **External / opposition** | Diaspora, opposition, or rival-state coverage |

`/compare/Iran` puts Press TV, BBC Persian, Iran International, Al Jazeera and
Al Mayadeen on one screen. `/compare/Russia` sets RT against DW, France 24 and
TVP World. Up to four feeds play at once, all muted until you pick one.

## How the data is built

Nothing in the directory is typed from memory. Three tables feed one generator:

```
data/countries-meta.psv         country | iso2 | continent
data/broadcasters.psv           country | broadcaster | category | website
data/broadcaster-websites.psv   link fallbacks for unresolvable broadcasters
data/channel-overrides.psv      hand-verified channels (rebrands, renames)
        │
        ├─ scripts/resolve-directory.py  → data/resolved.psv
        └─ scripts/build-directory.py    → src/globalNewsData.js
```

`resolve-directory.py` searches YouTube for each broadcaster and accepts a
channel only when **all** of these hold:

1. the channel's own title matches the broadcaster name (not just the search snippet),
2. its handle is not the numeric-suffix pattern impostor mirrors use (`@sabcnews4207`),
3. the country the channel itself declares is the country we asked about.

That third check matters more than it sounds. Without it "Canal 6" in Nicaragua
resolves to Honduras's Canal 6, "TVN" in Panama to Chile's, and "Sky News
Arabia" to Sky News in London. A broadcaster that fails any check gets no channel
at all.

### Rebuilding

```bash
python scripts/resolve-directory.py data/broadcasters.psv data/resolved.psv
python scripts/build-directory.py
```

To check or find a single channel by hand:

```bash
bash scripts/verify-channels.sh --search "Channels Television"
printf 'CNA|@ChannelNewsAsia\n' | bash scripts/verify-channels.sh
```

Live status is a snapshot: a broadcaster off air at build time is recorded as
link-only until the next run. Re-run the resolver to refresh.

## Project structure

```
src/
├── App.js                # Routes, navigation, search and filter state
├── HomeTab.js            # Live grid, real directory totals, compare entry points
├── CountriesPage.js      # Search + continent filter
├── CountriesList.js      # Countries grouped by continent
├── CountryPage.js        # One country's broadcasters
├── ComparePage.js        # Multi-perspective 2x2 feed wall
├── LivePage.js           # Every confirmed live feed
├── NewsPage.js           # Articles
├── globalNewsData.js     # GENERATED directory — do not edit by hand
├── countries.js          # Country lookups, derived from the directory
├── perspectives.js       # The four-tier comparison sets
└── verifiedStreams.js    # Hand-verified channels behind the comparison sets
```

Two datasets, deliberately:

- **`globalNewsData.js`** — the broad generated directory, rebuilt by script.
- **`verifiedStreams.js`** — a small hand-checked set backing `perspectives.js`,
  where picking the wrong "BBC Persian vs BBC News" would quietly change what a
  comparison means.

## Getting started

```bash
npm install
npm start          # http://localhost:3000
npm test           # 39 tests across 4 suites
npm run build
```

Tests cover directory integrity (no channel claimed by two countries, no stream
URL on an unverified source, every source reachable), the perspective model, and
accessibility.

## Deployment

```bash
npm run deploy     # gh-pages
```

## Known limits

- **Live status goes stale.** It reflects the last resolver run, not this moment.
- **RT and Press TV have no YouTube presence.** RT's official feed is on Rumble,
  which exposes no stable embed ID, so both are link-only.
- **100 broadcasters were dropped** from the old lists for having neither a
  resolvable channel nor a website. `scripts/build-directory.py` prints them;
  adding a URL to `data/broadcaster-websites.psv` brings one back.
- **The resolver is deliberately strict.** It would rather lose a real
  broadcaster than attribute the wrong channel to a country.
