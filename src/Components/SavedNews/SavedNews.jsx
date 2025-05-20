import "./SavedNews.css";
import Navigation from "../Navigation/Navigation";
import SavedCardsArray from "../SavedCardsArray/SavedCardsArray";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

import React, { useContext, useMemo } from "react";;
import UserContext from "../../context/UserContext";

function SavedNews({
  isLoggedIn,
  savedArticles = [],
  handleSignOut,
  handleDeleteArticle,
  handleSaveArticle,
}) {
  const { currentUser } = useContext(UserContext);

  console.log('SavedNews - savedArticles:', savedArticles); // Add this line
  console.log('SavedNews - currentUser:', currentUser); // Add this to check user context

  // Extract unique keywords from saved articles
  const keywords = useMemo(() => {
    const allKeywords = savedArticles.map((article) => article.keyword);
    const uniqueKeywords = [...new Set(allKeywords)];
    return uniqueKeywords;
  }, [savedArticles]);

  return (
    <main className="saved__news">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        savedArticlesCount={savedArticles.length}
        keywords={keywords}
      />
      <SavedCardsArray
        savedArticles={savedArticles}
        handleDeleteArticle={handleDeleteArticle}
        handleSaveArticle={handleSaveArticle}
      />
    </main>
  );
}

export default SavedNews;