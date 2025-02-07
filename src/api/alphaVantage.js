import axios from 'axios';

const API_KEY = '';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol, timeRange) => {
  try {
    let functionType = '';
    let intervalType = '';

    switch (timeRange) {
      case '1day':
        functionType = 'TIME_SERIES_INTRADAY';
        intervalType = '5min'; 
        break;
      case '1week':
        functionType = 'TIME_SERIES_INTRADAY';
        intervalType = '30min'; 
        break;
      case '1month':
        functionType = 'TIME_SERIES_DAILY';
        break;
      case '1year':
        functionType = 'TIME_SERIES_MONTHLY';
        break;
      default:
        throw new Error('Invalid time range selected');
    }

    const response = await axios.get(BASE_URL, {
      params: {
        function: functionType,
        symbol: symbol,
        interval: intervalType,
        apikey: API_KEY,
      },
    });

    console.log('Raw API Response:', response.data);

    if (response.data && response.data.Information === "Thank you for using Alpha Vantage! Our standard API rate limit is 5 requests per minute and 500 requests per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.") {
      throw new Error('API rate limit exceeded');
    }

    const metaData = response.data['Meta Data'];
    const timeSeriesKey = Object.keys(response.data).find(key =>
      key.includes('Time Series') || key.includes('TimeSeries')
    );
    const timeSeries = response.data[timeSeriesKey];

    if (!metaData || !timeSeries) {
      throw new Error('Invalid response format from Alpha Vantage API.');
    }

    const formattedTimeSeries = Object.keys(timeSeries).map((time) => ({
      time,
      ...timeSeries[time],
    }));

    return { metaData, timeSeries: formattedTimeSeries };
  } catch (error) {
    console.error('Error fetching the stock data', error);
    throw error;
  }
};

export const fetchStockOverview = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    console.log('Stock Overview Response:', response.data);

    if (response.data && response.data.Information === "Thank you for using Alpha Vantage! Our standard API rate limit is 5 requests per minute and 500 requests per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.") {
      throw new Error('API rate limit exceeded.');
    }

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('Invalid response format from Alpha Vantage API.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching the stock overview', error);
    throw error;
  }
};

export const fetchStockSymbols = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: query,
        apikey: API_KEY,
      },
    });

    if (response.data.bestMatches) {
      return response.data.bestMatches.map(match => match['1. symbol']);
    } else {
      throw new Error('No matches found');
    }
  } catch (error) {
    console.error('Error fetching stock symbols', error);
    throw error;
  }
};

