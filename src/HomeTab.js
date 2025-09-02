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
    </>
  );
};

export default HomeTab;
