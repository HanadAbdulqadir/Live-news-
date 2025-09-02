import React, { useState, useEffect } from 'react';
import './App.css';

// API endpoints mapping
const STREAM_APIS = {
  rt: 'https://rumble.com/embed/v33aw1a/?pub=4',
  presstv: 'https://rumble.com/embed/v6vut38/?pub=4',
  cgtn: 'https://www.youtube.com/embed/live_stream?channel=UC-l-GT_h_12Z2b0-Qc_wAwA',
  telesur: 'https://www.youtube.com/embed/live_stream?channel=UCPRf2gP7wqI8a_3oI0Gfziw',
  aljazeera: 'https://www.youtube.com/embed/live_stream?channel=UCw2n4e6hLypqQoGxKWsY_1A',
  trtworld: 'https://www.youtube.com/embed/live_stream?channel=UC7fWeaHhqgM4Ry-RMpM2YYw',
  wion: 'https://www.youtube.com/embed/live_stream?channel=UC_gUM8rL-Lrg6O3adPW9K1g',
  cubadebate: 'https://www.youtube.com/embed/live_stream?channel=UCQvX2MSjVXqQp6_8Q6p5Z5A'
};

// RSS feeds for news articles
const RSS_FEEDS = {
  rt: 'https://www.rt.com/rss/news/',
  presstv: 'https://www.presstv.ir/rss/',
  cgtn: 'https://news.cgtn.com/rss/news.xml',
  telesur: 'https://www.telesurenglish.net/rss/',
  aljazeera: 'https://www.aljazeera.com/xml/rss/all.xml',
  trtworld: 'https://www.trtworld.com/rss',
  wion: 'https://www.wionews.com/rss/',
  cubadebate: 'https://www.cubadebate.cu/feed/'
};

// News sources data
const NEWS_SOURCES = [
  { id: 'rt', name: 'RT News', fullName: 'RT News' },
  { id: 'presstv', name: 'Press TV', fullName: 'Press TV News' },
  { id: 'cgtn', name: 'CGTN', fullName: 'CGTN News' },
  { id: 'telesur', name: 'Telesur', fullName: 'Telesur English' },
  { id: 'aljazeera', name: 'Al Jazeera', fullName: 'Al Jazeera English' },
  { id: 'trtworld', name: 'TRT World', fullName: 'TRT World' },
  { id: 'wion', name: 'WION', fullName: 'WION News' },
  { id: 'cubadebate', name: 'CubaDebate', fullName: 'CubaDebate' }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState({});

  // Fetch and parse RSS feed
  const fetchRSSFeed = async (feedUrl) => {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const response = await fetch(proxyUrl + encodeURIComponent(feedUrl));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      
      const parseError = xml.querySelector('parsererror');
      if (parseError) {
        console.error('RSS parsing error:', parseError.textContent);
        return [];
      }
      
      const items = xml.querySelectorAll('item');
      const articles = [];
      
      items.forEach(item => {
        const title = item.querySelector('title')?.textContent || 'No title';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        
        const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 150);
        
        articles.push({ 
          title: title.trim(), 
          link: link.trim(), 
          description: cleanDescription + (cleanDescription.length === 150 ? '...' : ''),
          pubDate: pubDate.trim()
        });
      });
      
      return articles.slice(0, 3);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      return [
        {
          title: "Latest news articles will appear here",
          link: "#",
          description: "The system is fetching the latest articles from the news source...",
          pubDate: new Date().toISOString()
        }
      ];
    }
  };

  // Load articles for a specific source
  const loadArticles = async (sourceId) => {
    setLoading(prev => ({ ...prev, [sourceId]: true }));
    
    const feedUrl = RSS_FEEDS[sourceId];
    if (!feedUrl) return;
    
    const articlesData = await fetchRSSFeed(feedUrl);
    setArticles(prev => ({ ...prev, [sourceId]: articlesData }));
    setLoading(prev => ({ ...prev, [sourceId]: false }));
  };

  // Load all articles
  const loadAllArticles = async () => {
    for (const source of NEWS_SOURCES) {
      await loadArticles(source.id);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  // Refresh all articles
  const refreshArticles = async () => {
    setArticles({});
    await loadAllArticles();
  };

  // Filter sources based on search query
  const filteredSources = NEWS_SOURCES.filter(source =>
    source.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadAllArticles();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Live News Streaming</h1>
        <nav className="navigation">
          <ul>
            {NEWS_SOURCES.map(source => (
              <li key={source.id}>
                <a href={`#${source.id}`}>{source.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={refreshArticles} className="refresh-btn">
            Refresh Articles
          </button>
        </div>
      </header>

      <div className="container">
        {filteredSources.map(source => (
          <div key={source.id} id={source.id} className="stream">
            <h2>{source.fullName}</h2>
            <iframe
              src={STREAM_APIS[source.id]}
              title={source.fullName}
              allowFullScreen
              className="stream-iframe"
            />
            
            <div className="news-links">
              <h3>Latest Articles</h3>
              <a
                href={RSS_FEEDS[source.id].replace('/rss/', '/').replace('/feed/', '/')}
                target="_blank"
                rel="noopener noreferrer"
                className="view-articles-link"
              >
                View Latest {source.name} News →
              </a>
              
              <div className="articles-container">
                {loading[source.id] ? (
                  <div className="loading-articles">Loading articles...</div>
                ) : articles[source.id] ? (
                  articles[source.id].map((article, index) => (
                    <div key={index} className="article">
                      <h4>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </h4>
                      <p>{article.description}</p>
                      <small>
                        {new Date(article.pubDate).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <div className="no-articles">No articles available</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>&copy; 2025 Live News Streams</p>
      </footer>
    </div>
  );
}

export default App;
