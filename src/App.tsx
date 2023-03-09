import { type ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Box, ChakraProvider } from '@chakra-ui/react'

import { Router } from './features/Routes'
import { ProfileProvider } from './hooks/useProfile'
import { HeaderBar } from './components'
import { theme } from './theme'

const queryClient = new QueryClient()

export const App = (): ReactElement => {
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
