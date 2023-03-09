import { onAuthStateChanged } from 'firebase/auth'
import { type ReactElement, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useProfile } from '../../hooks'

import { Home } from '../Home'
import { auth, Login } from '../Login'
import { Users } from '../Users'

import { PrivateWrapper } from './PrivateWrapper.component'

export const Router = (): ReactElement => { 
  const { setProfile } = useProfile()

  useEffect(() => {
    const unsubiscribe = onAuthStateChanged(auth, (user: any | null) => {
      user != null && localStorage.setItem('accessToken', user.accessToken)
      setProfile(user)
    })

    return () => {
      unsubiscribe()
    }
  }, [])
  
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<PrivateWrapper />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<PrivateWrapper />}>
        <Route path='/usuarios' element={<Users />} />
      </Route>
    </Routes>
  )
}
