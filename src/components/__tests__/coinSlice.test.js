import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import coinsReducer, {
  getCoins, fetchCoin, setSearch, setSingleCoin,
} from '../../redux/coins/coinSlice';

const axiosMock = new MockAdapter(axios);

const mockGetCoinsResponse = {
  data: {
    coins: [{ id: 1, name: 'Coin 1' }, { id: 2, name: 'Coin 2' }],
  },
};

const mockFetchCoinResponse = {
  data: {
    coin: { id: 1, name: 'Coin 1' },
  },
};

const createMockStore = (state) => configureStore({
  reducer: coinsReducer,
  preloadedState: state,
  middleware: [...getDefaultMiddleware(), thunk],
});

describe('coins slice', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should handle getCoins.pending and getCoins.fulfilled', async () => {
    axiosMock.onGet('https://coinranking1.p.rapidapi.com/coins').reply(200, mockGetCoinsResponse);

    const store = createMockStore({ coins: [], loading: false, error: false });

    await store.dispatch(getCoins());

    const state = store.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.coins).toEqual(mockGetCoinsResponse.data.coins);
  });

  it('should handle getCoins.rejected', async () => {
    axiosMock.onGet('https://coinranking1.p.rapidapi.com/coins').reply(200, { data: { coins: [{ id: 1, name: 'Bitcoin' }] } });

    const store = createMockStore({ coins: [], loading: false, error: false });

    await store.dispatch(getCoins());

    const state = store.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.coins).toEqual([{ id: 1, name: 'Bitcoin' }]);
  });

  it('should handle fetchCoin.pending and fetchCoin.fulfilled', async () => {
    axiosMock.onGet('https://coinranking1.p.rapidapi.com/coin/1').reply(200, mockFetchCoinResponse);

    const store = createMockStore({ singleCoin: null, loading: false, error: false });

    await store.dispatch(fetchCoin(1));

    const state = store.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.singleCoin).toEqual(mockFetchCoinResponse.data.coin);
  });

  it('should handle fetchCoin.rejected', async () => {
    axiosMock.onGet('https://coinranking1.p.rapidapi.com/coin/1').reply(500, {});

    const store = createMockStore({ singleCoin: null, loading: false, error: false });

    await store.dispatch(fetchCoin(1));

    const state = store.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Something went wrong');
    expect(state.singleCoin).toBeNull();
  });

  it('should handle setSearch', () => {
    const store = createMockStore({ searchQuery: '' });
    store.dispatch(setSearch('Bitcoin'));
    const state = store.getState();
    expect(state.searchQuery).toBe('Bitcoin');
  });

  it('should handle setSingleCoin', () => {
    const store = createMockStore({ singleCoin: null, singleCoinChanged: false });
    store.dispatch(setSingleCoin({ id: 1, name: 'Coin 1' }));
    const state = store.getState();
    expect(state.singleCoin).toEqual({ id: 1, name: 'Coin 1' });
    expect(state.singleCoinChanged).toBe(true);
  });
});
