import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoins, setSearch, setSingleCoin } from '../../redux/coins/coinSlice';
import '../coin.css';
import Coin from './coin';
import cryptoImage from '../icon.png';

function Coins() {
  const dispatch = useDispatch();
  const { coins, loading, searchQuery } = useSelector((state) => state.coins);

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(getCoins());
    }
  }, [dispatch, coins.length]);

  useEffect(() => {
    // Dispatch an action to update the singleCoin value
    dispatch(setSingleCoin(/* new singleCoin value */));
  }, [dispatch]);

  const handleSearch = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const filteredCoins = coins.filter(
    (coin) => coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      || coin.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container">
      {loading
        ? (<div>Loading ...</div>)
        : (
          <>
            <div className="card-top">
              <div className="img-container">
                <img alt="coin.png" src={cryptoImage} className="top-img" />
              </div>
              <div className="card-info">
                <h2>
                  Cryptocurrency
                </h2>
                <h4> 675456786</h4>
                <h3>marketcap</h3>
              </div>
            </div>
            <div className="input-container">
              <input type="text" value={searchQuery} onChange={handleSearch} className="custom-input" placeholder="stats by crypto" />
            </div>
            <div className="card-container">
              {filteredCoins.map((coin, index) => (
                <Coin
                  index={index}
                  key={coin.uuid}
                  coin={coin}
                />
              ))}
            </div>
          </>
        )}
    </div>
  );
}

export default Coins;
