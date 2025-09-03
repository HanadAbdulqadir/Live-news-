import React from 'react';

const HomeTab = ({ filteredCategories, setSelectedSource }) => {
  return (
    <>
      {/* Hero Section */}
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

      {/* Quick Stats Section */}
      <section className="content-row">
        <h2 className="row-title">Global Coverage</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>50+</h3>
            <p>Countries Covered</p>
          </div>
          <div className="stat-card">
            <h3>200+</h3>
            <p>News Channels</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Live Streaming</p>
          </div>
          <div className="stat-card">
            <h3>Global</h3>
            <p>Real-time Coverage</p>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="articles-section">
        <h2 className="articles-title">📰 Latest Headlines</h2>
        <div className="articles-grid">
          <div className="article-card">
            <div className="article-category breaking">Breaking News</div>
            <h4 className="article-title">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Global Summit: World Leaders Agree on Climate Action Plan
              </a>
            </h4>
            <p className="article-description">
              Historic agreement reached as nations commit to carbon neutrality by 2050 with immediate funding for renewable energy projects...
            </p>
            <span className="article-date">Just now • 🌍 Environment</span>
          </div>
          <div className="article-card">
            <div className="article-category politics">Politics</div>
            <h4 className="article-title">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Diplomatic Breakthrough: Peace Talks Resume in Conflict Zones
              </a>
            </h4>
            <p className="article-description">
              International mediators report significant progress as warring parties agree to ceasefire and humanitarian corridors...
            </p>
            <span className="article-date">30 mins ago • 🕊️ Politics</span>
          </div>
          <div className="article-card">
            <div className="article-category tech">Technology</div>
            <h4 className="article-title">
              <a href="#" target="_blank" rel="noopener noreferrer">
                AI Revolution: New Breakthrough in Quantum Computing
              </a>
            </h4>
            <p className="article-description">
              Scientists achieve quantum supremacy with new processor capable of solving complex problems in seconds instead of years...
            </p>
            <span className="article-date">1 hour ago • 🤖 Technology</span>
          </div>
          <div className="article-card">
            <div className="article-category economy">Economy</div>
            <h4 className="article-title">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Markets Soar as Global Economic Recovery Exceeds Expectations
              </a>
            </h4>
            <p className="article-description">
              Stock markets hit record highs as economic indicators show stronger than predicted recovery across major economies...
            </p>
            <span className="article-date">2 hours ago • 💰 Economy</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Watching Global News Now</h2>
          <p>Access live streams from trusted news sources around the world. Stay informed with real-time coverage.</p>
          <div className="cta-buttons">
            <a href="/live" className="cta-button primary">Watch Live News</a>
            <a href="/countries" className="cta-button secondary">Browse by Country</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeTab;
