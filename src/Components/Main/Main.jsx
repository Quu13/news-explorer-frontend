import React, { useState, useEffect } from "react";
import "./Main.css";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import noResultsImage from "../../assets/not-found.svg";

function Main({
  isLoading,
  onSearchSubmit,
  articles,
  isSearchComplete,
  isSearchError,
  isLoggedIn,
  savedArticles,
  handleSaveArticle,
  handleDeleteArticle,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setVisibleCount(3);
  }, [articles]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  if (!isLoading && !isSearchComplete && !isSearchError) {
    return null;
  }

  return (
    <section className="search-results">
      {isSearchComplete && articles.length > 0 && (
        <h2 className="search-results__title">Search results</h2>
      )}

      {isLoading && <Preloader />}

      {isSearchError && (
        <p className="search-results__message error">
          Something went wrong. Please try again.
        </p>
      )}

      {isSearchComplete && articles.length === 0 && !isSearchError && (
        <div className="search-results__no-results">
          <img
            src={noResultsImage}
            alt="No results found"
            className="search-results__no-results-image"
          />
          <p className="search-results__message">No results found.</p>
          <p className="search-results__subtext">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
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
                  onSave={handleSaveArticle}
                  onDelete={handleDeleteArticle}
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
