import React, { useEffect, useState } from 'react';
import { fetchStockOverview } from '../api/alphaVantage';
import './StockOverview.css';

const StockOverview = ({ symbol }) => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOverview = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchStockOverview(symbol);
        setOverview(data);
      } catch (error) {
        setError('Failed to fetch stock overview. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      getOverview();
    }
  }, [symbol]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!overview) {
    return <p>No data available.</p>;
  }

  return (
    <div className="stock-overview">
      <h2>{overview.Name} ({overview.Symbol})</h2>
      <p>Market Cap: {overview.MarketCapitalization}</p>
      <p>P/E Ratio: {overview.PERatio}</p>
      <p>Dividend Yield: {overview.DividendYield}</p>
      <p>52-Week High: {overview['52WeekHigh']}</p>
      <p>52-Week Low: {overview['52WeekLow']}</p>
      <p>Description: {overview.Description}</p>
    </div>
  );
};

export default StockOverview;
