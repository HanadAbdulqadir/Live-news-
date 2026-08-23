import React, { useState, useMemo } from 'react';
import CountriesList from './CountriesList';
import { getSourcesByContinent, getDirectoryStats } from './globalNewsData';

const CountriesPage = ({ onCountrySelect, onSourceSelect, searchQuery, setSearchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  
  // Continent options come from the directory, so the filter can never offer a
  // region that has no countries behind it.
  const continents = useMemo(
    () => [
      { value: 'all', label: 'All Continents' },
      ...Object.keys(getSourcesByContinent())
        .sort()
        .map((name) => ({ value: name, label: name })),
    ],
    []
  );

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

  const stats = getDirectoryStats();

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
            {stats.sources} broadcasters across {stats.countries} countries. {stats.verified} are
            matched to a confirmed official channel and {stats.live} were streaming live when the
            directory was last built; the rest link straight to the broadcaster.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CountriesPage;
