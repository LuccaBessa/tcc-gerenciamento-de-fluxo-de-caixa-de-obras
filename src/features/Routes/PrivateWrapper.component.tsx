import { type ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

export const PrivateWrapper = (): ReactElement => {
  const { user } = useAuth()

  return user != null ? <Outlet /> : <Navigate to='/login' />
}
