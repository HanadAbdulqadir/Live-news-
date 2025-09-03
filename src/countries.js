// Comprehensive list of countries from around the world
export const ALL_COUNTRIES = [
  // North America
  'United States', 'Canada', 'Mexico',
  
  // Central America
  'Belize', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Panama',
  
  // Caribbean
  'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Cuba', 'Dominica', 'Dominican Republic',
  'Grenada', 'Haiti', 'Jamaica', 'Saint Kitts and Nevis', 'Saint Lucia', 
  'Saint Vincent and the Grenadines', 'Trinidad and Tobago',
  
  // South America
  'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana',
  'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela',
  
  // Europe
  'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
  'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece',
  'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco',
  'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal',
  'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain',
  'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City',
  
  // Africa
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
  'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo', 
  'Democratic Republic of the Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea',
  'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea',
  'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar',
  'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia',
  'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles',
  'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania',
  'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe',
  
  // Asia
  'Afghanistan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China',
  'East Timor', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan',
  'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia',
  'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines',
  'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria',
  'Taiwan', 'Tajikistan', 'Thailand', 'Turkmenistan', 'United Arab Emirates',
  'Uzbekistan', 'Vietnam', 'Yemen',
  
  // Oceania
  'Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru',
  'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga',
  'Tuvalu', 'Vanuatu'
];

// Get news sources for specific countries
export const getNewsSourcesForCountry = (country) => {
  const sources = {
    // North America
    'United States': ['CNN', 'Fox News', 'MSNBC', 'ABC News', 'NBC News', 'CBS News', 'Bloomberg', 'CNBC'],
    'Canada': ['CBC News', 'CTV News', 'Global News', 'CityNews', 'CP24'],
    'Mexico': ['Televisa', 'TV Azteca', 'Milenio', 'Excelsior TV', 'Foro TV'],
    
    // Central America
    'Belize': ['Channel 5 Belize', 'Love FM', 'Plus TV'],
    'Costa Rica': ['Teletica', 'Repretel', 'Canal 7'],
    'El Salvador': ['Canal 4', 'Canal 12', 'TVX'],
    'Guatemala': ['Canal Antigua', 'Guatevision', 'Canal 3'],
    'Honduras': ['Canal 5', 'Canal 6', 'Canal 11'],
    'Nicaragua': ['Canal 4', 'Canal 6', 'Canal 10'],
    'Panama': ['TVN', 'RPC', 'Telemetro'],
    
    // Caribbean
    'Antigua and Barbuda': ['ABS TV', 'Observer Radio'],
    'Bahamas': ['ZNS Bahamas', 'Our News'],
    'Barbados': ['CBC TV8', 'Nation News'],
    'Cuba': ['CubaDebate', 'Cubavision', 'Tele Rebelde'],
    'Dominica': ['DBS Radio', 'Kairi FM'],
    'Dominican Republic': ['Color Vision', 'Teleantillas', 'CDN'],
    'Grenada': ['GBN', 'GIS'],
    'Haiti': ['Tele Haiti', 'Canal+ Haiti'],
    'Jamaica': ['TVJ', 'CVM TV', 'RJR'],
    'Saint Kitts and Nevis': ['ZIZ', 'WINN FM'],
    'Saint Lucia': ['HTS', 'DBS'],
    'Saint Vincent and the Grenadines': ['NBC', 'WE FM'],
    'Trinidad and Tobago': ['CNC3', 'TV6', 'C News'],
    
    // South America
    'Argentina': ['TN', 'C5N', 'América TV', 'Crónica TV'],
    'Bolivia': ['ATB', 'Red Uno', 'Bolivia TV'],
    'Brazil': ['Globo News', 'Record News', 'Band News', 'SBT'],
    'Chile': ['TVN', 'Chilevisión', 'Mega', 'CNN Chile'],
    'Colombia': ['Caracol', 'RCN', 'Canal 1'],
    'Ecuador': ['Ecuavisa', 'Teleamazonas', 'TC Televisión'],
    'Guyana': ['NCN', 'GTV', 'News Source'],
    'Paraguay': ['Telefuturo', 'SNT', 'Paraguay TV'],
    'Peru': ['América TV', 'Panamericana', 'Latina'],
    'Suriname': ['STVS', 'ABC', 'RBN'],
    'Uruguay': ['Teledoce', 'Canal 10', 'Montecarlo'],
    'Venezuela': ['Telesur', 'Venevisión', 'Globovisión'],
    
    // Europe
    'United Kingdom': ['BBC News', 'Sky News', 'ITV News', 'Channel 4 News', 'GB News'],
    'France': ['France 24', 'BFM TV', 'TF1', 'LCI', 'France Info'],
    'Germany': ['DW News', 'ARD', 'ZDF', 'n-tv', 'Phoenix'],
    'Italy': ['RAI News', 'Sky TG24', 'Mediaset', 'La7', 'Tgcom24'],
    'Spain': ['RTVE', 'Antena 3', 'Telecinco', 'La Sexta', 'Cuatro'],
    'Russia': ['Russia Today', 'Rossiya 24', 'NTV'],
    'Netherlands': ['NOS', 'RTL Nieuws', 'SBS6'],
    'Sweden': ['SVT', 'TV4', 'Aftonbladet TV'],
    'Norway': ['NRK', 'TV2', 'TVNorge'],
    'Poland': ['TVP Info', 'Polsat News', 'TVN24'],
    'Ukraine': ['1+1', 'Inter', 'Ukraina'],
    'Greece': ['ERT', 'Mega', 'ANT1'],
    'Portugal': ['RTP', 'SIC', 'TVI'],
    'Ireland': ['RTÉ', 'Virgin Media', 'TG4'],
    'Switzerland': ['SRF', 'RTS', 'RSI'],
    'Austria': ['ORF', 'ATV', 'Puls 4'],
    'Belgium': ['VRT', 'RTBF', 'RTL'],
    'Denmark': ['DR', 'TV2', 'TV3'],
    'Finland': ['Yle', 'MTV', 'Nelonen'],
    
    // Africa
    'South Africa': ['SABC News', 'eNCA', 'Newzroom Afrika', 'eTV'],
    'Nigeria': ['NTA', 'Channels TV', 'TVC News', 'AIT'],
    'Egypt': ['Egypt Today', 'Al Masry Al Youm', 'ON TV', 'CBC Extra'],
    'Kenya': ['KBC Kenya', 'NTV Kenya', 'Citizen TV', 'K24'],
    'Ghana': ['GTV', 'TV3', 'Metro TV', 'Joy News'],
    'Morocco': ['2M', 'Al Aoula', 'Medi1 TV'],
    'Algeria': ['ENTV', 'El Bilad TV', 'Echorouk TV'],
    'Tunisia': ['Watania 1', 'Hannibal TV', 'Nessma TV'],
    'Ethiopia': ['ETV', 'Fana TV', 'ESAT'],
    'Uganda': ['NTV Uganda', 'UBC', 'Bukedde TV'],
    'Tanzania': ['ITV', 'TBC', 'Clouds TV'],
    'Zimbabwe': ['ZBC', 'ZTN', '3K TV'],
    'Zambia': ['ZNBC', 'Muvi TV', 'Prime TV'],
    'Senegal': ['RTS', '2STV', 'TFM'],
    'Ivory Coast': ['RTI', 'NCI', 'Life TV'],
    'Cameroon': ['CRTV', 'Canal 2', 'STV'],
    'DR Congo': ['RTNC', 'Digital Congo', 'Canal Kin TV'],
    
    // Asia
    'China': ['CGTN', 'CCTV', 'Phoenix TV', 'Dragon TV', 'Hunan TV'],
    'India': ['NDTV India', 'Republic TV', 'Times Now', 'India Today', 'Aaj Tak'],
    'Japan': ['NHK World', 'Fuji TV', 'TBS', 'TV Asahi', 'NTV'],
    'South Korea': ['KBS World', 'MBC', 'SBS', 'JTBC', 'TV Chosun'],
    'Indonesia': ['TVRI', 'RCTI', 'SCTV', 'Metro TV', 'TV One'],
    'Philippines': ['ABS-CBN', 'GMA News', 'TV5', 'CNN Philippines'],
    'Thailand': ['Thai PBS', 'Channel 3', 'Channel 7', 'Workpoint'],
    'Vietnam': ['VTV', 'HTV', 'VTC', 'ANTV'],
    'Malaysia': ['RTM', 'TV3', 'Astro Awani', 'Bernama TV'],
    'Singapore': ['Channel NewsAsia', 'Mediacorp', 'CNA'],
    'Pakistan': ['Geo News', 'ARY News', 'Dawn News', 'Express News'],
    'Bangladesh': ['Channel 24', 'ATN News', 'NTV', 'RTV'],
    'Sri Lanka': ['Sirasa TV', 'Hiru TV', 'Derana', 'ITN'],
    'Nepal': ['NTV Nepal', 'Kantipur TV', 'News 24'],
    'Myanmar': ['MRTV', 'Sky Net', 'Channel 7'],
    'Cambodia': ['TVK', 'CTN', 'Bayon TV'],
    'Laos': ['Lao National TV', 'Lao Star Channel'],
    'Mongolia': ['MNB', 'TV5', 'TV9'],
    
    // Middle East
    'Saudi Arabia': ['Al Arabiya', 'Saudi TV', 'MBC', 'Rotana'],
    'UAE': ['Sky News Arabia', 'Dubai TV', 'Abu Dhabi TV', 'Al Arabiya'],
    'Qatar': ['Al Jazeera', 'Qatar TV', 'Al Rayyan TV'],
    'Turkey': ['TRT World', 'CNN Türk', 'NTV', 'Habertürk'],
    'Iran': ['Press TV', 'IRIB', 'Hispan TV'],
    'Iraq': ['Al Iraqiya', 'Al Sumaria', 'Rudaw'],
    'Israel': ['i24 News', 'Channel 12', 'Channel 13', 'Kan 11'],
    'Jordan': ['Roya TV', 'Al Mamlaka', 'Jordan TV'],
    'Lebanon': ['LBCI', 'Al Jadeed', 'MTV Lebanon'],
    'Kuwait': ['KTV', 'Al Rai TV', 'Sahara TV'],
    'Oman': ['Oman TV', 'Al Roya', 'Shabiba TV'],
    'Bahrain': ['Bahrain TV', 'Al Arabiya', 'Sawt al Bahrain'],
    'Yemen': ['Yemen TV', 'Al Masirah', 'Aden TV'],
    'Syria': ['Syria TV', 'Al Ikhbariya', 'Orient TV'],
    'Palestine': ['Palestine TV', 'Al Quds', 'Ma\'an TV'],
    
    // Oceania
    'Australia': ['ABC News Australia', 'Sky News Australia', '7 News', '9 News', '10 News'],
    'New Zealand': ['TVNZ', 'RNZ Pacific', 'Newshub', 'Three'],
    'Fiji': ['Fiji TV', 'FBC TV', 'Mai TV'],
    'Papua New Guinea': ['EMTV', 'Kundu 2', 'NBC PNG'],
    'Samoa': ['TV1 Samoa', 'Samoa Broadcasting'],
    'Tonga': ['Tonga Broadcasting', 'TV Tonga'],
    'Vanuatu': ['VBTC', 'TV Blong Vanuatu'],
    'Solomon Islands': ['SIBC', 'One News'],
    'Kiribati': ['Radio Kiribati', 'Te Uekera'],
    'Micronesia': ['FSM TV', 'Island Times'],
    'Marshall Islands': ['MBC', 'Marshall Islands Journal'],
    'Palau': ['Tia Belau', 'Palau Wave Radio'],
    'Nauru': ['Nauru TV', 'Nauru Bulletin'],
    'Tuvalu': ['Radio Tuvalu', 'Tuvalu News']
  };
  
  return sources[country] || [`${country} News`, `${country} Broadcasting`, `${country} TV Network`];
};

// Generate dummy stream URLs for news channels
export const getDummyStreamUrl = (channelName, country) => {
  const baseUrls = {
    'United States': [
      'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw', // CNN
      'https://www.youtube.com/embed/live_stream?channel=UCXIJgqnII2ZOINSWNOGFThA', // Fox News
      'https://www.youtube.com/embed/live_stream?channel=UCaXkIU1QidjPwiAYu6GcHjg', // MSNBC
      'https://www.youtube.com/embed/live_stream?channel=UCBi2mrWuNuyYy4gbM6fU18Q', // ABC News
      'https://www.youtube.com/embed/live_stream?channel=UCYfdidRxbB8Qhf0Nx7ioOYw', // NBC News
      'https://www.youtube.com/embed/live_stream?channel=UCeY0bbntWzzVIaj2z3QigXg', // CBS News
      'https://www.youtube.com/embed/live_stream?channel=UCu4f9B5d7NY1N8qQ2WbXy2w', // Bloomberg
      'https://www.youtube.com/embed/live_stream?channel=UCvZp8ML1qH6qZx2qNtJZ7zA'  // CNBC
    ],
    'United Kingdom': [
      'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA', // BBC News
      'https://www.youtube.com/embed/live_stream?channel=UCsy-SVa2BXD8qLIb1XwL78w', // Sky News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // ITV News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Channel 4 News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // GB News
    ],
    'Canada': [
      'https://www.youtube.com/embed/live_stream?channel=UCuFFtHWoLl5fauMMD5Ww2jA', // CBC News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // CTV News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Global News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // CityNews
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // CP24
    ],
    'Australia': [
      'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ', // ABC News Australia
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Sky News Australia
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // 7 News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // 9 News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // 10 News
    ],
    'Germany': [
      'https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg', // DW News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // ARD
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // ZDF
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // n-tv
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // Phoenix
    ],
    'France': [
      'https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg', // France 24
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // BFM TV
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // TF1
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // LCI
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // France Info
    ],
    'Japan': [
      'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ', // NHK World
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Fuji TV
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // TBS
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // TV Asahi
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // NTV
    ],
    'China': [
      'https://www.youtube.com/embed/live_stream?channel=UCgr2ZlgS4p_8p2wWgKbqoJQ', // CGTN
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // CCTV
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Phoenix TV
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Dragon TV
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // Hunan TV
    ],
    'India': [
      'https://www.youtube.com/embed/live_stream?channel=UC9CYT9gSNLevX5ey2_6CK0Q', // NDTV India
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Republic TV
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Times Now
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // India Today
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // Aaj Tak
    ],
    'Qatar': [
      'https://www.youtube.com/embed/live_stream?channel=UCt3g2lIDcU5Y5p2-m1w1vjQ', // Al Jazeera
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Qatar TV
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // Al Rayyan TV
    ],
    'South Africa': [
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // SABC News
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // eNCA
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ', // Newzroom Afrika
      'https://www.youtube.com/embed/live_stream?channel=UCqQn4A5V4jL8Qz4Z5Q5Z5ZQ'  // eTV
    ]
  };

  // Use a specific URL if available for the country
  const countryUrls = baseUrls[country];
  if (countryUrls && countryUrls.length > 0) {
    return countryUrls[Math.floor(Math.random() * countryUrls.length)];
  }

  // Fallback to generic YouTube live stream URLs
  const fallbackUrls = [
    'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw', // CNN
    'https://www.youtube.com/embed/live_stream?channel=UCXIJgqnII2ZOINSWNOGFThA', // Fox News
    'https://www.youtube.com/embed/live_stream?channel=UCaXkIU1QidjPwiAYu6GcHjg', // MSNBC
    'https://www.youtube.com/embed/live_stream?channel=UCBi2mrWuNuyYy4gbM6fU18Q', // ABC News
    'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA', // BBC News
    'https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg', // France 24
    'https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg', // DW News
    'https://www.youtube.com/embed/live_stream?channel=UCsy-SVa2BXD8qLIb1XwL78w', // Sky News
    'https://www.youtube.com/embed/live_stream?channel=UCW2QcKZiU8aUGg4yxCIditg', // Euronews
    'https://www.youtube.com/embed/live_stream?channel=UCt3g2lIDcU5Y5p2-m1w1vjQ', // Al Jazeera
    'https://www.youtube.com/embed/live_stream?channel=UCgr2ZlgS4p_8p2wWgKbqoJQ', // CGTN
    'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4Z5ZQ5ZQ5ZQ5ZQ', // NHK World
    'https://www.youtube.com/embed/live_stream?channel=UC9CYT9gSNLevX5ey2_6CK0Q'  // NDTV India
  ];

  return fallbackUrls[Math.floor(Math.random() * fallbackUrls.length)];
};

// Get complete news source data with dummy URLs
export const getNewsSourceData = (country) => {
  const sources = getNewsSourcesForCountry(country);
  return sources.map(source => ({
    id: source.toLowerCase().replace(/\s+/g, '-'),
    name: source,
    streamUrl: getDummyStreamUrl(source, country),
    color: getRandomColor(),
    country: country,
    description: `${source} - ${country}'s leading news channel providing comprehensive coverage of local and international events`
  }));
};

// Generate random colors for channel branding
const getRandomColor = () => {
  const colors = [
    '#e50914', '#0066cc', '#008000', '#ff6600', '#9900cc', '#cc0000',
    '#003366', '#0046d5', '#0c54a0', '#bb1919', '#0055a4', '#002d72',
    '#0070d2', '#083eab', '#9c0000', '#0066cc', '#e3000f', '#ff6600',
    '#ff0000', '#0066cc', '#ff6600'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
