import React from 'react';

const LivePage = ({ filteredCategories, setSelectedSource }) => {
  // Only broadcasters with a verified live feed get a player. Everything else is
  // listed elsewhere in the app as a link rather than a dead iframe.
  const liveSources = filteredCategories
    .flatMap(category => category.sources)
    .filter(source => source.streamUrl);

  // The directory records country and continent per broadcaster, not language,
  // so the stats state what the data actually holds.
  const continentCount = new Set(liveSources.map(source => source.continent)).size;

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
          {liveSources.map(source => (
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
            <h3>{liveSources.length}</h3>
            <p>Verified Live Streams</p>
          </div>
          <div className="stat-card">
            <h3>{continentCount}</h3>
            <p>Continents</p>
          </div>
          <div className="stat-card">
            <h3>{new Set(liveSources.map(s => s.country)).size}</h3>
            <p>Countries</p>
          </div>
          <div className="stat-card">
            <h3>HD</h3>
            <p>Stream Quality</p>
          </div>
        </div>
      </section>

      {/* Channels currently streaming */}
      <section className="content-row">
        <h2 className="row-title">🔴 Currently Streaming</h2>
        <div className="popular-channels">
          {liveSources.slice(0, 8).map((source, i) => (
            <div
              className="popular-channel"
              key={source.id}
              onClick={() => setSelectedSource(source)}
            >
              <span className="channel-rank">{i + 1}</span>
              <span className="channel-name">{source.name}</span>
              <span className="channel-viewers">{source.flag} {source.country}</span>
            </div>
          ))}
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
