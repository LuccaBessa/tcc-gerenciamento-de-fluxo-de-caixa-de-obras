import { type ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

import { HeaderBar } from '../../../components'

export const Home = (): ReactElement => {
  return (
    <Box>
      <HeaderBar />
      Dashboard
    </Box>
  )
}
