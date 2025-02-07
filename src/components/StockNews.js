import React, { useEffect, useState } from 'react';
import { fetchStockNews } from '../api/newsapi';
import './StockNews.css';

const StockNews = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchStockNews(symbol);
        setNews(data);
      } catch (error) {
        setError('Failed to fetch stock news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      getNews();
    }
  }, [symbol]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (news.length === 0) {
    return <p>No news available.</p>;
  }

  return (
    <div className="stock-news">
      <h2>Latest News for {symbol}</h2>
      <ul>
        {news.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockNews;
