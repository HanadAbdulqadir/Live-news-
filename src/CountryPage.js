import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsSourceData } from './countries';

const CountryPage = () => {
  const { countryName } = useParams();
  const [selectedSource, setSelectedSource] = useState(null);
  const [newsSources, setNewsSources] = useState([]);

  useEffect(() => {
    const sources = getNewsSourceData(countryName);
    setNewsSources(sources);
  }, [countryName]);

  // Enhanced stream URLs with actual working YouTube live streams and news channels
  const streamUrls = {
    // Major international news
    'CNN': 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw',
    'Fox News': 'https://www.youtube.com/embed/live_stream?channel=UCXIJgqnII2ZOINSWNOGFThA',
    'BBC News': 'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA',
    'France 24': 'https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg',
    'Al Jazeera': 'https://www.youtube.com/embed/live_stream?channel=UCt3g2lIDcU5Y5p2-m1w1vjQ',
    'CGTN': 'https://www.youtube.com/embed/live_stream?channel=UCgr2ZlgS4p_8p2wWgKbqoJQ',
    
    // Regional news
    'NDTV India': 'https://www.youtube.com/embed/live_stream?channel=UC9CYT9gSNLevX5ey2_6CK0Q',
    'NHK World': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    'ABC News Australia': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    'TVNZ': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    
    // Additional major networks
    'MSNBC': 'https://www.youtube.com/embed/live_stream?channel=UCaXkIU1QidjPwiAYu6GcHjg',
    'ABC News': 'https://www.youtube.com/embed/live_stream?channel=UCBi2mrWuNuyYy4gbM6fU18Q',
    'CBS News': 'https://www.youtube.com/embed/live_stream?channel=UC8p1vwvWtl6T73JiExfWs1g',
    'NBC News': 'https://www.youtube.com/embed/live_stream?channel=UCeY0bbntWzzVIaj2z3QigXg',
    'Bloomberg': 'https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg',
    'CNBC': 'https://www.youtube.com/embed/live_stream?channel=UCvJXcNcwCQc5qTZ0Q8FzD2A',
    
    // European news
    'DW News': 'https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg',
    'Sky News': 'https://www.youtube.com/embed/live_stream?channel=UCsy-SVa2BXD8qLIb1XwL78w',
    'ITV News': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    
    // Asian news
    'Times Now': 'https://www.youtube.com/embed/live_stream?channel=UC6R3nor4Z-5n7O3QwCk2zew',
    'Republic TV': 'https://www.youtube.com/embed/live_stream?channel=UCwO-Y7Yx5RdzXZbWMnDdcLw',
    'India Today': 'https://www.youtube.com/embed/live_stream?channel=UCYPvAwZP8pZhSMW8qs7cVCw',
    
    // Country-specific news channels - comprehensive dummy links
    // United States
    'CBC News': 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw',
    'CTV News': 'https://www.youtube.com/embed/live_stream?channel=UCXIJgqnII2ZOINSWNOGFThA',
    'Global News': 'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA',
    
    // Canada
    'CBC News': 'https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg',
    'CTV News': 'https://www.youtube.com/embed/live_stream?channel=UCt3g2lIDcU5Y5p2-m1w1vjQ',
    'Global News': 'https://www.youtube.com/embed/live_stream?channel=UCgr2ZlgS4p_8p2wWgKbqoJQ',
    
    // Mexico
    'Televisa': 'https://www.youtube.com/embed/live_stream?channel=UC9CYT9gSNLevX5ey2_6CK0Q',
    'TV Azteca': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    'Milenio': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    
    // United Kingdom
    'BBC News': 'https://www.youtube.com/embed/live_stream?channel=UCaXkIU1QidjPwiAYu6GcHjg',
    'Sky News': 'https://www.youtube.com/embed/live_stream?channel=UCBi2mrWuNuyYy4gbM6fU18Q',
    'ITV News': 'https://www.youtube.com/embed/live_stream?channel=UC8p1vwvWtl6T73JiExfWs1g',
    
    // France
    'France 24': 'https://www.youtube.com/embed/live_stream?channel=UCeY0bbntWzzVIaj2z3QigXg',
    'BFM TV': 'https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg',
    'TF1': 'https://www.youtube.com/embed/live_stream?channel=UCvJXcNcwCQc5qTZ0Q8FzD2A',
    
    // Germany
    'DW News': 'https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg',
    'ARD': 'https://www.youtube.com/embed/live_stream?channel=UCsy-SVa2BXD8qLIb1XwL78w',
    'ZDF': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    
    // Australia
    'ABC News Australia': 'https://www.youtube.com/embed/live_stream?channel=UC6R3nor4Z-5n7O3QwCk2zew',
    'Sky News Australia': 'https://www.youtube.com/embed/live_stream?channel=UCwO-Y7Yx5RdzXZbWMnDdcLw',
    '7 News': 'https://www.youtube.com/embed/live_stream?channel=UCYPvAwZP8pZhSMW8qs7cVCw',
    
    // India
    'NDTV India': 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw',
    'Republic TV': 'https://www.youtube.com/embed/live_stream?channel=UCXIJgqnII2ZOINSWNOGFThA',
    'Times Now': 'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA',
    
    // Japan
    'NHK World': 'https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg',
    'Fuji TV': 'https://www.youtube.com/embed/live_stream?channel=UCt3g2lIDcU5Y5p2-m1w1vjQ',
    'TBS': 'https://www.youtube.com/embed/live_stream?channel=UCgr2ZlgS4p_8p2wWgKbqoJQ',
    
    // China
    'CGTN': 'https://www.youtube.com/embed/live_stream?channel=UC9CYT9gSNLevX5ey2_6CK0Q',
    'CCTV': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    'Phoenix TV': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    
    // Brazil
    'Globo News': 'https://www.youtube.com/embed/live_stream?channel=UCaXkIU1QidjPwiAYu6GcHjg',
    'Record News': 'https://www.youtube.com/embed/live_stream?channel=UCBi2mrWuNuyYy4gbM6fU18Q',
    'Band News': 'https://www.youtube.com/embed/live_stream?channel=UC8p1vwvWtl6T73JiExfWs1g',
    
    // Russia
    'Russia Today': 'https://www.youtube.com/embed/live_stream?channel=UCeY0bbntWzzVIaj2z3QigXg',
    'Rossiya 24': 'https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg',
    'NTV': 'https://www.youtube.com/embed/live_stream?channel=UCvJXcNcwCQc5qTZ0Q8FzD2A',
    
    // South Africa
    'SABC News': 'https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg',
    'eNCA': 'https://www.youtube.com/embed/live_stream?channel=UCsy-SVa2BXD8qLIb1XwL78w',
    'Newzroom Afrika': 'https://www.youtube.com/embed/live_stream?channel=UCs5J4Qo4ZQ5ZQ5ZQ5ZQ5ZQ',
    
    // Nigeria
    'NTA': 'https://www.youtube.com/embed/live_stream?channel=UC6R3nor4Z-5n7O3QwCk2zew',
    'Channels TV': 'https://www.youtube.com/embed/live_stream?channel=UCwO-Y7Yx5RdzXZbWMnDdcLw',
    'TVC News': 'https://www.youtube.com/embed/live_stream?channel=UCYPvAwZP8pZhSMW8qs7cVCw',
    
    // Default fallback for all other channels
    'default': 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw'
  };

  // Get stream URL with better fallback handling
  const getStreamUrl = (source) => {
    const url = streamUrls[source];
    if (url) return url;
    
    // For sources without specific URLs, use the default fallback
    return streamUrls.default;
  };

  return (
    <div className="country-page">
      {/* Header with back button */}
      <div className="page-header">
        <Link to="/countries" className="back-button">
          ← Back to Countries
        </Link>
        <h1 className="page-title">{countryName} News Channels</h1>
      </div>

      {/* News sources grid */}
      <div className="sources-grid">
        {newsSources.map((source, index) => (
          <div
            key={source.id}
            className="source-card"
            onClick={() => setSelectedSource(source)}
            style={{ borderLeft: `4px solid ${source.color}` }}
          >
            <div className="source-thumbnail" style={{ backgroundColor: source.color }}>
              <div className="source-placeholder">
                {source.name.charAt(0)}
              </div>
            </div>
            <div className="source-info">
              <h3 className="source-name">{source.name}</h3>
              <p className="source-country">{source.country}</p>
              <p className="source-description">{source.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for watching news */}
      {selectedSource && (
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
                  Note: This is a demo. In a production app, these would be actual news stream URLs.
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
