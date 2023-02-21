import { type ReactElement, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './features/Login'
import { Router } from './features/Routes'
import { useAuth } from './hooks/useAuth'

export const App = (): ReactElement => {
  const { setUser } = useAuth()
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  return <Router />
}
