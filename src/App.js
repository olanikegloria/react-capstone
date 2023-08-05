import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import routes from './components/routes';
import Coins from './components/coin/Coins';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Coins />} />
        {routes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
