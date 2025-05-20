import "./SavedCardsArray.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function SavedCardsArray({
  savedArticles = [],
  handleDeleteArticle,
  handleSaveArticle,
  isLoggedIn,
}) {
  return (
    <section className="saved-cards-array">
      {savedArticles.length === 0 ? (
        <p className="saved-cards-array__empty">You have no saved articles.</p>
      ) : (
        <ul className="saved-cards-array__list">
          {console.log("Articles being mapped:", savedArticles)}
          {savedArticles.map((article) => (
            <li key={article.id} className="saved-cards-array__item">
              <NewsCard
                article={article}
                isSaved={true}
                isLoggedIn={isLoggedIn}
                onDelete={handleDeleteArticle}
                onSave={handleSaveArticle}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SavedCardsArray;
