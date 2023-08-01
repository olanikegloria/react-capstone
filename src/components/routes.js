import CoinStats from './coinStats/CoinStats';
import Coins from './coin/Coins';

const routes = [
  {
    id: 1,
    path: '/Coins',
    element: <Coins />,
  },
  {
    id: 2,
    path: '/CoinStats',
    element: <CoinStats />,
  },
];

export default routes;
