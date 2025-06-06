import React, { useState, useEffect } from "react";
import "./Main.css";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

function Main({
  isLoading,
  onSearchSubmit,
  articles,
  isSearchComplete,
  isSearchError,
  isLoggedIn
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    setVisibleCount(3);
  }, [articles]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleSave = (article) => {
    setSavedArticles((prev) => [...prev, article]);
  };

  const handleDelete = (article) => {
    setSavedArticles(
      (prev) => prev.filter((a) => a.url !== article.url) // compare by URL or another unique field
    );
  };

  const visibleArticles = articles.slice(0, visibleCount);

  if (!isLoading && !isSearchComplete && !isSearchError) {
    return null;
  }

  return (
    <section className="search-results">
      {(isLoading || isSearchComplete) && (
        <h2 className="search-results__title">Search results</h2>
      )}

      {isLoading && <Preloader />}

      {isSearchError && (
        <p className="search-results__message error">
          Something went wrong. Please try again.
        </p>
      )}

      {isSearchComplete && articles.length === 0 && !isSearchError && (
        <p className="search-results__message no-results">No results found.</p>
      )}

      {isSearchComplete && articles.length > 0 && (
        <>
          <ul className="news-card__list">
            {visibleArticles.map((article, index) => {
              const isSaved = savedArticles.some((a) => a.url === article.url);
              return (
                <NewsCard
                  key={index}
                  article={article}
                  isSaved={isSaved}
                  isSavedNewsPage={false}
                  isLoggedIn={isLoggedIn}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              );
            })}
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
