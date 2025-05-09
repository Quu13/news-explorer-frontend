import './SearchForm.css'
import React from 'react';


function SearchForm() {
  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Enter topic"
        className="search-form__input"
        required
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;