import { type ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from '../Home'
import { Login } from '../Login'
import { Users } from '../Users'

import { PrivateWrapper } from './PrivateWrapper.component'

export const Router = (): ReactElement => {
  return (
    <main>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateWrapper />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/usuarios' element={<PrivateWrapper />}>
          <Route element={<Users />} />
        </Route>
      </Routes>
    </main>
  )
}
