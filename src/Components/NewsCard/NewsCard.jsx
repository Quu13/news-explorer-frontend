import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({
  article,
  isSaved,
  isSavedNewsPage,
  isLoggedIn,
  onSave,
  onDelete,
}) {
  const [hovered, setHovered] = useState(false);

  if (!article) return null;

  const { title, description, publishedAt, source, url, urlToImage, keyword } =
    article;

  if (!title || !url) return null;

  const handleSaveClick = () => {
    console.log("Save clicked! isLoggedIn:", isLoggedIn, "isSaved:", isSaved);
    if (!isLoggedIn) {
      console.log("User not logged in, save blocked");
      return;
    }
    if (isSaved) {
      console.log("Calling onDelete");
      onDelete(article);
    } else {
      console.log("Calling onSave");
      onSave(article);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="news-card">
      <a
        className="news-card__link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="news-card__image"
          src={urlToImage || "https://placehold.co/300x200?text=No+Image"}
          alt={title}
        />
        <div className="news-card__info">
          <p className="news-card__date">
            {publishedAt ? formatDate(publishedAt) : "No date"}
          </p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">
            {description || "No description available"}
          </p>
          <p className="news-card__source">
            {source?.name || "Unknown source"}
          </p>
        </div>
      </a>

      <button
        className={`news-card__button ${
          isSavedNewsPage
            ? "news-card__button_type_delete"
            : isSaved
            ? "news-card__button_type_saved"
            : "news-card__button_type_save"
        }`}
        onClick={() => {
          if (isSavedNewsPage || isSaved) {
            onDelete(article);
          } else {
            handleSaveClick();
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={
          isSavedNewsPage || isSaved ? "Delete article" : "Save article"
        }
      />

      {isSavedNewsPage && <p className="news-card__keyword">{keyword || ""}</p>}

      {!isLoggedIn && hovered && !isSavedNewsPage && (
        <p className="news-card__signin-message">Sign in to save articles</p>
      )}
    </div>
  );
}

export default NewsCard;
