import React from 'react';

const LivePage = ({ filteredCategories, setSelectedSource }) => {
  return (
    <div className="live-page">
      {/* Hero Section for Live */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Live News Streams</h1>
          <p className="hero-subtitle">
            Watch real-time news coverage from around the world. All streams are live 24/7.
          </p>
        </div>
      </section>

      {/* All Live Channels Grid */}
      <section className="content-row">
        <h2 className="row-title">All Live Channels</h2>
        <div className="streams-grid">
          {filteredCategories.flatMap(category => category.sources).map(source => (
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
                <span className="live-badge">LIVE</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Streaming Stats */}
      <section className="content-row">
        <h2 className="row-title">📊 Live Streaming Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>20+</h3>
            <p>Active Live Streams</p>
          </div>
          <div className="stat-card">
            <h3>15+</h3>
            <p>Languages Supported</p>
          </div>
          <div className="stat-card">
            <h3>0s</h3>
            <p>Delay (Near Real-time)</p>
          </div>
          <div className="stat-card">
            <h3>HD</h3>
            <p>Stream Quality</p>
          </div>
        </div>
      </section>

      {/* Popular Channels */}
      <section className="content-row">
        <h2 className="row-title">🔥 Most Popular Channels</h2>
        <div className="popular-channels">
          <div className="popular-channel">
            <span className="channel-rank">1</span>
            <span className="channel-name">CNN</span>
            <span className="channel-viewers">📈 25K watching</span>
          </div>
          <div className="popular-channel">
            <span className="channel-rank">2</span>
            <span className="channel-name">BBC News</span>
            <span className="channel-viewers">📈 18K watching</span>
          </div>
          <div className="popular-channel">
            <span className="channel-rank">3</span>
            <span className="channel-name">Al Jazeera</span>
            <span className="channel-viewers">📈 15K watching</span>
          </div>
          <div className="popular-channel">
            <span className="channel-rank">4</span>
            <span className="channel-name">France 24</span>
            <span className="channel-viewers">📈 12K watching</span>
          </div>
          <div className="popular-channel">
            <span className="channel-rank">5</span>
            <span className="channel-name">DW News</span>
            <span className="channel-viewers">📈 10K watching</span>
          </div>
        </div>
      </section>

      {/* Streaming Features */}
      <section className="content-row">
        <h2 className="row-title">⭐ Premium Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Real-time Coverage</h3>
            <p>Watch events unfold live as they happen around the world</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Perspective</h3>
            <p>Access news from multiple international viewpoints</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Multi-device Support</h3>
            <p>Watch on desktop, tablet, or mobile devices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Updates</h3>
            <p>Get breaking news alerts and live updates</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LivePage;
