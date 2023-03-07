import { type ReactElement, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './features/Login'
import { Router } from './features/Routes'
import { useAuth } from './hooks'

export const App = (): ReactElement => {
  const { setUser } = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user: any | null) => {
      console.log('user', user)
      setUser(user)
      user != null && localStorage.setItem('accessToken', user.accessToken)
    })
  }, [])

  return <Router />
}
