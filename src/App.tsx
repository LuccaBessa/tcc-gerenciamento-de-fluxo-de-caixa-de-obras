import { type ReactElement } from 'react'

// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './features/Login'
import { Router } from './features/Routes'

export const App = (): ReactElement => {
  // const { setUser } = useAuth()

  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     setUser(user)
  //   })
  // }, [])

  return <Router />
}
