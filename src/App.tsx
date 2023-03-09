import { type ReactElement, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './features/Login'
import { Router } from './features/Routes'
import { useProfile } from './hooks'

const queryClient = new QueryClient()

export const App = (): ReactElement => {
  const { setProfile } = useProfile()

  useEffect(() => {
    onAuthStateChanged(auth, (user: any | null) => {
      user != null && localStorage.setItem('accessToken', user.accessToken)
      setProfile(user)
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}
