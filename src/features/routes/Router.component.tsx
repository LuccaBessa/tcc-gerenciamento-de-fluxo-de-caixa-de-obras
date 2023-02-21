import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home';
import { Login } from '../Login';
import { PrivateWrapper } from './PrivateWrapper.component';

export const Router = () => {
  return (
    <main>
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  );
};
