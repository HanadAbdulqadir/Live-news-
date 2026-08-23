import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPerspectives, getPerspectiveCountries, TIERS, TIER_ORDER } from './perspectives';
import { VERIFIED_AT } from './verifiedStreams';

const MAX_PANES = 4;

// Pick a default set of up to four feeds, preferring one from each tier so the
// opening view is a contrast rather than four versions of the same position.
const defaultSelection = (sources) => {
  const playable = sources.filter((s) => s.playable);
  const picked = [];
  TIER_ORDER.forEach((tier) => {
    if (picked.length >= MAX_PANES) return;
    const first = playable.find((s) => s.tier === tier && !picked.includes(s.id));
    if (first) picked.push(first.id);
  });
  playable.forEach((s) => {
    if (picked.length < MAX_PANES && !picked.includes(s.id)) picked.push(s.id);
  });
  return picked;
};

// All panes start muted: four live newsrooms at once is unusable otherwise.
const paneSrc = (streamUrl) => `${streamUrl}&autoplay=1&mute=1`;

const CountryPicker = () => {
  const countries = useMemo(() => getPerspectiveCountries(), []);
  return (
    <div className="compare-page">
      <div className="page-header">
        <h1 className="page-title">Compare coverage</h1>
        <p className="page-subtitle">
          Pick a country to watch how state, international, independent and external
          broadcasters each tell the same story.
        </p>
      </div>
      <div className="compare-country-grid">
        {countries.map(({ country, flag, playable, total }) => (
          <Link key={country} to={`/compare/${encodeURIComponent(country)}`} className="compare-country-card">
            <span className="compare-country-flag">{flag}</span>
            <span className="compare-country-name">{country}</span>
            <span className="compare-country-meta">
              {playable} live · {total} sources
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ComparePage = () => {
  const { countryName } = useParams();
  const country = countryName ? decodeURIComponent(countryName) : null;
  const data = useMemo(() => (country ? getPerspectives(country) : null), [country]);
  const [selected, setSelected] = useState(() =>
    data ? defaultSelection(data.sources) : []
  );

  if (!country) return <CountryPicker />;

  if (!data) {
    return (
      <div className="compare-page">
        <div className="page-header">
          <Link to="/compare" className="back-button">← All countries</Link>
          <h1 className="page-title">No perspective set for {country}</h1>
          <p className="page-subtitle">
            This country does not have a curated set of competing broadcasters yet.
          </p>
        </div>
      </div>
    );
  }

  const toggle = (id) => {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      if (current.length >= MAX_PANES) return [...current.slice(1), id];
      return [...current, id];
    });
  };

  const panes = selected
    .map((id) => data.sources.find((s) => s.id === id))
    .filter(Boolean);
  const unplayable = data.sources.filter((s) => !s.playable);

  return (
    <div className="compare-page">
      <div className="page-header">
        <Link to="/compare" className="back-button">← All countries</Link>
        <h1 className="page-title">
          {data.flag} {data.country} — the same story, four ways
        </h1>
        <p className="page-subtitle">{data.summary}</p>
      </div>

      {/* Feed selector, grouped by tier */}
      <div className="compare-picker">
        {TIER_ORDER.map((tier) => {
          const inTier = data.sources.filter((s) => s.tier === tier);
          if (inTier.length === 0) return null;
          return (
            <div className="compare-tier" key={tier}>
              <h2 className="compare-tier-label" style={{ color: TIERS[tier].color }}>
                {TIERS[tier].label}
              </h2>
              <p className="compare-tier-desc">{TIERS[tier].description}</p>
              <div className="compare-tier-chips">
                {inTier.map((source) => (
                  <button
                    key={source.id}
                    type="button"
                    className={`compare-chip${selected.includes(source.id) ? ' compare-chip-on' : ''}${
                      source.playable ? '' : ' compare-chip-off'
                    }`}
                    style={selected.includes(source.id) ? { borderColor: source.tierColor } : undefined}
                    onClick={() => source.playable && toggle(source.id)}
                    disabled={!source.playable}
                    title={source.playable ? `Show ${source.name}` : 'No verified live feed'}
                  >
                    {source.name}
                    {!source.playable && <span className="compare-chip-tag">no live feed</span>}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* The wall of feeds */}
      {panes.length > 0 ? (
        <div className={`compare-grid compare-grid-${panes.length}`}>
          {panes.map((source) => (
            <div className="compare-pane" key={source.id}>
              <div className="compare-pane-header" style={{ borderTopColor: source.tierColor }}>
                <span className="compare-pane-tier" style={{ background: source.tierColor }}>
                  {source.tierShort}
                </span>
                <span className="compare-pane-name">{source.name}</span>
                {source.origin && <span className="compare-pane-origin">{source.origin}</span>}
                <button
                  type="button"
                  className="compare-pane-close"
                  onClick={() => toggle(source.id)}
                  aria-label={`Remove ${source.name}`}
                >
                  ×
                </button>
              </div>
              <iframe
                src={paneSrc(source.streamUrl)}
                title={source.name}
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen"
                className="compare-pane-frame"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="compare-empty">Select up to {MAX_PANES} feeds above to start comparing.</p>
      )}

      <p className="compare-note">
        Feeds start muted — unmute one at a time. Channels verified {VERIFIED_AT}; a
        broadcaster that has gone off air shows its most recent stream instead.
      </p>

      {/* Sources with no verified live feed still belong on the page */}
      {unplayable.length > 0 && (
        <div className="compare-unplayable">
          <h2 className="row-title">Also covering {data.country} — no verified live feed</h2>
          <ul>
            {unplayable.map((source) => (
              <li key={source.id}>
                <span className="compare-pane-tier" style={{ background: source.tierColor }}>
                  {source.tierShort}
                </span>
                {source.linkUrl ? (
                  <a href={source.linkUrl} target="_blank" rel="noopener noreferrer">
                    {source.name}
                  </a>
                ) : (
                  source.name
                )}
                {source.note && <span className="compare-unplayable-note"> — {source.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
