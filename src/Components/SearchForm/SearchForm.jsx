import './SearchForm.css';
import React, { useState } from 'react';
import Preloader from '../Preloader/Preloader';

function SearchForm({
  isLoading,
  onSearchSubmit,
  articles,
  isSearchComplete,
  isSearchError,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearchSubmit(searchQuery.trim());
  };

  return (
    <section className="search-section">
      <div className="container">
        <form className="search-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Enter topic"
            className="search-form__input"
            value={searchQuery}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="search-form__button"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Show Preloader */}
        {isLoading && <Preloader />}

        {/* Display error message if search failed */}
        {isSearchError && (
          <p className="search-form__error">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Display no results if search completed but returned no articles */}
        {isSearchComplete && articles.length === 0 && !isSearchError && (
          <p className="search-form__no-results">No results found.</p>
        )}
      </div>
    </section>
  );
}

export default SearchForm;

