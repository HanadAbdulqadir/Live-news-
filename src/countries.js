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
    'United States': ['CNN', 'Fox News', 'MSNBC', 'ABC News', 'NBC News', 'CBS News'],
    'Canada': ['CBC News', 'CTV News', 'Global News'],
    'Mexico': ['Televisa', 'TV Azteca', 'Milenio'],
    
    // Europe
    'United Kingdom': ['BBC News', 'Sky News', 'ITV News', 'Channel 4 News'],
    'France': ['France 24', 'BFM TV', 'TF1'],
    'Germany': ['DW News', 'ARD', 'ZDF'],
    'Italy': ['RAI News', 'Sky TG24', 'Mediaset'],
    'Spain': ['RTVE', 'Antena 3', 'Telecinco'],
    
    // Asia
    'China': ['CGTN', 'CCTV', 'Phoenix TV'],
    'India': ['NDTV India', 'Republic TV', 'Times Now'],
    'Japan': ['NHK World', 'Fuji TV', 'TBS'],
    'South Korea': ['KBS World', 'MBC', 'SBS'],
    
    // Middle East
    'Saudi Arabia': ['Al Arabiya', 'Saudi TV'],
    'UAE': ['Sky News Arabia', 'Dubai TV'],
    'Qatar': ['Al Jazeera'],
    'Turkey': ['TRT World'],
    
    // Africa
    'South Africa': ['SABC News', 'eNCA'],
    'Nigeria': ['NBC Africa', 'Channels TV'],
    'Egypt': ['Egypt Today', 'Al Masry Al Youm'],
    'Kenya': ['KBC Kenya', 'NTV Kenya'],
    
    // Latin America
    'Brazil': ['Globo News', 'Record News'],
    'Argentina': ['TN', 'C5N'],
    'Chile': ['TVN', 'Chilevisión'],
    'Venezuela': ['Telesur'],
    'Cuba': ['CubaDebate'],
    
    // Oceania
    'Australia': ['ABC News Australia', 'Sky News Australia'],
    'New Zealand': ['TVNZ', 'RNZ Pacific']
  };
  
  return sources[country] || [`${country} News`];
};
