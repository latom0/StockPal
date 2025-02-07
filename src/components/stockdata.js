import React, { useState } from 'react';
import { fetchStockData } from '../api/alphaVantage';
import './StockData.css';
import Chart from 'react-apexcharts';
import { ChartCandlestick } from 'lucide-react';

const StockData = () => {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [timeRange, setTimeRange] = useState('1day');

  const handleFetchStockData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchStockData(symbol, timeRange);
      console.log('API Response:', result);

      if (result && result.timeSeries && result.timeSeries.length > 0) {
        setData(result);
      } else {
        throw new Error('Failed to fetch stock data. Invalid response format.');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to fetch stock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setShowChart(!showChart);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <div className="container">
      <h1>Stock Data <ChartCandlestick /></h1>
      <div className="input-container">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <button onClick={handleFetchStockData}>Fetch Stock Data</button>
      </div>
      <div className="select-container">
        <label>Select Time Range:</label>
        <select value={timeRange} onChange={handleTimeRangeChange}>
          <option value="1day">Current Day</option>
          <option value="1week">Last Week</option>
          <option value="1month">Last Month</option>
          <option value="1year">Last Year</option>
        </select>
      </div>
      <button className="toggle-view-btn" onClick={toggleView}>
        {showChart ? 'Show Table' : 'Show Chart'}
      </button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {data && data.metaData && data.timeSeries && (
        <div className={showChart ? 'chart-container' : 'table-container'}>
          {showChart ? (
            <div>
              <h2>Candlestick Chart for {data.metaData['2. Symbol']}</h2>
              <Chart
                options={{
                  xaxis: { type: 'datetime' },
                  yaxis: { tooltip: { enabled: true } },
                  tooltip: {
                    theme: 'dark', 
                    style: {
                      fontSize: '12px',
                      fontFamily: 'Arial, sans-serif',
                      colors: ['#F5F5F5'] 
                    }
                }}}
                series={[
                  {
                    data: data.timeSeries.map((entry) => ({
                      x: new Date(entry.time).getTime(),
                      y: [
                        parseFloat(entry['1. open']),
                        parseFloat(entry['4. close']),
                        parseFloat(entry['3. low']),
                        parseFloat(entry['2. high'])
                      ]
                    }))
                  }
                ]}
                type="candlestick"
                height={400}
              />
            </div>
          ) : (
            <div>
              <h2>Stock Data for {data.metaData['2. Symbol']}</h2>
              <p>Last Refreshed: {data.metaData['3. Last Refreshed']}</p>
              <p>Time Zone: {data.metaData['6. Time Zone']}</p>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {data.timeSeries.map((entry) => (
                    <tr key={entry.time}>
                      <td>{entry.time}</td>
                      <td>{entry['1. open']}</td>
                      <td>{entry['2. high']}</td>
                      <td>{entry['3. low']}</td>
                      <td>{entry['4. close']}</td>
                      <td>{entry['5. volume']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockData;
