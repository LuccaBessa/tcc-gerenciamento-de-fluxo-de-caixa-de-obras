import { type ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useProfile } from '../../hooks/useProfile'

export const PrivateWrapper = (): ReactElement => {
  const { profile } = useProfile()

  return profile != null ? <Outlet /> : <Navigate to='/login' />
}
