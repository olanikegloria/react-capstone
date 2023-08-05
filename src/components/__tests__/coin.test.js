import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Coin from '../coin/coin';

test('renders coin name and price', () => {
  const coin = {
    name: 'Bitcoin',
    price: '50000',
    uuid: '123',
    iconUrl: 'https://example.com/bitcoin.png',
  };
  const { getByText } = render(
    <BrowserRouter>
      <Coin coin={coin} index={0} />
    </BrowserRouter>,
  );
  const nameElement = getByText(/Bitcoin/i);
  const priceElement = getByText(/50000/i);
  expect(nameElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});
