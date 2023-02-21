import { type ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from '../Home'
import { Login } from '../Login'

import { PrivateWrapper } from './PrivateWrapper.component'

export const Router = (): ReactElement => {
  return (
    <main>
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  )
}
