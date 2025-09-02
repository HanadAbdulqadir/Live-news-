import React from 'react';
import { ALL_COUNTRIES, getNewsSourcesForCountry } from './countries';

const CountriesList = ({ onCountrySelect }) => {
  const continents = {
    'North America': ALL_COUNTRIES.slice(0, 3),
    'Central America': ALL_COUNTRIES.slice(3, 10),
    'Caribbean': ALL_COUNTRIES.slice(10, 23),
    'South America': ALL_COUNTRIES.slice(23, 35),
    'Europe': ALL_COUNTRIES.slice(35, 85),
    'Africa': ALL_COUNTRIES.slice(85, 140),
    'Asia': ALL_COUNTRIES.slice(140, 182),
    'Oceania': ALL_COUNTRIES.slice(182)
  };

  return (
    <div className="countries-section">
      <h2 className="countries-title">Countries of the World</h2>
      <p className="countries-subtitle">
        Explore news sources from 195 countries around the globe
      </p>
      
      {Object.entries(continents).map(([continent, countries]) => (
        <div key={continent} className="continent-group">
          <h3 className="continent-title">{continent}</h3>
          <div className="countries-grid">
            {countries.map(country => (
              <div
                key={country}
                className="country-card"
                onClick={() => onCountrySelect(country)}
              >
                <h4 className="country-name">{country}</h4>
                <div className="country-sources">
                  {getNewsSourcesForCountry(country).map((source, index) => (
                    <span key={index} className="source-tag">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
