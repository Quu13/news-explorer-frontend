const SAVED_ARTICLES_KEY = 'news-articles';

const getSavedArticles = () => {
  try {
    const saved = localStorage.getItem(SAVED_ARTICLES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error getting saved articles:', error);
    return [];
  }
};

// Save an article to localStorage
const saveArticle = (article) => {
  try {
    const savedArticles = getSavedArticles();
    // Add keyword if it doesn't exist
    const articleToSave = { ...article, keyword: article.keyword || 'General' };
    
    // Check if article already exists to prevent duplicates
    if (!savedArticles.some(saved => saved.url === article.url)) {
      const updatedArticles = [...savedArticles, articleToSave];
      localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving article:', error);
    return false;
  }
};

// Remove an article from localStorage
const removeArticle = (articleUrl) => {
  try {
    const savedArticles = getSavedArticles();
    const updatedArticles = savedArticles.filter(article => article.url !== articleUrl);
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
    return true;
  } catch (error) {
    console.error('Error removing article:', error);
    return false;
  }
};

// Check if an article is saved
const isArticleSaved = (articleUrl) => {
  try {
    const savedArticles = getSavedArticles();
    return savedArticles.some(article => article.url === articleUrl);
  } catch (error) {
    console.error('Error checking if article is saved:', error);
    return false;
  }
};

export { getSavedArticles, saveArticle, removeArticle, isArticleSaved };