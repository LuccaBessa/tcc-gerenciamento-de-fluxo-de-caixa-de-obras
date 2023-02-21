import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (user: User | null) => {},
});

const AuthProvider = ({ children }: any) => {
  const [user, handleUserState] = useState<User | null>(null);
  const navigate = useNavigate();

  const setUser = (user: User | null) => {
    handleUserState(user);
    user ? navigate('/') : navigate('/login');
  };

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
