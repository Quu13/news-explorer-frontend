import React, { useState } from 'react';
import './NewsCard.css';

function NewsCard({
  article,
  isSaved,
  isSavedNewsPage,
  isLoggedIn, // ✅ required
  onSave,
  onDelete,
}) {
  const [hovered, setHovered] = useState(false);

  if (!article) return null;

  const {
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    keyword,
  } = article;

  if (!title || !url) return null;

  const handleSaveClick = () => {
    if (!isLoggedIn) return; // 🔒 Prevent saving
    isSaved ? onDelete(article) : onSave(article);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <li className="news-card">
      <a className="news-card__link" href={url} target="_blank" rel="noopener noreferrer">
        <img
          className="news-card__image"
          src={urlToImage || '/images/placeholder.jpg'}
          alt={title}
        />
        <div className="news-card__info">
          <p className="news-card__date">{publishedAt ? formatDate(publishedAt) : 'No date'}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description || 'No description available'}</p>
          <p className="news-card__source">{source?.name || 'Unknown source'}</p>
        </div>
      </a>

      {isSavedNewsPage ? (
        <>
          <button
            className="news-card__button news-card__button_type_delete"
            onClick={() => onDelete(article)}
            aria-label="Delete article"
          />
          <p className="news-card__keyword">{keyword || ''}</p>
        </>
      ) : (
        <>
          <button
            className={`news-card__button ${
              isSaved ? 'news-card__button_type_saved' : 'news-card__button_type_save'
            } ${!isLoggedIn && hovered ? 'news-card__button_hovered' : ''}`}
            onClick={handleSaveClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Save article"
          />
          {!isLoggedIn && hovered && (
            <p className="news-card__signin-message">Sign in to save articles</p>
          )}
        </>
      )}
    </li>
  );
}

export default NewsCard;
