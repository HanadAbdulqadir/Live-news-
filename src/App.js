import React, { useState, useEffect } from 'react';
import './App.css';

// News sources with streaming URLs
const NEWS_SOURCES = [
  {
    id: 'rt',
    name: 'RT News',
    streamUrl: 'https://rumble.com/embed/v33aw1a/?pub=4',
    color: '#e50914'
  },
  {
    id: 'presstv',
    name: 'Press TV',
    streamUrl: 'https://rumble.com/embed/v6vut38/?pub=4',
    color: '#0072bc'
  },
  {
    id: 'cgtn',
    name: 'CGTN',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC-l-GT_h_12Z2b0-Qc_wAwA',
    color: '#ff0000'
  },
  {
    id: 'telesur',
    name: 'Telesur',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCPRf2gP7wqI8a_3oI0Gfziw',
    color: '#f9a01b'
  },
  {
    id: 'aljazeera',
    name: 'Al Jazeera',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCw2n4e6hLypqQoGxKWsY_1A',
    color: '#ace600'
  },
  {
    id: 'trtworld',
    name: 'TRT World',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC7fWeaHhqgM4Ry-RMpM2YYw',
    color: '#c60000'
  },
  {
    id: 'wion',
    name: 'WION',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_gUM8rL-Lrg6O3adPW9K1g',
    color: '#ff6b00'
  },
  {
    id: 'cubadebate',
    name: 'CubaDebate',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCQvX2MSjVXqQp6_8Q6p5Z5A',
    color: '#002395'
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState(null);

  // Filter sources based on search query
  const filteredSources = NEWS_SOURCES.filter(source =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      {/* Netflix-style Header */}
      <header className="header">
        <a href="#" className="logo">NEWSFLIX</a>
        <nav className="navigation">
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">Live</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">International</a></li>
          </ul>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search news channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="refresh-btn">
            🔍
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Global News Stream</h1>
            <p className="hero-subtitle">
              Watch live news from around the world. Stay informed with real-time coverage from trusted international sources.
            </p>
          </div>
        </section>

        {/* News Channels Row */}
        <section className="content-row">
          <h2 className="row-title">Live News Channels</h2>
          <div className="streams-grid">
            {filteredSources.map(source => (
              <div
                key={source.id}
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
                  <p className="stream-description">Live streaming • 24/7 coverage</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Articles Section */}
        <section className="articles-section">
          <h2 className="articles-title">Latest Headlines</h2>
          <div className="articles-grid">
            <div className="article-card">
              <h4 className="article-title">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Breaking: Major developments in international relations
                </a>
              </h4>
              <p className="article-description">
                World leaders meet to discuss global economic cooperation and security challenges...
              </p>
              <span className="article-date">2 hours ago</span>
            </div>
            <div className="article-card">
              <h4 className="article-title">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Economic summit concludes with new trade agreements
                </a>
              </h4>
              <p className="article-description">
                Historic trade deals signed between multiple nations, promising economic growth...
              </p>
              <span className="article-date">4 hours ago</span>
            </div>
            <div className="article-card">
              <h4 className="article-title">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Climate conference addresses global warming concerns
                </a>
              </h4>
              <p className="article-description">
                International community commits to new environmental targets and sustainability goals...
              </p>
              <span className="article-date">6 hours ago</span>
            </div>
            <div className="article-card">
              <h4 className="article-title">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Technology summit showcases innovation breakthroughs
                </a>
              </h4>
              <p className="article-description">
                Revolutionary technologies unveiled that could transform industries and daily life...
              </p>
              <span className="article-date">8 hours ago</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 NEWSFLIX • Global News Streaming Platform</p>
      </footer>

      {/* Modal for expanded view */}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
