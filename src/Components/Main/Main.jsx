import React from 'react';
import './Main.css'; 
import SearchForm from '../SearchForm/SearchForm';
import NewsCard from '../NewsCard/NewsCard';

function Main({
  isLoading,
  onSearchSubmit,
  articles,
  isSearchComplete,
  isSearchError,
}) {
  console.log("Main component props:", { isLoading, articles, isSearchComplete, isSearchError });
  console.log("First article:", articles[0]);
  if (isSearchComplete && articles.length > 0) {
    console.log("About to render", articles.length, "articles");
  }

  return (
    <main className="main">
      <section className="hero">
        <h1 className="hero__title">What&apos;s going on in the world?</h1>
        <p className="hero__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <SearchForm
          isLoading={isLoading}
          onSearchSubmit={onSearchSubmit}
          articles={articles}
          isSearchComplete={isSearchComplete}
          isSearchError={isSearchError}
        />
      </section>

      {isSearchComplete && articles.length > 0 && (
        <section className="results-section">
          <ul className="news-card-list">
            {articles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                isSaved={false} // You can update this logic later
                isSavedNewsPage={false}
                onSave={() => {}}
                onDelete={() => {}}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Main;
