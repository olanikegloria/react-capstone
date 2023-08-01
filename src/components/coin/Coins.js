import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoins } from '../../redux/coins/coinSlice';
import Coin from './coin';

function Coins() {
  const dispatch = useDispatch();
  const { coins, loading } = useSelector((state) => state.coins);

  useEffect(() => {
    dispatch(getCoins());
  }, [dispatch]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {loading
        ? (<div>Loading ...</div>)
        : (
          <ul>
            {coins.map((coin) => (
              <Coin
                key={coin.id}
                coin={coin}
              />
            ))}
          </ul>
        )}
      ;
    </div>
  );
}

export default Coins;
