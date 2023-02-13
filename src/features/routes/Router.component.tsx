import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from '../Home';
import { Login } from '../Login';

export const Router = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
