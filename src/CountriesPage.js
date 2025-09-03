import React, { useState, useMemo } from 'react';
import CountriesList from './CountriesList';

const CountriesPage = ({ onCountrySelect, onSourceSelect, searchQuery, setSearchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  
  // Continent filter options
  const continents = [
    { value: 'all', label: 'All Continents' },
    { value: 'North America', label: 'North America' },
    { value: 'Central America', label: 'Central America' },
    { value: 'Caribbean', label: 'Caribbean' },
    { value: 'South America', label: 'South America' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Oceania', label: 'Oceania' }
  ];

  // Memoized search handler
  const handleSearch = useMemo(() => (query) => {
    setLocalSearchQuery(query);
    if (setSearchQuery) {
      setSearchQuery(query);
    }
  }, [setSearchQuery]);

  // Clear search function
  const clearSearch = () => {
    setLocalSearchQuery('');
    if (setSearchQuery) {
      setSearchQuery('');
    }
  };

  // Filter countries based on search and continent
  const filteredCountries = useMemo(() => {
    // This would be implemented with actual country data filtering
    // For now, we'll pass the filters to CountriesList
    return {
      searchQuery: localSearchQuery,
      continent: selectedContinent
    };
  }, [localSearchQuery, selectedContinent]);
  return (
    <div className="countries-page">
      {/* Hero Section for Countries */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">News by Country</h1>
          <p className="hero-subtitle">
            Explore news channels from specific countries around the world
          </p>
        </div>
      </section>

      {/* Search and Filter Controls */}
      <div className="search-filter-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search countries..."
            value={localSearchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {localSearchQuery && (
            <button className="clear-search" onClick={clearSearch}>
              ×
            </button>
          )}
        </div>
        
        <div className="continent-filter">
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
            className="continent-select"
          >
            {continents.map(continent => (
              <option key={continent.value} value={continent.value}>
                {continent.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Countries List Section */}
      <CountriesList 
        onCountrySelect={onCountrySelect} 
        onSourceSelect={onSourceSelect}
        searchQuery={localSearchQuery}
        selectedContinent={selectedContinent}
      />
      
      {/* Global News Overview */}
      <section className="content-row">
        <h2 className="row-title">Global Coverage</h2>
        <div className="global-coverage">
          <p>
            Our platform provides comprehensive news coverage from over 50 countries worldwide, 
            ensuring you get diverse perspectives on global events from trusted international sources.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CountriesPage;
