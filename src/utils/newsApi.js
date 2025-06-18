const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsApiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://nomoreparties.co/news/v2/everything'
    : 'https://newsapi.org/v2/everything';

const getNews = (query) => {
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]; // YYYY-MM-DD
  const toDate = new Date().toISOString().split('T')[0]; // today's date

  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}&from=${fromDate}&to=${toDate}&pageSize=100`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.articles);
};

export default getNews;
