// Perspective tiers.
//
// A country page answers one question: when something happens here, whose
// account of it are you watching? Each country lists the same story told from
// four different positions, so competing information environments sit side by
// side instead of one broadcaster standing in as the record.
//
// `channel` is a key into VERIFIED_CHANNELS. Entries with no verified live feed
// carry a websiteUrl and are shown as links, never as a player.

import { VERIFIED_CHANNELS, getStreamUrl, getChannelUrl } from './verifiedStreams';
import { RUMBLE_CHANNELS, getRumbleStreamUrl, getRumbleWatchUrl } from './rumbleStreams';

export const TIERS = {
  state: {
    id: 'state',
    label: 'State / public broadcaster',
    short: 'State',
    description: 'The government or public broadcaster account.',
    color: '#c0392b',
  },
  international: {
    id: 'international',
    label: 'International broadcaster',
    short: 'International',
    description: 'How the country is covered by foreign outlets aimed at a global audience.',
    color: '#2471a3',
  },
  independent: {
    id: 'independent',
    label: 'Independent domestic',
    short: 'Independent',
    description: 'Domestic outlets operating outside direct state control.',
    color: '#1e8449',
  },
  external: {
    id: 'external',
    label: 'External / opposition',
    short: 'External',
    description: 'Diaspora, opposition or rival-state coverage of the country.',
    color: '#8e44ad',
  },
};

export const TIER_ORDER = ['state', 'international', 'independent', 'external'];

// Raw perspective map: country -> ordered list of { tier, channel | name + websiteUrl }.
const PERSPECTIVES = {
  'Iran': {
    flag: '🇮🇷',
    summary:
      'Iranian state media, the Persian-language outlets broadcasting in from abroad, and the regional channels aligned for and against Tehran.',
    sources: [
      {
        tier: 'state',
        name: 'Press TV',
        rumble: 'Press TV',
        websiteUrl: 'https://www.presstv.ir/live',
        note: 'Not on YouTube. Watched through its pinned Rumble stream, or the broadcaster site.',
      },
      { tier: 'state', name: 'IRIB News', websiteUrl: 'https://www.iribnews.ir/' },
      { tier: 'external', channel: 'Iran International' },
      { tier: 'external', channel: 'BBC Persian' },
      { tier: 'external', channel: 'VOA News' },
      { tier: 'international', channel: 'Al Jazeera English' },
      { tier: 'international', channel: 'Al Mayadeen' },
      { tier: 'external', channel: 'i24NEWS English' },
    ],
  },
  'Russia': {
    flag: '🇷🇺',
    summary:
      'Russian state broadcasting is off YouTube entirely, so the contrast here is between RT on its own platforms and the European channels covering the war from the other side of it.',
    sources: [
      {
        tier: 'state',
        name: 'RT',
        rumble: 'RT',
        websiteUrl: 'https://rumble.com/c/RTNews',
        note: 'Removed from YouTube in 2022. Its Rumble 24/7 slot has held the same embed ID since March 2022.',
      },
      { tier: 'state', name: 'Rossiya 24', websiteUrl: 'https://www.vesti.ru/' },
      { tier: 'international', channel: 'DW News' },
      { tier: 'international', channel: 'France 24 English' },
      { tier: 'international', channel: 'Euronews' },
      { tier: 'external', channel: 'TVP World' },
      { tier: 'international', channel: 'BBC News' },
    ],
  },
  'China': {
    flag: '🇨🇳',
    summary: 'The outward-facing English channel against the Western and Indian outlets covering it.',
    sources: [
      { tier: 'state', channel: 'CCTV' },
      { tier: 'state', channel: 'CGTN' },
      { tier: 'international', channel: 'DW News' },
      { tier: 'international', channel: 'France 24 English' },
      { tier: 'external', channel: 'WION' },
      { tier: 'international', channel: 'Al Jazeera English' },
    ],
  },
  'Israel': {
    flag: '🇮🇱',
    summary: 'Israeli, pan-Arab and Turkish channels covering the same events from opposing positions.',
    sources: [
      { tier: 'independent', channel: 'i24NEWS English' },
      { tier: 'international', channel: 'Al Jazeera English' },
      { tier: 'external', channel: 'Al Jazeera Arabic' },
      { tier: 'external', channel: 'Al Mayadeen' },
      { tier: 'international', channel: 'TRT World' },
      { tier: 'international', channel: 'Sky News Arabia' },
    ],
  },
  'Palestine': {
    flag: '🇵🇸',
    summary: 'Pan-Arab, Turkish and Israeli coverage of the territories, side by side.',
    sources: [
      { tier: 'state', name: 'Palestine TV', websiteUrl: 'https://www.palestinetv.ps/' },
      { tier: 'international', channel: 'Al Jazeera Arabic' },
      { tier: 'international', channel: 'Al Jazeera English' },
      { tier: 'international', channel: 'TRT World' },
      { tier: 'external', channel: 'i24NEWS English' },
      { tier: 'external', channel: 'Sky News Arabia' },
    ],
  },
  'United States': {
    flag: '🇺🇸',
    summary: 'The domestic partisan split, plus how the same day looks on a state-funded outlet and from abroad.',
    sources: [
      { tier: 'state', channel: 'VOA News' },
      { tier: 'independent', channel: 'CNN' },
      { tier: 'independent', channel: 'Fox News' },
      { tier: 'independent', channel: 'MS NOW' },
      { tier: 'independent', channel: 'CBS News' },
      { tier: 'independent', channel: 'NBC News' },
      { tier: 'independent', channel: 'ABC News' },
      { tier: 'international', channel: 'Al Jazeera English' },
      { tier: 'external', channel: 'CGTN' },
    ],
  },
  'United Kingdom': {
    flag: '🇬🇧',
    summary: 'Public broadcaster, commercial rivals, and outside coverage.',
    sources: [
      { tier: 'state', channel: 'BBC News' },
      { tier: 'independent', channel: 'Sky News' },
      { tier: 'independent', channel: 'ITV News' },
      { tier: 'international', channel: 'France 24 English' },
      { tier: 'international', channel: 'Euronews' },
      { tier: 'external', channel: 'Al Jazeera English' },
    ],
  },
  'India': {
    flag: '🇮🇳',
    summary: 'A crowded domestic market, from the loudest nationalist channels to the international feeds.',
    sources: [
      { tier: 'state', name: 'DD India', websiteUrl: 'https://ddindia.gov.in/' },
      { tier: 'independent', channel: 'NDTV' },
      { tier: 'independent', channel: 'India Today' },
      { tier: 'independent', channel: 'Times Now' },
      { tier: 'independent', channel: 'Republic World' },
      { tier: 'international', channel: 'WION' },
      { tier: 'external', channel: 'Al Jazeera English' },
      { tier: 'external', channel: 'CGTN' },
    ],
  },
  'Qatar': {
    flag: '🇶🇦',
    summary: 'Al Jazeera in both languages, against the Gulf rivals it competes with.',
    sources: [
      { tier: 'state', channel: 'Al Jazeera Arabic' },
      { tier: 'state', channel: 'Al Jazeera English' },
      { tier: 'external', channel: 'Al Arabiya' },
      { tier: 'external', channel: 'Sky News Arabia' },
      { tier: 'international', channel: 'TRT World' },
    ],
  },
  'Saudi Arabia': {
    flag: '🇸🇦',
    summary: 'Saudi-owned pan-Arab broadcasting and the regional channels that contest it.',
    sources: [
      { tier: 'state', channel: 'Al Arabiya' },
      { tier: 'international', channel: 'Sky News Arabia' },
      { tier: 'external', channel: 'Al Jazeera Arabic' },
      { tier: 'external', channel: 'Al Mayadeen' },
      { tier: 'international', channel: 'TRT World' },
    ],
  },
  'Turkey': {
    flag: '🇹🇷',
    summary: 'The Turkish English-language channel alongside European and Arab coverage.',
    sources: [
      { tier: 'state', channel: 'TRT World' },
      { tier: 'international', channel: 'Euronews' },
      { tier: 'international', channel: 'DW News' },
      { tier: 'external', channel: 'Al Jazeera English' },
    ],
  },
  'France': {
    flag: '🇫🇷',
    summary: 'Public international broadcaster, domestic news channels, and European coverage.',
    sources: [
      { tier: 'state', channel: 'France 24 English' },
      { tier: 'independent', channel: 'BFMTV' },
      { tier: 'independent', channel: 'TF1 Info' },
      { tier: 'international', channel: 'Euronews' },
      { tier: 'international', channel: 'DW News' },
    ],
  },
  'Germany': {
    flag: '🇩🇪',
    summary: 'The two public broadcasters, the outward-facing English channel, and European context.',
    sources: [
      { tier: 'state', channel: 'tagesschau' },
      { tier: 'state', channel: 'ZDFheute' },
      { tier: 'state', channel: 'DW News' },
      { tier: 'international', channel: 'Euronews' },
      { tier: 'international', channel: 'France 24 English' },
    ],
  },
  'Poland': {
    flag: '🇵🇱',
    summary: 'The Polish English-language channel and the wider European feeds.',
    sources: [
      { tier: 'state', channel: 'TVP World' },
      { tier: 'international', channel: 'Euronews' },
      { tier: 'international', channel: 'DW News' },
      { tier: 'international', channel: 'France 24 English' },
    ],
  },
  'Japan': {
    flag: '🇯🇵',
    summary: 'Public broadcaster and the commercial networks.',
    sources: [
      { tier: 'state', channel: 'NHK World-Japan' },
      { tier: 'independent', channel: 'FNN Prime Online' },
      { tier: 'independent', channel: 'TBS NEWS DIG' },
      { tier: 'international', channel: 'CNA' },
    ],
  },
  'South Korea': {
    flag: '🇰🇷',
    summary: 'The Korean English-language service alongside regional coverage.',
    sources: [
      { tier: 'state', channel: 'Arirang News' },
      { tier: 'international', channel: 'CNA' },
      { tier: 'international', channel: 'NHK World-Japan' },
      { tier: 'external', channel: 'CGTN' },
    ],
  },
  'Singapore': {
    flag: '🇸🇬',
    summary: 'The Singaporean regional English channel and its Asian counterparts.',
    sources: [
      { tier: 'state', channel: 'CNA' },
      { tier: 'international', channel: 'NHK World-Japan' },
      { tier: 'external', channel: 'CGTN' },
      { tier: 'external', channel: 'WION' },
    ],
  },
  'Australia': {
    flag: '🇦🇺',
    summary: 'Public broadcaster and commercial news.',
    sources: [
      { tier: 'state', channel: 'ABC News Australia' },
      { tier: 'independent', channel: '7NEWS Australia' },
      { tier: 'international', channel: 'CNA' },
      { tier: 'international', channel: 'BBC News' },
    ],
  },
  'New Zealand': {
    flag: '🇳🇿',
    summary: 'Domestic news and the regional feeds that cover the Pacific.',
    sources: [
      { tier: 'independent', channel: '1News' },
      { tier: 'international', channel: 'ABC News Australia' },
      { tier: 'international', channel: 'BBC News' },
    ],
  },
  'Canada': {
    flag: '🇨🇦',
    summary: 'Public broadcaster, commercial networks, and the American feeds next door.',
    sources: [
      { tier: 'state', channel: 'CBC News' },
      { tier: 'independent', channel: 'CTV News' },
      { tier: 'independent', channel: 'Global News' },
      { tier: 'external', channel: 'CNN' },
      { tier: 'external', channel: 'Fox News' },
    ],
  },
  'Mexico': {
    flag: '🇲🇽',
    summary: 'The main Mexican networks plus US coverage of the border.',
    sources: [
      { tier: 'independent', channel: 'N+' },
      { tier: 'independent', channel: 'Azteca Noticias' },
      { tier: 'independent', channel: 'Milenio' },
      { tier: 'external', channel: 'CNN' },
      { tier: 'external', channel: 'teleSUR English' },
    ],
  },
  'Brazil': {
    flag: '🇧🇷',
    summary: 'The Brazilian networks across the political spectrum.',
    sources: [
      { tier: 'independent', channel: 'GloboNews' },
      { tier: 'independent', channel: 'CNN Brasil' },
      { tier: 'independent', channel: 'Record News' },
      { tier: 'independent', channel: 'Jovem Pan News' },
      { tier: 'independent', channel: 'Band Jornalismo' },
      { tier: 'external', channel: 'teleSUR English' },
    ],
  },
  'Argentina': {
    flag: '🇦🇷',
    summary: 'The two dominant Argentine news channels, which sit on opposite sides of the political divide.',
    sources: [
      { tier: 'independent', channel: 'TN - Todo Noticias' },
      { tier: 'independent', channel: 'C5N' },
      { tier: 'external', channel: 'teleSUR English' },
      { tier: 'external', channel: 'CNN Brasil' },
    ],
  },
  'Venezuela': {
    flag: '🇻🇪',
    summary: 'Caracas-backed regional broadcasting against Western coverage.',
    sources: [
      { tier: 'state', channel: 'teleSUR English' },
      { tier: 'state', name: 'VTV', websiteUrl: 'https://www.vtv.gob.ve/' },
      { tier: 'external', channel: 'CNN' },
      { tier: 'external', channel: 'France 24 English' },
    ],
  },
  'South Africa': {
    flag: '🇿🇦',
    summary: 'Public broadcaster and the two commercial news channels.',
    sources: [
      { tier: 'state', channel: 'SABC News' },
      { tier: 'independent', channel: 'eNCA' },
      { tier: 'independent', channel: 'Newzroom Afrika' },
      { tier: 'international', channel: 'Africanews' },
    ],
  },
  'Nigeria': {
    flag: '🇳🇬',
    summary: 'State network and the private broadcasters that outpace it.',
    sources: [
      { tier: 'state', channel: 'NTA Network' },
      { tier: 'independent', channel: 'Channels Television' },
      { tier: 'independent', channel: 'TVC News Nigeria' },
      { tier: 'international', channel: 'Africanews' },
    ],
  },
  'Bangladesh': {
    flag: '🇧🇩',
    summary: 'Domestic broadcasting alongside Indian and international coverage.',
    sources: [
      { tier: 'independent', channel: 'Somoy TV' },
      { tier: 'external', channel: 'WION' },
      { tier: 'external', channel: 'NDTV' },
      { tier: 'international', channel: 'Al Jazeera English' },
    ],
  },
  'Lebanon': {
    flag: '🇱🇧',
    summary: 'Beirut-based pan-Arab broadcasting and its regional rivals.',
    sources: [
      { tier: 'independent', channel: 'Al Mayadeen' },
      { tier: 'independent', channel: 'Al Mayadeen English' },
      { tier: 'external', channel: 'Al Arabiya' },
      { tier: 'external', channel: 'Sky News Arabia' },
      { tier: 'international', channel: 'Al Jazeera Arabic' },
    ],
  },
};

// Resolve a country perspective set, attaching verified stream data.
// Sources with no verified live feed keep their link and are marked playable: false.
export const getPerspectives = (country) => {
  const entry = PERSPECTIVES[country];
  if (!entry) return null;

  const sources = entry.sources.map((source, index) => {
    const key = source.channel;
    const rumbleKey = source.rumble;
    const verified = key ? VERIFIED_CHANNELS[key] : null;
    // A broadcaster reaches us on YouTube or on Rumble, never both at once.
    const streamUrl = key
      ? getStreamUrl(key)
      : rumbleKey
      ? getRumbleStreamUrl(rumbleKey)
      : null;
    return {
      id: `${(key || source.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
      name: key || source.name,
      tier: source.tier,
      tierLabel: TIERS[source.tier].label,
      tierShort: TIERS[source.tier].short,
      tierColor: TIERS[source.tier].color,
      platform: rumbleKey ? 'rumble' : 'youtube',
      streamUrl,
      playable: Boolean(streamUrl),
      linkUrl:
        source.websiteUrl ||
        (key ? getChannelUrl(key) : rumbleKey ? getRumbleWatchUrl(rumbleKey) : null),
      origin: verified
        ? verified.country
        : rumbleKey && RUMBLE_CHANNELS[rumbleKey]
        ? RUMBLE_CHANNELS[rumbleKey].country
        : null,
      note: source.note || null,
    };
  });

  return { country, flag: entry.flag, summary: entry.summary, sources };
};

export const getPerspectiveCountries = () =>
  Object.keys(PERSPECTIVES)
    .sort()
    .map((country) => {
      const entry = PERSPECTIVES[country];
      const playable = entry.sources.filter(
        (s) =>
          (s.channel && getStreamUrl(s.channel)) ||
          (s.rumble && getRumbleStreamUrl(s.rumble))
      ).length;
      return {
        country,
        flag: entry.flag,
        total: entry.sources.length,
        playable,
        tiers: [...new Set(entry.sources.map((s) => s.tier))],
      };
    });

export const hasPerspectives = (country) =>
  Object.prototype.hasOwnProperty.call(PERSPECTIVES, country);
