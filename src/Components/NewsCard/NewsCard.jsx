// src/Components/NewsCard/NewsCard.jsx
import "./NewsCard.css";

function NewsCard({
  article,
  isSaved,
  isSavedNewsPage,
  onSave,
  onDelete,
}) {
  // Add validation check
  if (!article) {
    return null;
  }

  const {
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    keyword,
  } = article;

  // Add safety checks for required data
  if (!title || !url) {
    return null;
  }

  const handleSaveClick = () => {
    if (isSaved) {
      onDelete(article);
    } else {
      onSave(article);
    }
  };

  const handleDeleteClick = () => {
    onDelete(article);
  };

  return (
    <li className="news-card">
      <a className="news-card__link" href={url} target="_blank" rel="noopener noreferrer">
        <img 
          className="news-card__image" 
          src={urlToImage || 'placeholder-image-url'} 
          alt={title} 
        />
        <div className="news-card__info">
          <p className="news-card__date">
            {publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}
          </p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description || 'No description available'}</p>
          <p className="news-card__source">{source?.name || 'Unknown source'}</p>
        </div>
      </a>

      {isSavedNewsPage ? (
        <>
          <button
            className="news-card__button news-card__button_type_delete"
            onClick={handleDeleteClick}
            aria-label="Delete article"
          />
          <p className="news-card__keyword">{keyword || ''}</p>
        </>
      ) : (
        <button
          className={`news-card__button ${
            isSaved ? "news-card__button_type_saved" : "news-card__button_type_save"
          }`}
          onClick={handleSaveClick}
          aria-label="Save article"
        />
      )}
    </li>
  );
}

export default NewsCard;
