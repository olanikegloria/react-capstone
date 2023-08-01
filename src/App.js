import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import routes from './components/routes';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
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
