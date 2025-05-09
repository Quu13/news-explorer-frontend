import { createContext } from "react";

const NewsContext = createContext({
  newsArticles: [],
  handleSearch: () => {},
});

export default NewsContext;