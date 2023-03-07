import { type ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { Home } from '../Home'
import { Login } from '../Login'
import { Users } from '../Users'

import { PrivateWrapper } from './PrivateWrapper.component'

export const Router = (): ReactElement => {
  return (
    <Box as='main'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateWrapper />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path='/usuarios' element={<Users />} />
        </Route>
      </Routes>
    </Box>
  )
}
