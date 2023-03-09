/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
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
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

import { UserCard, UserCardSkeleton } from '../components/UserCard'
import { UserService } from '../services'
import { type IUserPaginatedResponse } from '../services/interfaces/IUserResponse'

const pageSize = 10

export const Users = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState<string>('')
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
    <Box>
      <Hide below='md'>
        <Flex padding={4} gap={2} justifyContent='space-between'>
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
          <Button rightIcon={<AddIcon />} variant='solid' colorScheme='brand'>
            Criar
          </Button>
        </Flex>
        <Box
          sx={{
            marginY: 4,
            marginX: 16,
            border: '1px solid var(--chakra-colors-gray-300)',
            borderRadius: '4px'
          }}
        >
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Email</Th>
                  <Th>Permissão</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  <Tr>
                    <Td>
                      <Skeleton />
                    </Td>
                    <Td>
                      <Skeleton />
                    </Td>
                    <Td>
                      <Skeleton />
                    </Td>
                  </Tr>
                ) : data?.pages != null ? (
                  data?.pages
                    .map(page => page.data)
                    .flat(2)
                    .map(user => (
                      <Tr key={user.userId}>
                        <Td>{`${user.firstName} ${user.lastName}`}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.permission}</Td>
                      </Tr>
                    ))
                ) : (
                  <Tr></Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Hide>
      <Show below='md'>
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
          <IconButton
            aria-label='Create User'
            icon={<AddIcon />}
            variant='solid'
            colorScheme='brand'
          />
        </Flex>
        {isLoading ? (
          <Flex sx={{ padding: 2, gap: 2, flexDirection: 'column', overflowY: 'hidden' }}>
            {[...Array(15)].map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </Flex>
        ) : (
          <Stack>
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
          </Stack>
        )}
      </Show>
    </Box>
  )
}
