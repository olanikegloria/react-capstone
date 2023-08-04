import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoin, setSingleCoin } from '../../redux/coins/coinSlice';
import '../coin.css';
import Coinstat from './coinstat';

function CoinStats() {
  const { coinId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoin(coinId));
  }, [dispatch, coinId]);

  useEffect(() => {
    // Dispatch an action to update the singleCoin value
    dispatch(setSingleCoin(/* new singleCoin value */));
  }, [dispatch]);

  const { singleCoin } = useSelector((state) => state.coins);
  return (
    <div>
      <Coinstat
        singleCoin={singleCoin}
      />
    </div>
  );
}

export default CoinStats;
