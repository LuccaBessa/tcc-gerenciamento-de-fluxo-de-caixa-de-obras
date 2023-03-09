import { type ReactElement, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './features/Login'
import { Router } from './features/Routes'
import { ProfileProvider } from './hooks/useProfile'
import { HeaderBar } from './components'
import { useProfile } from './hooks'
import { theme } from './theme'

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ProfileProvider>
            <Box display='flex' flexDirection='column' overflow='auto' height='100vh'>
              <HeaderBar />
              <Box flex={1} display='flex' overflow='auto'>
                <Router />
              </Box>
            </Box>
          </ProfileProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
