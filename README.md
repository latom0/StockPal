# StockApp

StockApp is a basic stock analytics application that allows users to search for stock data, view stock overviews, and read related news. The app uses the Alpha Vantage API to fetch stock information and NewsApi for latest news related to specific stock

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Usage](#usage)
- [Project Structure](#project-structure)


## Features

- **Stock Search**: Search for stock symbols and retrieve relevant data.
- **Stock Overview**: View detailed information about a specific stock.
- **Stock News**: Get the latest news articles related to a specific stock.
- **Interactive Charts**: Visualize stock data with tables and interactive charts.
- **Navigation Bar**: Easily navigate between different sections of the app.

## Demo

A live demo of the app is available [here](https://go.screenpal.com/watch/cZiZDjVPxvE). 


## Usage

1. **Search for Stock News and Overviews**:
   - Click on "News & Insights" on the navigation bar (default page)
   - Enter a stock symbol in the search bar and click the "Search" button.
   - View the stock overview and related news on the same page.

2. **Navigate**:
   - Use the navigation bar at the top to switch between different sections of the app.

3. **View Stock Data**:
   - Click on "Stock Data" in the navigation bar.
   - Enter a stock symbol in the search bar then select a timeframe and click the "Search" button
   - Switch between chart and table format by clicking the "Show Chart / Show Table" button


## Project Structure

```plaintext
.
├── public
│   ├── index.html
├── src
│   ├── api
│   │   └── alphaVantage.js
│   │   └── newsapi.js
│   ├── components
│   │   ├── NavBar.js
│   │   ├── NavBar.css
│   │   ├── StockSearch.js
│   │   ├── StockSearch.css
│   │   ├── StockOverview.js
│   │   ├── StockOverview.css
│   │   ├── StockNews.js
│   │   ├── StockNews.css
│   ├── pages
│   │   ├── MainPage.js
│   │   ├── StockDataPage.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
└── package.json
