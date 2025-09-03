import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_COUNTRIES, getNewsSourcesForCountry, getNewsSourceData } from './countries';

const CountriesList = ({ onCountrySelect, onSourceSelect }) => {
  const navigate = useNavigate();
  const [hoveredSource, setHoveredSource] = useState(null);

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
              <Link
                key={country}
                to={`/country/${encodeURIComponent(country)}`}
                className="country-card-link"
              >
                <div
                  className="country-card"
                  onClick={(e) => {
                    e.preventDefault();
                    onCountrySelect(country);
                  }}
                >
                  <h4 className="country-name">
                    <span className="country-flag">🌍</span>
                    {country}
                  </h4>
                  <div className="country-sources">
                    {getNewsSourcesForCountry(country).slice(0, 3).map((source, index) => {
                      const sourceData = getNewsSourceData(country).find(s => s.name === source);
                      return (
                        <span 
                          key={index} 
                          className="source-tag"
                          style={{ 
                            backgroundColor: sourceData?.color || '#404040',
                            borderColor: sourceData?.color || '#555'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (onSourceSelect && sourceData) {
                              onSourceSelect(sourceData, country);
                              navigate(`/country/${encodeURIComponent(country)}`);
                            }
                          }}
                          onMouseEnter={() => setHoveredSource(`${country}-${source}`)}
                          onMouseLeave={() => setHoveredSource(null)}
                          title={`Watch ${source} from ${country}`}
                        >
                          {source}
                        </span>
                      );
                    })}
                    {getNewsSourcesForCountry(country).length > 3 && (
                      <span 
                        className="source-tag"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          navigate(`/country/${encodeURIComponent(country)}`);
                        }}
                        title={`View all ${getNewsSourcesForCountry(country).length} channels from ${country}`}
                      >
                        +{getNewsSourcesForCountry(country).length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="country-stats">
                    <span className="stat-item">
                      <span className="stat-icon">📺</span>
                      {getNewsSourcesForCountry(country).length} channels
                    </span>
                    <span className="stat-item">
                      <span className="stat-icon">⭐</span>
                      {Math.floor(Math.random() * 5) + 1}/5
                    </span>
                  </div>
                  {hoveredSource && hoveredSource.startsWith(`${country}-`) && (
                    <div className="source-tooltip">
                      Click to watch {hoveredSource.split('-')[1]} from {country}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
