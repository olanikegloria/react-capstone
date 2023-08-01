import React from 'react';
import PropTypes from 'prop-types';

function Coin({ coin }) {
  return (
    <li>
      <h2>{coin.name}</h2>
      <h2>{coin.symbol}</h2>
    </li>
  );
}

Coin.propTypes = {
  coin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }).isRequired,
};

export default Coin;
