import { type ReactElement, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
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
  Show,
  Skeleton
} from '@chakra-ui/react'

import { HeaderBar } from '../../../components'
import { UserCard } from '../components'
import { UserService } from '../services'
import { type IUserPaginatedResponse } from '../services/interfaces/IUserResponse'

const pageSize = 10

export const Users = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState<string>()
  const { getAllUsers } = UserService()

  const getUsersPage = async ({ pageParam = 1 }): Promise<IUserPaginatedResponse> => {
    try {
      const data = await getAllUsers(pageParam, pageSize, searchQuery)

      return {
        data: data.results,
        nextPage: pageParam + 1,
        totalPages: Math.ceil(data.totalCount / pageSize)
      }
    } catch (error) {
      return {
        data: [],
        nextPage: 0,
        totalPages: 0
      }
    }
  }

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['users', searchQuery],
    queryFn: getUsersPage,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage <= lastPage.totalPages) {
        return lastPage.nextPage
      }

      return undefined
    },
    refetchOnWindowFocus: false
  })

  return (
    <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'gray.100' }} >
      <HeaderBar />
      <Flex padding={2} gap={2} justifyContent='space-between'>
        <InputGroup maxW='600px'>
          <Input
            backgroundColor='white'
            placeholder='Pesquisar...'
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.currentTarget.value)
            }}
          />
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
      <Show below='md'>
        {isLoading
          ? (
              <Box>
                <Skeleton>
                  <UserCard
                    firstName='Carregando...'
                    lastName='Carregando...'
                    email='Carregando...'
                    permission={0}
                  />
                </Skeleton>
              </Box>
            )
          : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: 2,
                padding: 2,
                overflowY: 'auto'
              }}>
                {data?.pages != null
                  ? data?.pages
                    .map(page => page.data)
                    .flat(2)
                    .map(user => (
                        <UserCard
                          key={user.userId}
                          firstName={user.firstName}
                          lastName={user.lastName}
                          email={user.email}
                          permission={user.permission}
                        />
                    ))
                  : ''}
              </Box>
            )}
      </Show>
    </Box>
  )
}
