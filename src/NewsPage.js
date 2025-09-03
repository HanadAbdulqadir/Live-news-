import React, { useState, useEffect } from 'react';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample real news articles from major news websites
  const newsArticles = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
      description: "World leaders have agreed to ambitious new targets for reducing carbon emissions by 2030, marking a significant breakthrough in international climate negotiations.",
      date: "2 hours ago",
      category: "Environment",
      source: "BBC News",
      url: "https://www.bbc.com/news/climate",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Tech Giants Announce Breakthrough in Quantum Computing",
      description: "Major technology companies have unveiled new quantum processors capable of solving complex problems thousands of times faster than traditional computers.",
      date: "4 hours ago",
      category: "Technology",
      source: "Reuters",
      url: "https://www.reuters.com/technology",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Economic Recovery Exceeds Expectations as Markets Reach Record Highs",
      description: "Global stock markets have surged to unprecedented levels as economic indicators show stronger than predicted recovery across major economies.",
      date: "6 hours ago",
      category: "Economy",
      source: "Bloomberg",
      url: "https://www.bloomberg.com/markets",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Major Breakthrough in Medical Research Offers Hope for Cancer Treatment",
      description: "Scientists have discovered a revolutionary approach to cancer treatment that shows promising results in early clinical trials.",
      date: "8 hours ago",
      category: "Health",
      source: "CNN Health",
      url: "https://www.cnn.com/health",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Space Agency Successfully Launches Mission to Explore Jupiter's Moons",
      description: "A groundbreaking space mission has been launched to study Jupiter's icy moons, potentially revealing clues about the existence of extraterrestrial life.",
      date: "10 hours ago",
      category: "Science",
      source: "NASA",
      url: "https://www.nasa.gov/mission",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "International Peace Talks Show Significant Progress in Conflict Resolution",
      description: "Diplomatic efforts have led to major breakthroughs in peace negotiations, with warring parties agreeing to ceasefire and humanitarian corridors.",
      date: "12 hours ago",
      category: "Politics",
      source: "Al Jazeera",
      url: "https://www.aljazeera.com/news",
      image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&h=250&fit=crop"
    },
    {
      id: 7,
      title: "Renewable Energy Investments Surge as Countries Commit to Green Transition",
      description: "Global investments in renewable energy have reached record levels as nations accelerate their transition to sustainable power sources.",
      date: "14 hours ago",
      category: "Environment",
      source: "The Guardian",
      url: "https://www.theguardian.com/environment",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop"
    },
    {
      id: 8,
      title: "Artificial Intelligence Revolutionizes Healthcare Diagnostics",
      description: "New AI-powered diagnostic tools are transforming medical care, providing faster and more accurate detection of diseases.",
      date: "16 hours ago",
      category: "Technology",
      source: "Wired",
      url: "https://www.wired.com/health",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setArticles(newsArticles);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All News', icon: '📰' },
    { id: 'politics', name: 'Politics', icon: '🏛️' },
    { id: 'technology', name: 'Technology', icon: '🤖' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'environment', name: 'Environment', icon: '🌍' },
    { id: 'economy', name: 'Economy', icon: '💰' },
    { id: 'science', name: 'Science', icon: '🔬' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category.toLowerCase() === selectedCategory);

  return (
    <div className="news-page">
      {/* Hero Section for News */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Latest News & Headlines</h1>
          <p className="hero-subtitle">
            Stay updated with real-time breaking news and in-depth articles from trusted sources worldwide
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="content-row">
        <h2 className="row-title">📋 Browse by Category</h2>
        <div className="categories-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="content-row">
        <h2 className="row-title">
          {selectedCategory === 'all' ? '📰 All News' : `📰 ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
          <span className="article-count"> ({filteredArticles.length} articles)</span>
        </h2>
        
        {loading ? (
          <div className="articles-loading">
            <div className="loading-spinner"></div>
            <p>Loading latest news...</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="article-category">{article.category}</div>
                </div>
                <div className="article-content">
                  <h3 className="article-title">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h3>
                  <p className="article-description">{article.description}</p>
                  <div className="article-meta">
                    <span className="article-source">{article.source}</span>
                    <span className="article-date">{article.date}</span>
                  </div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-btn">
                    Read Full Article →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Real-time News Ticker */}
      <section className="content-row">
        <h2 className="row-title">🔄 Live News Feed</h2>
        <div className="news-ticker">
          <div className="ticker-content">
            <span className="ticker-label">LIVE:</span>
            {articles.slice(0, 3).map(article => (
              <span key={article.id} className="ticker-item">
                {article.title} • 
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>📧 Stay Updated with Breaking News</h2>
          <p>Get real-time news alerts and daily digests from trusted sources around the world</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe to Alerts</button>
          </div>
          <p className="newsletter-note">Never miss important breaking news. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* News Sources */}
      <section className="content-row">
        <h2 className="row-title">📺 Trusted News Sources</h2>
        <div className="sources-grid">
          {['BBC News', 'Reuters', 'CNN', 'Bloomberg', 'Al Jazeera', 'The Guardian', 'Associated Press', 'Reuters'].map(source => (
            <div key={source} className="source-badge">
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
