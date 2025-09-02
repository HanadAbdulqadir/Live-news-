import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import HomeTab from './HomeTab';
import CountriesPage from './CountriesPage';
import LivePage from './LivePage';
import NewsPage from './NewsPage';

// News sources organized by continents
const NEWS_CATEGORIES = [
  {
    id: 'north-america',
    title: 'North America',
    sources: [
      {
        id: 'cnn',
        name: 'CNN',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw',
        color: '#cc0000',
        country: 'USA'
      },
      {
        id: 'foxnews',
        name: 'Fox News',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCXIJgqnII2ZOINSWNOGFThA',
        color: '#003366',
        country: 'USA'
      }
    ]
  },
  {
    id: 'europe',
    title: 'Europe',
    sources: [
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
      }
    ]
  }
];

// Navigation Component
const Navigation = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  
  return (
    <header className="header">
      <Link to="/" className="logo">NEWSFLIX</Link>
      <nav className="navigation">
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/countries" 
              className={location.pathname === '/countries' ? 'active' : ''}
            >
              Countries
            </Link>
          </li>
          <li>
            <Link 
              to="/live" 
              className={location.pathname === '/live' ? 'active' : ''}
            >
              Live
            </Link>
          </li>
          <li>
            <Link 
              to="/news" 
              className={location.pathname === '/news' ? 'active' : ''}
            >
              News
            </Link>
          </li>
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
        <button className="refresh-btn">🔍</button>
      </div>
    </header>
  );
};

// Main App Component
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
    <Router>
      <div className="App">
        <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <HomeTab 
                filteredCategories={filteredCategories} 
                setSelectedSource={setSelectedSource} 
              />
            } />
            <Route path="/countries" element={
              <CountriesPage 
                onCountrySelect={(country) => setSearchQuery(country)}
              />
            } />
            <Route path="/live" element={
              <LivePage 
                filteredCategories={filteredCategories}
                setSelectedSource={setSelectedSource}
              />
            } />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>

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
    </Router>
  );
}

export default App;
