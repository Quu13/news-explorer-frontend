import { saveArticle, removeArticle } from './localStorage';

const articles = [
    {
      isSaved: true,
      title: "Breaking News: Tech Innovation in 2024",
      url: "https://example.com/tech-innovation-2024", 
      urlToImage: "https://via.placeholder.com/300",
      keyword: "Technology",
      content:
        "The latest advancements in AI and robotics are reshaping the industry...",
      pubDate: "2024-02-10",
      author: "John Doe",
    },
    {
      isSaved: true,
      title: "Finance: Stock Market Hits Record Highs",
      url: "https://example.com/stock-market-highs", 
      urlToImage: "https://via.placeholder.com/300",
      keyword: "Finance",
      content: "The stock market soared to new highs...",
      pubDate: "2024-02-08",
      author: "Michael Johnson",
    },
  ].map((article) => ({ ...article, _id: crypto.randomUUID() }));
  
  // const saveArticles = async ({ _id, isSaved}) => {
  //   if (isSaved) {
  //     // Add article if not already saved
  //     return {...}
  //   } else {
  //     // Remove article if isSaved is false
  //     setSavedArticles(prev => prev.filter(a => a._id !== _id));
  //   }
  // }
  
  const saveArticles = async ({ _id, isSaved, article }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isSaved) {
        // Add the article using localStorage function
        const success = saveArticle(article);
        resolve(success);
      } else {
        // Remove the article using localStorage function
        const success = removeArticle(article.url);
        resolve(success);
      }
    }, 500); // Keep the delay for consistency
  });
};
  
  export { getArticles, saveArticles };