import React from 'react';
import { Link } from 'react-router-dom';
import { getDirectoryStats } from './globalNewsData';
import { getPerspectiveCountries } from './perspectives';

const HomeTab = ({ filteredCategories, setSelectedSource }) => {
  const stats = getDirectoryStats();
  const featured = getPerspectiveCountries()
    .filter((c) => c.playable >= 3)
    .slice(0, 8);

  // Only broadcasters with a confirmed live feed get a player; the rest are
  // reachable from the country pages as links.
  const categories = filteredCategories
    .map((category) => ({
      ...category,
      sources: category.sources.filter((source) => source.streamUrl),
    }))
    .filter((category) => category.sources.length > 0);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Global News Stream</h1>
          <p className="hero-subtitle">
            Live news from around the world — and, where it matters most, the same story
            told by the state broadcaster, the international press and the opposition, side
            by side.
          </p>
        </div>
      </section>

      {/* News Channels by Continent */}
      {categories.map((category) => (
        <section key={category.id} className="content-row">
          <h2 className="row-title">{category.title}</h2>
          <div className="streams-grid">
            {category.sources.map((source) => (
              <div
                key={`${source.country}-${source.id}`}
                className="stream"
                onClick={() => setSelectedSource(source)}
              >
                <div className="stream-thumbnail">
                  <iframe
                    src={source.streamUrl}
                    title={source.name}
                    allowFullScreen
                    className="stream-iframe"
                  />
                  <div className="stream-overlay"></div>
                </div>
                <div className="stream-info">
                  <h3 className="stream-title">{source.name}</h3>
                  <p className="stream-description">
                    {source.flag} {source.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {categories.length === 0 && (
        <section className="content-row">
          <p className="compare-empty">
            No live feeds match the current filters. Browse by country to reach every
            broadcaster in the directory.
          </p>
        </section>
      )}

      {/* Real directory numbers, not round ones */}
      <section className="content-row">
        <h2 className="row-title">Global Coverage</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.countries}</h3>
            <p>Countries Covered</p>
          </div>
          <div className="stat-card">
            <h3>{stats.sources}</h3>
            <p>Broadcasters Listed</p>
          </div>
          <div className="stat-card">
            <h3>{stats.verified}</h3>
            <p>Confirmed Channels</p>
          </div>
          <div className="stat-card">
            <h3>{stats.live}</h3>
            <p>Live Feeds</p>
          </div>
        </div>
      </section>

      {/* Comparison entry points */}
      <section className="content-row">
        <h2 className="row-title">⚖️ See a country from four directions</h2>
        <p className="compare-note">
          State broadcaster, international press, independent domestic outlets and external
          or opposition coverage — playing at the same time.
        </p>
        <div className="compare-country-grid">
          {featured.map(({ country, flag, playable, total }) => (
            <Link
              key={country}
              to={`/compare/${encodeURIComponent(country)}`}
              className="compare-country-card"
            >
              <span className="compare-country-flag">{flag}</span>
              <span className="compare-country-name">{country}</span>
              <span className="compare-country-meta">
                {playable} live · {total} sources
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Watching Global News Now</h2>
          <p>
            Every channel here was matched to the broadcaster&apos;s own account. Where we
            could not confirm one, you get a link to the broadcaster instead of a player
            that will not load.
          </p>
          <div className="cta-buttons">
            <Link to="/live" className="cta-button primary">
              Watch Live News
            </Link>
            <Link to="/countries" className="cta-button secondary">
              Browse by Country
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeTab;
