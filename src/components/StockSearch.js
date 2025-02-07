import React, { useState } from 'react';
import './StockSearch.css';
import { Newspaper } from 'lucide-react';

const StockSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      onSelect(query.trim().toUpperCase());
    }
  };

  return (
    <div className='search-container'>
      <h1>News & Insights <Newspaper /> </h1>    
    <div className="stock-search">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
    </div>
  );
};

export default StockSearch;
