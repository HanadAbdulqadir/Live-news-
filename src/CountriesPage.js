import React from 'react';
import CountriesList from './CountriesList';

const CountriesPage = ({ onCountrySelect, searchQuery, setSearchQuery }) => {
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

      {/* Countries List Section */}
      <CountriesList onCountrySelect={onCountrySelect} />
      
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
