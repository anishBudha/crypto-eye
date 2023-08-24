import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import { Helmet } from "react-helmet";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin-app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>CryptoEye</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Crypto Price Tracker" />
      </Helmet>
      <div className="coin-search">
        <h1 className="coin-text">Crypto-Eye</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="coin-title">
        <p className="coin-name-title">Name / Symbol</p>
        <p className="coin-price-title">Price</p>
        <p className="coin-volume-title">Volume</p>
        <p className="coin-percent-title">Price Change</p>
        <p className="coin-marketcap-title">Market Cap</p>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
