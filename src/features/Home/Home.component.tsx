import { type ReactElement } from 'react'
import { Box, Button, useToast } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'

import { auth } from '../Login'

export const Home = (): ReactElement => {
  const toast = useToast()

  const onClickSignOut = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      toast({
        title: 'Erro ao deslogar do sistema',
        description: 'Por favor tente novamente',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        onClick={() => {
          void onClickSignOut()
        }}
        colorScheme='brand'
      >
        Sair
      </Button>
    </Box>
  )
}
