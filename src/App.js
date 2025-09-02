import React, { useState, useEffect } from 'react';
import './App.css';

// News sources organized by categories
const NEWS_CATEGORIES = [
  {
    id: 'g7',
    title: 'G7 Countries',
    sources: [
      {
        id: 'cnn',
        name: 'CNN',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw',
        color: '#cc0000',
        country: 'USA'
      },
      {
        id: 'bbc',
        name: 'BBC News',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA',
        color: '#bb1919',
        country: 'UK'
      },
      {
        id: 'france24',
        name: 'France 24',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg',
        color: '#0055a4',
        country: 'France'
      },
      {
        id: 'dw',
        name: 'DW News',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg',
        color: '#00205b',
        country: 'Germany'
      }
    ]
  },
  {
    id: 'brics',
    title: 'BRICS Countries',
    sources: [
      {
        id: 'rt',
        name: 'RT News',
        streamUrl: 'https://rumble.com/embed/v33aw1a/?pub=4',
        color: '#e50914',
        country: 'Russia'
      },
      {
        id: 'cgtn',
        name: 'CGTN',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC-l-GT_h_12Z2b0-Qc_wAwA',
        color: '#ff0000',
        country: 'China'
      },
      {
        id: 'ndtv',
        name: 'NDTV India',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCZFMm1mMw0F81Z37aaEzTUA',
        color: '#ff6b00',
        country: 'India'
      },
      {
        id: 'sabc',
        name: 'SABC News',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCPgS1SYc0e_-MfBkq6oQJAg',
        color: '#007749',
        country: 'South Africa'
      }
    ]
  },
  {
    id: 'africa',
    title: 'African Countries',
    sources: [
      {
        id: 'sabc',
        name: 'SABC News',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCPgS1SYc0e_-MfBkq6oQJAg',
        color: '#007749',
        country: 'South Africa'
      },
      {
        id: 'nbc',
        name: 'NBC Africa',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCbLyeC6Q7y3OoJdX0jM6w1g',
        color: '#ff6b00',
        country: 'Nigeria'
      },
      {
        id: 'kenya',
        name: 'KBC Kenya',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC0n4YfjYT5Lq8N9QdXkL-2A',
        color: '#009639',
        country: 'Kenya'
      },
      {
        id: 'egypt',
        name: 'Egypt Today',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC2--Rc5nnGs5v7CIcGDgXAQ',
        color: '#ce1126',
        country: 'Egypt'
      }
    ]
  },
  {
    id: 'latinamerica',
    title: 'Latin America',
    sources: [
      {
        id: 'telesur',
        name: 'Telesur',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCPRf2gP7wqI8a_3oI0Gfziw',
        color: '#f9a01b',
        country: 'Venezuela'
      },
      {
        id: 'cubadebate',
        name: 'CubaDebate',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCQvX2MSjVXqQp6_8Q6p5Z5A',
        color: '#002395',
        country: 'Cuba'
      },
      {
        id: 'teleSUR',
        name: 'TeleSUR English',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC6vc4aQ3T3Xa7Xr9E3GQZ1Q',
        color: '#ff6b00',
        country: 'Pan-Regional'
      },
      {
        id: 'presstv',
        name: 'Press TV',
        streamUrl: 'https://rumble.com/embed/v6vut38/?pub=4',
        color: '#0072bc',
        country: 'Iran'
      }
    ]
  },
  {
    id: 'arab',
    title: 'Arab Countries',
    sources: [
      {
        id: 'aljazeera',
        name: 'Al Jazeera',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCw2n4e6hLypqQoGxKWsY_1A',
        color: '#ace600',
        country: 'Qatar'
      },
      {
        id: 'alarabiya',
        name: 'Al Arabiya',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_tv3h1WV1L0eTQpSRC6f0Q',
        color: '#0072bc',
        country: 'Saudi Arabia'
      },
      {
        id: 'skynewsarabia',
        name: 'Sky News Arabia',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCkCbV5_6dK3TDUYLQ3QnV0w',
        color: '#0072c6',
        country: 'UAE'
      },
      {
        id: 'france24arabic',
        name: 'France 24 Arabic',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCpXcQj5k7Lr3Qx1QwqJ5Z5A',
        color: '#0055a4',
        country: 'France'
      }
    ]
  },
  {
    id: 'asia',
    title: 'Asian Countries',
    sources: [
      {
        id: 'wion',
        name: 'WION',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_gUM8rL-Lrg6O3adPW9K1g',
        color: '#ff6b00',
        country: 'India'
      },
      {
        id: 'nhk',
        name: 'NHK World',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCGJ5L6jLkYF6p8LkDz0Yf0A',
        color: '#bc002d',
        country: 'Japan'
      },
      {
        id: 'kbs',
        name: 'KBS World',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC5BMQOsAB8hKUyHu9KI6yig',
        color: '#003478',
        country: 'South Korea'
      },
      {
        id: 'cna',
        name: 'CNA',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC2C_jShtL725hvbm1arSV9w',
        color: '#ff6b00',
        country: 'Singapore'
      }
    ]
  }
];

// Flatten all sources for search functionality
const ALL_SOURCES = NEWS_CATEGORIES.flatMap(category => category.sources);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState(null);

  // Filter sources based on search query
  const filteredCategories = NEWS_CATEGORIES.map(category => ({
    ...category,
    sources: category.sources.filter(source =>
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.sources.length > 0);

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

        {/* News Channels by Category */}
        {filteredCategories.map(category => (
          <section key={category.id} className="content-row">
            <h2 className="row-title">{category.title}</h2>
            <div className="streams-grid">
              {category.sources.map(source => (
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
                    <p className="stream-description">{source.country} • Live streaming</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

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
