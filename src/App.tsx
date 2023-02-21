import { useState, useEffect } from 'react';
import { Router } from './features/Routes';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from './hooks/useAuth';
import { auth } from './features/Login';

export const App = () => {
  const { setUser } = useAuth();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  }, []);

  return <Router />;
};
