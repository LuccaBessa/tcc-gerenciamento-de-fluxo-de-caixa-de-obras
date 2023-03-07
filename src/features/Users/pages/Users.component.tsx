import { type ReactElement } from 'react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Hide,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Show
} from '@chakra-ui/react'

import { HeaderBar } from '../../../components'

export const Users = (): ReactElement => {
  return (
    <Box w='100%' h='100%'>
      <HeaderBar />
      <Flex padding={2} gap={2} justifyContent='space-between'>
        <InputGroup maxW='600px'>
          <Input placeholder='Pesquisar...' />
          <InputRightElement>
            <SearchIcon color='gray.400' />
          </InputRightElement>
        </InputGroup>
        <Hide below='md'>
          <Button rightIcon={<AddIcon />} variant='solid' colorScheme='brand'>
            Criar
          </Button>
        </Hide>
        <Show below='md'>
          <IconButton
            aria-label='Create User'
            icon={<AddIcon />}
            variant='solid'
            colorScheme='brand'
          />
        </Show>
      </Flex>
      <Hide below='md'></Hide>
      <Show below='md'></Show>
    </Box>
  )
}
