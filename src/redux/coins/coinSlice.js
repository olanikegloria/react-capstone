import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  coins: [],
  loading: true,
  error: false,
};

const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '20',
    offset: '0',
  },
  headers: {
    'X-RapidAPI-Key': 'a018ef236dmshdee85e2adbcdef9p1e359djsn1b163cdcb0dc',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  },
};

export const getCoins = createAsyncThunk('coins/getCoins',
  async (thunkAPI) => {
    try {
      const response = await axios.request(options);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  });

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload.data.coins;
      })
      .addCase(getCoins.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default coinsSlice.reducer;
