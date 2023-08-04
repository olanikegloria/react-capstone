import React from 'react';
import { act, create } from 'react-test-renderer'; // Import the act and create functions
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CoinStats from './CoinStats';
import { fetchCoin, setSingleCoin } from '../../redux/coins/coinSlice';

const mockStore = configureStore([]);
const store = mockStore({
  coins: {
    singleCoin: {
      uuid: 'Qwsogvtv82FCd',
      name: 'Bitcoin',
      symbol: 'BTC',
      // Other mock properties...
    },
  },
});

jest.mock('../../redux/coins/coinSlice', () => ({
  fetchCoin: jest.fn(),
  setSingleCoin: jest.fn(),
}));

// ... (other imports and mock setups)

describe('CoinStats component', () => {
  it('renders correctly with mock data', () => {
    const expectedUuid = 'Qwsogvtv82FCd'; // Update with the actual uuid being passed

    act(() => {
      const component = (
        <Provider store={store}>
          <CoinStats />
        </Provider>
      );

      // Render the component using the create function
      const tree = create(component);

      // Assert that the component renders correctly
      expect(tree.toJSON()).toMatchSnapshot();

      // Assert that the fetchCoin action was dispatched with the correct argument
      expect(fetchCoin).toHaveBeenCalledWith(expectedUuid);

      // Assert that the setSingleCoin action was dispatched with the correct argument
      expect(setSingleCoin).toHaveBeenCalledWith({
        uuid: 'Qwsogvtv82FCd',
        name: 'Bitcoin',
        symbol: 'BTC',
        // Other mock properties...
      });
    });
  });
});
