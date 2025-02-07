import React from 'react';
import StockSearch from '../components/StockSearch';
import StockOverview from '../components/StockOverview';
import StockNews from '../components/StockNews';
import './MainPage.css';

const HomePage = () => {
  const [selectedSymbol, setSelectedSymbol] = React.useState('');

  return (
    <div className="main-page">
      <StockSearch onSelect={setSelectedSymbol} />
      {selectedSymbol && (
        <div className="main-content">
          <div className="left-column">
            <StockNews symbol={selectedSymbol} />
          </div>
          <div className="right-column">
            <StockOverview symbol={selectedSymbol} />
          </div>
        </div>
      )}
    </div>
  );
};

const MainPage = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default MainPage;
