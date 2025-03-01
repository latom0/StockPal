import axios from "axios";

export const fetchStockNews = async (symbol) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          q: symbol,
          apiKey: '', 
        },
      });
  
      console.log('Stock News Response:', response.data);
  
      if (!response.data || !response.data.articles) {
        throw new Error('Invalid response format from News API.');
      }
  
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching the stock news', error);
      throw error;
    }
  };
