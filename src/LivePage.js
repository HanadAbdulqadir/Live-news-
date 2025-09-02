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

      {/* Live Streaming Info */}
      <section className="content-row">
        <h2 className="row-title">About Live Streaming</h2>
        <div className="streaming-info">
          <p>
            All streams are sourced directly from official news channel YouTube streams. 
            We provide real-time coverage from trusted international news organizations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LivePage;
