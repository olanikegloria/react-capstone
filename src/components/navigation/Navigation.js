import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <NavLink to="/Coins"> Coins</NavLink>
      <NavLink to="/CoinStats"> CoinStats</NavLink>

    </div>
  );
}

export default Navigation;
