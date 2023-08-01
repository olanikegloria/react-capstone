import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coins/coinSlice';

const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

export default store;
