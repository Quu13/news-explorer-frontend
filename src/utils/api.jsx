import { saveArticle, removeArticle, getSavedArticles } from './localStorage';

const articles = [
  {
    isSaved: true,
    title: "Breaking News: Tech Innovation in 2024",
    url: "https://example.com/tech-innovation-2024",
    urlToImage: "https://via.placeholder.com/300",
    keyword: "Technology",
    content: "The latest advancements in AI and robotics are reshaping the industry...",
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

// Define getArticles using localStorage
const getArticles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedArticles = getSavedArticles();
      resolve(savedArticles);
    }, 500); // Simulate delay
  });
};

const saveArticles = async ({ _id, isSaved, article }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = isSaved
        ? saveArticle(article)
        : removeArticle(article.url);
      resolve(success);
    }, 500);
  });
};

export { getArticles, saveArticles };
