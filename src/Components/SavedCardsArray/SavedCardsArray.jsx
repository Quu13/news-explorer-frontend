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
          {savedArticles.map((article) => (
            <li
              key={article._id || article.url} // ✅ STEP 1 FIX HERE
              className="saved-cards-array__item"
            >
              <NewsCard
                article={article}
                isSaved={true}
                isSavedNewsPage={true}
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

