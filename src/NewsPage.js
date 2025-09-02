import React from 'react';

const NewsPage = () => {
  const articles = [
    {
      id: 1,
      title: "Breaking: Major developments in international relations",
      description: "World leaders meet to discuss global economic cooperation and security challenges...",
      date: "2 hours ago",
      category: "Politics"
    },
    {
      id: 2,
      title: "Economic summit concludes with new trade agreements",
      description: "Historic trade deals signed between multiple nations, promising economic growth...",
      date: "4 hours ago",
      category: "Economy"
    },
    {
      id: 3,
      title: "Climate conference addresses global warming concerns",
      description: "International community commits to new environmental targets and sustainability goals...",
      date: "6 hours ago",
      category: "Environment"
    },
    {
      id: 4,
      title: "Technology summit showcases innovation breakthroughs",
      description: "Revolutionary technologies unveiled that could transform industries and daily life...",
      date: "8 hours ago",
      category: "Technology"
    },
    {
      id: 5,
      title: "Global health organization reports progress on disease prevention",
      description: "Significant advancements made in global health initiatives and disease control measures...",
      date: "10 hours ago",
      category: "Health"
    },
    {
      id: 6,
      title: "Space agency announces new planetary exploration mission",
      description: "Ambitious space mission planned to explore distant planets and search for signs of life...",
      date: "12 hours ago",
      category: "Science"
    }
  ];

  return (
    <div className="news-page">
      {/* Hero Section for News */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Latest News & Headlines</h1>
          <p className="hero-subtitle">
            Stay updated with the latest breaking news and in-depth articles from around the world
          </p>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="content-row">
        <h2 className="row-title">Top Stories</h2>
        <div className="articles-grid">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <div className="article-category">{article.category}</div>
              <h4 className="article-title">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h4>
              <p className="article-description">{article.description}</p>
              <span className="article-date">{article.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* News Categories */}
      <section className="content-row">
        <h2 className="row-title">News Categories</h2>
        <div className="categories-grid">
          {['Politics', 'Economy', 'Technology', 'Health', 'Environment', 'Science'].map(category => (
            <div key={category} className="category-card">
              <h3>{category}</h3>
              <p>Latest news and updates</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
