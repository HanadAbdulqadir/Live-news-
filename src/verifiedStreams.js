// Verified live-stream channels.
//
// Every entry here was resolved from the broadcaster's own YouTube channel page
// and its live status checked at the date below. Nothing in this file is guessed:
// if a channel could not be resolved to an official channel ID it is listed in
// UNVERIFIED_SOURCES instead and never rendered as a player.
//
// Regenerate with: bash scripts/verify-channels.sh

export const VERIFIED_AT = '2026-08-23';

const embed = (channelId) =>
  `https://www.youtube.com/embed/live_stream?channel=${channelId}`;

export const VERIFIED_CHANNELS = {
  'CNN': {
    channelId: 'UCupvZG-5ko_eiXAupbDfxWw',
    country: 'United States',
    hasLiveFeed: true,
    note: 'CNN',
  },
  'Fox News': {
    channelId: 'UCXIJgqnII2ZOINSWNOGFThA',
    country: 'United States',
    hasLiveFeed: true,
    note: 'Fox News',
  },
  'MS NOW': {
    channelId: 'UCaXkIU1QidjPwiAYu6GcHjg',
    country: 'United States',
    hasLiveFeed: false,
    note: 'MSNBC (rebranded MS NOW)',
  },
  'ABC News': {
    channelId: 'UCBi2mrWuNuyYy4gbM6fU18Q',
    country: 'United States',
    hasLiveFeed: true,
    note: 'ABC News',
  },
  'CBS News': {
    channelId: 'UC8p1vwvWtl6T73JiExfWs1g',
    country: 'United States',
    hasLiveFeed: false,
    note: 'CBS News',
  },
  'NBC News': {
    channelId: 'UCeY0bbntWzzVIaj2z3QigXg',
    country: 'United States',
    hasLiveFeed: true,
    note: 'NBC News',
  },
  'Bloomberg Television': {
    channelId: 'UCIALMKvObZNtJ6AmdCLP7Lg',
    country: 'United States',
    hasLiveFeed: true,
    note: 'Bloomberg Television',
  },
  'CNBC': {
    channelId: 'UCvJJ_dzjViJCoLf5uKUTwoA',
    country: 'United States',
    hasLiveFeed: true,
    note: 'CNBC',
  },
  'BBC News': {
    channelId: 'UC16niRr50-MSBwiO3YDb3RA',
    country: 'United Kingdom',
    hasLiveFeed: false,
    note: 'BBC News',
  },
  'Sky News': {
    channelId: 'UCoMdktPbSTixAyNGwb-UYkQ',
    country: 'United Kingdom',
    hasLiveFeed: true,
    note: 'Sky News',
  },
  'ITV News': {
    channelId: 'UCFQgi22Ht00CpaOQLtvZx2A',
    country: 'United Kingdom',
    hasLiveFeed: false,
    note: 'ITV News',
  },
  'France 24 English': {
    channelId: 'UCQfwfsi5VrQ8yKZ-UWmAEFg',
    country: 'France',
    hasLiveFeed: true,
    note: 'FRANCE 24 English',
  },
  'BFMTV': {
    channelId: 'UCXwDLMDV86ldKoFVc_g8P0g',
    country: 'France',
    hasLiveFeed: true,
    note: 'BFMTV',
  },
  'TF1 Info': {
    channelId: 'UCsrPUA0ZSDCNZC6wyRlR7ZA',
    country: 'France',
    hasLiveFeed: false,
    note: 'TF1 INFO',
  },
  'DW News': {
    channelId: 'UCknLrEdhRCp1aegoMqRaCZg',
    country: 'Germany',
    hasLiveFeed: true,
    note: 'DW News',
  },
  'tagesschau': {
    channelId: 'UC5NOEUbkLheQcaaRldYW5GA',
    country: 'Germany',
    hasLiveFeed: false,
    note: 'tagesschau (ARD)',
  },
  'ZDFheute': {
    channelId: 'UCeqKIgPQfNInOswGRWt48kQ',
    country: 'Germany',
    hasLiveFeed: false,
    note: 'ZDFheute Nachrichten',
  },
  'Euronews': {
    channelId: 'UCSrZ3UV4jOidv8ppoVuvW9Q',
    country: 'Pan-European',
    hasLiveFeed: true,
    note: 'euronews',
  },
  'Al Jazeera English': {
    channelId: 'UCNye-wNBqNL5ZzHSJj3l8Bg',
    country: 'Qatar',
    hasLiveFeed: true,
    note: 'Al Jazeera English',
  },
  'TRT World': {
    channelId: 'UC7fWeaHhqgM4Ry-RMpM2YYw',
    country: 'Turkey',
    hasLiveFeed: true,
    note: 'TRT World',
  },
  'Al Arabiya': {
    channelId: 'UCahpxixMCwoANAftn6IxkTg',
    country: 'Saudi Arabia',
    hasLiveFeed: true,
    note: 'AlArabiya',
  },
  'CGTN': {
    channelId: 'UCgrNz-aDmcr2uuto8_DL2jg',
    country: 'China',
    hasLiveFeed: true,
    note: 'CGTN',
  },
  'CCTV': {
    channelId: 'UCcLK3j-XWdGBnt5bR9NJHaQ',
    country: 'China',
    hasLiveFeed: false,
    note: 'CCTV',
  },
  'NHK World-Japan': {
    channelId: 'UCSPEjw8F2nQDtmUKPFNF7_A',
    country: 'Japan',
    hasLiveFeed: true,
    note: 'NHK WORLD-JAPAN',
  },
  'FNN Prime Online': {
    channelId: 'UCoQBJMzcwmXrRSHBFAlTsIw',
    country: 'Japan',
    hasLiveFeed: true,
    note: 'Fuji News Network',
  },
  'TBS NEWS DIG': {
    channelId: 'UC6AG81pAkf6Lbi_1VC5NmPA',
    country: 'Japan',
    hasLiveFeed: true,
    note: 'TBS NEWS DIG',
  },
  'Arirang News': {
    channelId: 'UCzznO4xSV8BKnUBPyswtCUw',
    country: 'South Korea',
    hasLiveFeed: false,
    note: 'Arirang News',
  },
  'CNA': {
    channelId: 'UC83jt4dlz1Gjl58fzQrrKZg',
    country: 'Singapore',
    hasLiveFeed: true,
    note: 'CNA',
  },
  'NDTV': {
    channelId: 'UCZFMm1mMw0F81Z37aaEzTUA',
    country: 'India',
    hasLiveFeed: true,
    note: 'NDTV',
  },
  'India Today': {
    channelId: 'UCYPvAwZP8pZhSMW8qs7cVCw',
    country: 'India',
    hasLiveFeed: true,
    note: 'India Today',
  },
  'Times Now': {
    channelId: 'UC6RJ7-PaXg6TIH2BzZfTV7w',
    country: 'India',
    hasLiveFeed: true,
    note: 'Times Now',
  },
  'Republic World': {
    channelId: 'UCwqusr8YDwM-3mEYTDeJHzw',
    country: 'India',
    hasLiveFeed: true,
    note: 'Republic World',
  },
  'CBC News': {
    channelId: 'UCuFFtHWoLl5fauMMD5Ww2jA',
    country: 'Canada',
    hasLiveFeed: true,
    note: 'CBC News',
  },
  'CTV News': {
    channelId: 'UCi7Zk9baY1tvdlgxIML8MXg',
    country: 'Canada',
    hasLiveFeed: false,
    note: 'CTV News',
  },
  'Global News': {
    channelId: 'UChLtXXpo4Ge1ReTEboVvTDg',
    country: 'Canada',
    hasLiveFeed: false,
    note: 'Global News',
  },
  'ABC News Australia': {
    channelId: 'UCVgO39Bk5sMo66-6o6Spn6Q',
    country: 'Australia',
    hasLiveFeed: true,
    note: 'ABC News (Australia)',
  },
  '7NEWS Australia': {
    channelId: 'UC5T7D-Dh1eDGtsAFCuwv_Sw',
    country: 'Australia',
    hasLiveFeed: false,
    note: '7NEWS Australia',
  },
  '1News': {
    channelId: 'UCxPAYgO8OpFev3PUTKbsxNw',
    country: 'New Zealand',
    hasLiveFeed: false,
    note: '1News (TVNZ)',
  },
  'SABC News': {
    channelId: 'UC8yH-uI81UUtEMDsowQyx1g',
    country: 'South Africa',
    hasLiveFeed: false,
    note: 'SABC News',
  },
  'eNCA': {
    channelId: 'UCI3RT5PGmdi1KVp9FG_CneA',
    country: 'South Africa',
    hasLiveFeed: false,
    note: 'eNCA',
  },
  'Newzroom Afrika': {
    channelId: 'UCQMML3hAsx-Mz9j9ZN0tThQ',
    country: 'South Africa',
    hasLiveFeed: false,
    note: 'Newzroom Afrika',
  },
  'Channels Television': {
    channelId: 'UCEXGDNclvmg6RW0vipJYsTQ',
    country: 'Nigeria',
    hasLiveFeed: true,
    note: 'Channels Television',
  },
  'TVC News Nigeria': {
    channelId: 'UCgp4A6I8LCWrhUzn-5SbKvA',
    country: 'Nigeria',
    hasLiveFeed: true,
    note: 'TVC News',
  },
  'NTA Network': {
    channelId: 'UCLLWAXn5F415g2kNAcE_T1g',
    country: 'Nigeria',
    hasLiveFeed: false,
    note: 'NTA Network',
  },
  'GloboNews': {
    channelId: 'UCp6RRaz93Pt2xYZoEye_rLA',
    country: 'Brazil',
    hasLiveFeed: true,
    note: 'GloboNews',
  },
  'Record News': {
    channelId: 'UCuiLR4p6wQ3xLEm15pEn1Xw',
    country: 'Brazil',
    hasLiveFeed: true,
    note: 'Record News',
  },
  'Band Jornalismo': {
    channelId: 'UCoa-D_VfMkFrCYodrOC9-mA',
    country: 'Brazil',
    hasLiveFeed: false,
    note: 'Band Jornalismo',
  },
  'Milenio': {
    channelId: 'UCFxHplbcoJK9m70c4VyTIxg',
    country: 'Mexico',
    hasLiveFeed: true,
    note: 'MILENIO',
  },
  'N+': {
    channelId: 'UCUsm-fannqOY02PNN67C0KA',
    country: 'Mexico',
    hasLiveFeed: true,
    note: 'N+ (Televisa)',
  },
  'Azteca Noticias': {
    channelId: 'UCUP6qv-_EIL0hwTsJaKYnvw',
    country: 'Mexico',
    hasLiveFeed: true,
    note: 'Azteca Noticias',
  },
  'TN - Todo Noticias': {
    channelId: 'UCj6PcyLvpnIRT_2W_mwa9Aw',
    country: 'Argentina',
    hasLiveFeed: true,
    note: 'Todo Noticias',
  },
  'C5N': {
    channelId: 'UCFgk2Q2mVO1BklRQhSv6p0w',
    country: 'Argentina',
    hasLiveFeed: true,
    note: 'C5N',
  },
  'Somoy TV': {
    channelId: 'UCxHoBXkY88Tb8z1Ssj6CWsQ',
    country: 'Bangladesh',
    hasLiveFeed: true,
    note: 'SOMOY TV',
  },
  'Jovem Pan News': {
    channelId: 'UCP391YRAjSOdM_bwievgaZA',
    country: 'Brazil',
    hasLiveFeed: true,
    note: 'Jovem Pan News',
  },
  'Ictimai TV': {
    channelId: 'UCDVpJfSc-RCGSCfGE2MFGAg',
    country: 'Azerbaijan',
    hasLiveFeed: false,
    note: 'Ictimai Kanal',
  },
  'i24NEWS English': {
    channelId: 'UCvHDpsWKADrDia0c99X37vg',
    country: 'Israel',
    hasLiveFeed: false,
    note: 'i24NEWS English',
  },
  'Iran International': {
    channelId: 'UCWUREZPvqB6L1MuDV5ngiiw',
    country: 'Iran',
    hasLiveFeed: false,
    note: 'Iran International English (UK-based, opposition)',
  },
  'VOA News': {
    channelId: 'UCVSNOxehfALut52NbkfRBaA',
    country: 'United States',
    hasLiveFeed: false,
    note: 'Voice of America',
  },
  'Al Jazeera Arabic': {
    channelId: 'UCfiwzLy-8yKzIbsmZTzxDgw',
    country: 'Qatar',
    hasLiveFeed: true,
    note: 'Al Jazeera Arabic',
  },
  'Al Mayadeen': {
    channelId: 'UCZCFHCU-2eGF7V5ciMkoPHw',
    country: 'Lebanon',
    hasLiveFeed: true,
    note: 'Al Mayadeen (Arabic)',
  },
  'Al Mayadeen English': {
    channelId: 'UCzW1oJMWo5BpHys5QGbpJrA',
    country: 'Lebanon',
    hasLiveFeed: false,
    note: 'Al Mayadeen English',
  },
  'Sky News Arabia': {
    channelId: 'UCIJXOvggjKtCagMfxvcCzAA',
    country: 'United Arab Emirates',
    hasLiveFeed: true,
    note: 'Sky News Arabia',
  },
  'TVP World': {
    channelId: 'UCBjUPsHj7bXt24SUWNoZ0zA',
    country: 'Poland',
    hasLiveFeed: true,
    note: 'TVP World',
  },
  'teleSUR English': {
    channelId: 'UCmuTmpLY35O3csvhyA6vrkg',
    country: 'Venezuela',
    hasLiveFeed: true,
    note: 'teleSUR English',
  },
  'WION': {
    channelId: 'UC_gUM8rL-Lrg6O3adPW9K1g',
    country: 'India',
    hasLiveFeed: true,
    note: 'WION',
  },
  'Africanews': {
    channelId: 'UC1_E8NeF5QHY2dtdLRBCCLA',
    country: 'Pan-African',
    hasLiveFeed: true,
    note: 'Africanews',
  },
  'CNN Brasil': {
    channelId: 'UCvdwhh_fDyWccR42-rReZLw',
    country: 'Brazil',
    hasLiveFeed: true,
    note: 'CNN Brasil',
  },
  'BBC Persian': {
    channelId: 'UCHZk9MrT3DGWmVqdsj5y0EA',
    country: 'United Kingdom',
    hasLiveFeed: true,
    note: 'BBC News Persian',
  },
};

// Broadcasters referenced by the app whose official live channel could not be
// verified. They are deliberately left without a stream URL rather than pointed
// at a guessed or impostor channel.
export const UNVERIFIED_SOURCES = {
  'Russia Today': 'RT is removed from YouTube; the channels returned by search are impostors. Official live feed is on Rumble (https://rumble.com/c/RTNews) which has no stable embed ID.',
  'Rossiya 24': 'No official YouTube channel reachable.',
  'Phoenix TV': 'No official YouTube channel resolved.',
  'Sky News Australia': 'Search resolves only to an ambiguous "News24" channel; identity not confirmed.',
  'NTV': 'Ambiguous name (Russia / Kenya / Japan); no single official channel.',
};

// Live embed URL for a channel name, or null when there is nothing verified to show.
export const getStreamUrl = (name) => {
  const ch = VERIFIED_CHANNELS[name];
  return ch && ch.hasLiveFeed ? embed(ch.channelId) : null;
};

// Channel home URL for a verified broadcaster, or null.
export const getChannelUrl = (name) => {
  const ch = VERIFIED_CHANNELS[name];
  return ch ? `https://www.youtube.com/channel/${ch.channelId}` : null;
};

export const isVerified = (name) =>
  Object.prototype.hasOwnProperty.call(VERIFIED_CHANNELS, name);

export const getLiveChannels = () =>
  Object.entries(VERIFIED_CHANNELS)
    .filter(([, ch]) => ch.hasLiveFeed)
    .map(([name, ch]) => ({ name, ...ch, streamUrl: embed(ch.channelId) }));
