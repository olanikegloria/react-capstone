import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Coins from './Coins';

const mockStore = configureStore([]);

describe('Coins Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      coins: {
        coins: [
          {
            uuid: '1',
            symbol: 'BTC',
            name: 'Bitcoin',
          },
          {
            uuid: '2',
            symbol: 'ETH',
            name: 'Ethereum',
          },
          // Add more mock coins as needed
        ],
        loading: false,
        searchQuery: '',
      },
    });
  });

  it('renders loading state', () => {
    store = mockStore({
      coins: {
        coins: [],
        loading: true,
        searchQuery: '',
      },
    });

    render(
      <Provider store={store}>
        <Coins />
      </Provider>,
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('renders coin data', () => {
    render(
      <Provider store={store}>
        <Coins />
      </Provider>,
    );

    expect(screen.getByText('Cryptocurrency')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('stats by crypto')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    // You can add more assertions for other coin data
  });

  it('filters coins based on search', () => {
    render(
      <Provider store={store}>
        <Coins />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('stats by crypto');
    fireEvent.change(searchInput, { target: { value: 'Bitcoin' } });

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.queryByText('Ethereum')).not.toBeInTheDocument();
  });
});
