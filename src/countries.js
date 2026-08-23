// Country and per-country source lookups.
//
// Everything here derives from the generated directory in globalNewsData.js,
// so there is exactly one place where a broadcaster and its channel are
// recorded. Nothing in this file invents a stream URL.

import { GLOBAL_NEWS_SOURCES } from './globalNewsData';

const BY_NAME = GLOBAL_NEWS_SOURCES.reduce((map, country) => {
  map[country.name] = country;
  return map;
}, {});

export const ALL_COUNTRIES = GLOBAL_NEWS_SOURCES.map((country) => country.name);

export const getCountry = (country) => BY_NAME[country] || null;

// Broadcaster names for a country, or an empty list when we have none.
export const getNewsSourcesForCountry = (country) => {
  const entry = BY_NAME[country];
  return entry ? entry.sources.map((source) => source.name) : [];
};

// Live embed URL for a named broadcaster in a given country, or null.
export const getStreamUrlForChannel = (channelName, country) => {
  const entry = BY_NAME[country];
  if (!entry) return null;
  const source = entry.sources.find((s) => s.name === channelName);
  return source ? source.streamUrl : null;
};

// Full source records for a country. streamUrl is null unless the broadcaster
// has a confirmed channel that was live when the directory was built.
export const getNewsSourceData = (country) => {
  const entry = BY_NAME[country];
  if (!entry) return [];
  return entry.sources.map((source) => ({
    ...source,
    country: entry.name,
    flag: entry.flag,
    continent: entry.continent,
    color: getColorForChannel(source.name),
  }));
};

// Stable brand colour per channel, derived from the name so a channel keeps the
// same colour between renders.
const getColorForChannel = (name) => {
  const colors = [
    '#e50914', '#0066cc', '#008000', '#ff6600', '#9900cc', '#cc0000',
    '#003366', '#0046d5', '#0c54a0', '#bb1919', '#0055a4', '#002d72',
    '#0070d2', '#083eab', '#9c0000', '#e3000f',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 100000;
  }
  return colors[hash % colors.length];
};
