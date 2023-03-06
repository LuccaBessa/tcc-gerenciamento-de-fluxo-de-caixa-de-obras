import { createContext, type ReactElement, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (user: User | null) => {}
})

const AuthProvider = ({ children }: any): ReactElement => {
  const [user, handleUserState] = useState<User | null>(null)
  const navigate = useNavigate()

  const setUser = (user: User | null): void => {
    handleUserState(user)
    user != null ? navigate('/') : navigate('/login')
    user?.refreshToken != null && localStorage.setItem('refreshToken', user.refreshToken)
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
