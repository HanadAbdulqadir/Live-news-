import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNewsSourceData } from './countries';
import { GLOBAL_NEWS_SOURCES, getSourcesByContinent, getDirectoryStats } from './globalNewsData';
import { hasPerspectives } from './perspectives';

const CONTINENT_ORDER = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
];

const CountriesList = ({ onCountrySelect, onSourceSelect, searchQuery = '', selectedContinent = 'all' }) => {
  const navigate = useNavigate();
  const stats = getDirectoryStats();
  const term = searchQuery.trim().toLowerCase();

  // The page above owns the search box and the continent select; honour both.
  const continents = {};
  Object.entries(getSourcesByContinent()).forEach(([continent, entries]) => {
    if (selectedContinent !== 'all' && continent !== selectedContinent) return;
    const matching = term
      ? entries.filter(
          (entry) =>
            entry.name.toLowerCase().includes(term) ||
            entry.sources.some((source) => source.name.toLowerCase().includes(term))
        )
      : entries;
    if (matching.length > 0) continents[continent] = matching;
  });

  const ordered = [
    ...CONTINENT_ORDER.filter((c) => continents[c]),
    ...Object.keys(continents).filter((c) => !CONTINENT_ORDER.includes(c)),
  ];

  return (
    <div className="countries-section">
      <h2 className="countries-title">Countries of the World</h2>
      <p className="countries-subtitle">
        {stats.sources} broadcasters across {stats.countries} countries · {stats.verified} with a
        confirmed channel · {stats.live} live
      </p>

      {ordered.map((continent) => (
        <div key={continent} className="continent-group">
          <h3 className="continent-title">
            {continent} <span className="continent-count">{continents[continent].length}</span>
          </h3>
          <div className="countries-grid">
            {continents[continent].map((entry) => {
              const sources = getNewsSourceData(entry.name);
              const liveCount = sources.filter((s) => s.streamUrl).length;
              return (
                <Link
                  key={entry.id}
                  to={`/country/${encodeURIComponent(entry.name)}`}
                  className="country-card-link"
                >
                  <div
                    className="country-card"
                    onClick={(e) => {
                      e.preventDefault();
                      onCountrySelect(entry.name);
                      navigate(`/country/${encodeURIComponent(entry.name)}`);
                    }}
                  >
                    <h4 className="country-name">
                      <span className="country-flag">{entry.flag}</span>
                      {entry.name}
                    </h4>
                    <div className="country-sources">
                      {sources.slice(0, 3).map((source) => (
                        <span
                          key={source.id}
                          className={`source-tag${source.streamUrl ? ' source-tag-live' : ''}`}
                          style={{ backgroundColor: source.color, borderColor: source.color }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (onSourceSelect) onSourceSelect(source, entry.name);
                            navigate(`/country/${encodeURIComponent(entry.name)}`);
                          }}
                          title={
                            source.streamUrl
                              ? `Watch ${source.name} live`
                              : `${source.name} — no live feed`
                          }
                        >
                          {source.name}
                        </span>
                      ))}
                      {sources.length > 3 && (
                        <span
                          className="source-tag"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            navigate(`/country/${encodeURIComponent(entry.name)}`);
                          }}
                          title={`View all ${sources.length} broadcasters from ${entry.name}`}
                        >
                          +{sources.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="country-stats">
                      <span className="stat-item">
                        <span className="stat-icon">📺</span>
                        {sources.length} broadcaster{sources.length === 1 ? '' : 's'}
                      </span>
                      <span className="stat-item">
                        <span className="stat-icon">{liveCount > 0 ? '🔴' : '🔗'}</span>
                        {liveCount > 0 ? `${liveCount} live` : 'links only'}
                      </span>
                      {hasPerspectives(entry.name) && (
                        <span className="stat-item" title="Multi-perspective comparison available">
                          <span className="stat-icon">⚖️</span>
                          compare
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {ordered.length === 0 && (
        <p className="compare-empty">
          {GLOBAL_NEWS_SOURCES.length === 0
            ? 'The directory is empty — run the build script.'
            : `No country matches "${searchQuery}".`}
        </p>
      )}
    </div>
  );
};

export default CountriesList;
