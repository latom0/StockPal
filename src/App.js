import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import StockData from './components/stockdata';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/data" element={<StockData />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
