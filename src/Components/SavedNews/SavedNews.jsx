import "./SavedNews.css";
import Navigation from "../Navigation/Navigation";
import SavedCardsArray from "../SavedCardsArray/SavedCardsArray";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

import React, { useContext, useMemo } from "react";
import UserContext from "../../context/UserContext";

function SavedNews({
  isLoggedIn,
  savedArticles = [],
  handleSignOut,
  handleDeleteArticle,
  handleSaveArticle,
}) {
  const { currentUser } = useContext(UserContext);

  console.log("SavedNews - savedArticles:", savedArticles);
  console.log("SavedNews - currentUser:", currentUser);

  const keywords = useMemo(() => {
    const allKeywords = savedArticles.map((article) => article.keyword);
    const uniqueKeywords = [...new Set(allKeywords)];
    return uniqueKeywords;
  }, [savedArticles]);

  return (
    <main className="saved__news">
      <Navigation
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
        currentUser={currentUser}
      />
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
