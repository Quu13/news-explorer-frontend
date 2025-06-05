import React, { useState, useEffect } from 'react';
import './Main.css'; 
import Preloader from '../Preloader/Preloader';
import NewsCard from '../NewsCard/NewsCard';

function Main({ isLoading, onSearchSubmit, articles, isSearchComplete, isSearchError }) {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setVisibleCount(3);
  }, [articles]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  // 🚫 Don't render section if nothing searched yet
  if (!isLoading && !isSearchComplete && !isSearchError) {
    return null;
  }

  return (
    <section className="search-results">
      {/* ✅ Title only appears if search is complete or loading */}
      {(isLoading || isSearchComplete) && (
        <h2 className="search-results__title">Search results</h2>
      )}

      {isLoading && <Preloader />}

      {isSearchError && (
        <p className="search-results__message error">Something went wrong. Please try again.</p>
      )}

      {isSearchComplete && articles.length === 0 && !isSearchError && (
        <p className="search-results__message no-results">No results found.</p>
      )}

      {isSearchComplete && articles.length > 0 && (
        <>
          <ul className="news-card__list">
            {visibleArticles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                isSaved={false}
                isSavedNewsPage={false}
                onSave={() => {}}
                onDelete={() => {}}
              />
            ))}
          </ul>

          {visibleCount < articles.length && (
            <button className="show-more" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default Main;


