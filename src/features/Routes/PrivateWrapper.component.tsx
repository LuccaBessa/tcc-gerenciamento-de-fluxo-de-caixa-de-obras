import { ReactFragment, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PrivateWrapper = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to='/login' />;
};
