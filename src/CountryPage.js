import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsSourceData } from './countries';
import { hasPerspectives } from './perspectives';
import { VERIFIED_AT } from './verifiedStreams';

const CountryPage = () => {
  const { countryName } = useParams();
  const [selectedSource, setSelectedSource] = useState(null);
  const [newsSources, setNewsSources] = useState([]);

  useEffect(() => {
    const sources = getNewsSourceData(countryName);
    setNewsSources(sources);
  }, [countryName]);

  const liveSources = newsSources.filter(source => source.streamUrl);

  return (
    <div className="country-page">
      {/* Header with back button */}
      <div className="page-header">
        <Link to="/countries" className="back-button">
          ← Back to Countries
        </Link>
        <h1 className="page-title">{countryName} News Channels</h1>
        <p className="page-subtitle">
          {liveSources.length} of {newsSources.length} channels have a verified live feed
        </p>
        {hasPerspectives(countryName) && (
          <Link to={`/compare/${encodeURIComponent(countryName)}`} className="compare-cta">
            ⚖️ Compare how {countryName} is covered from four directions
          </Link>
        )}
      </div>

      {/* News sources grid */}
      <div className="sources-grid">
        {newsSources.map((source) => (
          <div
            key={source.id}
            className={`source-card${source.streamUrl ? '' : ' source-card-no-stream'}`}
            onClick={() => source.streamUrl && setSelectedSource(source)}
            style={{ borderLeft: `4px solid ${source.color}` }}
          >
            <div className="source-thumbnail" style={{ backgroundColor: source.color }}>
              <div className="source-placeholder">
                {source.name.charAt(0)}
              </div>
              {source.streamUrl && <span className="live-badge">LIVE</span>}
            </div>
            <div className="source-info">
              <h3 className="source-name">{source.name}</h3>
              <p className="source-country">{source.country}</p>
              <p className="source-description">{source.description}</p>
              {!source.streamUrl && (
                <p className="source-no-stream">
                  {source.channelUrl ? (
                    <>
                      No live feed right now —{' '}
                      <a
                        href={source.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        open channel
                      </a>
                    </>
                  ) : (
                    'No verified live feed available'
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for watching news */}
      {selectedSource && selectedSource.streamUrl && (
        <div className="modal" onClick={() => setSelectedSource(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedSource.name}</h2>
              <button className="close-modal" onClick={() => setSelectedSource(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <iframe
                src={selectedSource.streamUrl}
                title={selectedSource.name}
                allowFullScreen
                style={{ width: '100%', height: '500px', border: 'none' }}
              />
              <div className="stream-info">
                <p>Watching {selectedSource.name} from {countryName}</p>
                <p className="stream-note">
                  Official channel feed, verified {VERIFIED_AT}. Broadcasters go on and
                  off air, so a channel may show its most recent stream instead.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="info-section">
        <h3>About {countryName} News</h3>
        <p>
          Explore live news streams from various broadcasters in {countryName}. 
          Click on any news channel to start watching live coverage of current events, 
          breaking news, and in-depth analysis from trusted sources.
        </p>
      </div>
    </div>
  );
};

export default CountryPage;
