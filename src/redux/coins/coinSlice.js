import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  coins: [],
  loading: true,
  error: false,
  searchQuery: '',
  singleCoin: null, // Change to null initially
  coinStat: '',
  singleCoinChanged: false, // New field to track changes
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

export const fetchCoin = createAsyncThunk('coins/fetchCoin',
  async (uuid, thunkAPI) => {
    try {
      const response = await axios.request(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, options);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  });

export const getCoins = createAsyncThunk('coins/getCoins',
  async (thunkAPI) => {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  });

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSingleCoin: (state, action) => {
      state.singleCoinChanged = state.singleCoin !== action.payload;
      state.singleCoin = action.payload;
    },
  },
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
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCoin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoin.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCoin = action.payload.data.coin;
      })
      .addCase(fetchCoin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearch, setSingleCoin } = coinsSlice.actions;
export default coinsSlice.reducer;
