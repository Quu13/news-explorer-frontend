import "./SavedNewsHeader.css";

function SavedNewsHeader({ isLoggedIn, currentUser, savedArticlesCount, keywords }) {
  // Helper to format keywords smartly
  const formatKeywords = () => {
    if (!keywords || keywords.length === 0) return "";

    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]}, ${keywords[1]}`;
    if (keywords.length === 3) return `${keywords[0]}, ${keywords[1]}, and ${keywords[2]}`;
    return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} more`;
  };

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__title">Saved articles</p>
        <h1 className="saved-news-header__heading">
          {isLoggedIn && currentUser?.name
            ? `${currentUser.name}, you have ${savedArticlesCount} saved article${savedArticlesCount !== 1 ? "s" : ""}`
            : "You have saved articles"}
        </h1>
        {keywords.length > 0 && (
          <p className="saved-news-header__keywords">
            By keywords:{" "}
            <span className="saved-news-header__keywords-bold">
              {formatKeywords()}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
