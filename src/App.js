import React, { useState, lazy, Suspense, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import { GLOBAL_NEWS_SOURCES, getSourcesByContinent, searchSources, getLiveStreams, getWebsiteSources } from './globalNewsData';

// Lazy load components for better performance
const HomeTab = lazy(() => import('./HomeTab'));
const CountriesPage = lazy(() => import('./CountriesPage'));
const CountryPage = lazy(() => import('./CountryPage'));
const LivePage = lazy(() => import('./LivePage'));
const NewsPage = lazy(() => import('./NewsPage'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="loading">
    <div className="loading-spinner"></div>
    <p>Loading news channels...</p>
  </div>
);


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

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>We're having trouble loading the news channels.</p>
          <button 
            onClick={() => window.location.reload()}
            className="refresh-btn"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Custom hook for search with debouncing
const useDebouncedSearch = (initialValue = '', delay = 300) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return [searchQuery, debouncedQuery, setSearchQuery];
};

// Memoized filtered categories
const useFilteredCategories = (debouncedQuery) => {
  return useMemo(() => {
    const continents = getSourcesByContinent();
    return Object.entries(continents).map(([continent, countries]) => ({
      id: continent.toLowerCase().replace(/\s+/g, '-'),
      title: continent,
      sources: countries.flatMap(country => 
        country.sources.filter(source =>
          source.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          country.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          source.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          source.description.toLowerCase().includes(debouncedQuery.toLowerCase())
        ).map(source => ({
          ...source,
          country: country.name,
          flag: country.flag,
          continent: continent
        }))
      )
    })).filter(category => category.sources.length > 0);
  }, [debouncedQuery]);
};

// Main App Component
function App() {
  const [searchQuery, debouncedQuery, setSearchQuery] = useDebouncedSearch('', 300);
  const [selectedSource, setSelectedSource] = useState(null);
  const filteredCategories = useFilteredCategories(debouncedQuery);

  // Memoized navigation component to prevent unnecessary re-renders
  const memoizedNavigation = useMemo(() => (
    <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  ), [searchQuery, setSearchQuery]);

  // Memoized footer to prevent unnecessary re-renders
  const memoizedFooter = useMemo(() => (
    <footer className="footer">
      <p>&copy; 2025 NEWSFLIX • Global News Streaming Platform</p>
    </footer>
  ), []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          {memoizedNavigation}
          
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
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
                    onSourceSelect={(source, country) => {
                      // Navigate to the country page when a source is clicked
                      window.location.href = `/country/${encodeURIComponent(country)}`;
                    }}
                  />
                } />
                <Route path="/live" element={
                  <LivePage 
                    filteredCategories={filteredCategories}
                    setSelectedSource={setSelectedSource}
                  />
                } />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/country/:countryName" element={<CountryPage />} />
              </Routes>
            </Suspense>
          </main>

          {memoizedFooter}

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
    </ErrorBoundary>
  );
}

export default App;
