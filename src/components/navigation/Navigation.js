import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../coin.css';
import { FaMicrophone, FaLessThan } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';

function Navigation() {
  const { singleCoinChanged } = useSelector((state) => state.coins);
  const message = singleCoinChanged ? 'cypto views' : ' crypto/coin supply';
  const message2 = singleCoinChanged ? 2015 : '';
  return (
    <div className="navigation">
      <div className="nav-left">
        <Link to="/Coins" className="link">
          <FaLessThan className="less-than" />
          {message2}
        </Link>
      </div>
      <div className="nav-center">
        <p>{message}</p>
      </div>
      <div className="nav-right">
        <div className="mic-set">
          <FaMicrophone className="mic" />
          <FcSettings className="settings" />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
