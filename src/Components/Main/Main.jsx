import React from 'react';
import './Main.css'; 
import SearchForm from '../SearchForm/SearchForm';

function Main({
  isLoading,
  onSearchSubmit,
  articles,
  isSearchComplete,
  isSearchError,
}) {
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
    </main>
  );
}

export default Main;
