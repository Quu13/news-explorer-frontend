import React from 'react';
import './Main.css'; 
import Preloader from '../Preloader/Preloader';
import NewsCard from '../NewsCard/NewsCard';

function Main({ isLoading, onSearchSubmit, articles, isSearchComplete, isSearchError }) {
  return (
    <section className="search-results">
      {isLoading && <Preloader />}
      {isSearchError && (
        <p className="search-results__message error">Something went wrong. Please try again.</p>
      )}
      {isSearchComplete && articles.length === 0 && !isSearchError && (
        <p className="search-results__message no-results">No results found.</p>
      )}
      {isSearchComplete && articles.length > 0 && (
        <ul className="news-card__list">
          {articles.map((article, index) => (
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
      )}
    </section>
  );
}


export default Main;

