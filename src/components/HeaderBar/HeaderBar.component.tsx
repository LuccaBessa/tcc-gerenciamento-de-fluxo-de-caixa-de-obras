/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ReactElement, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EditIcon, HamburgerIcon, LockIcon, SettingsIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Hide,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { signOut } from 'firebase/auth'

import Logo from '@/assets/logo.webp'

import { auth } from '../../features/Login'
import { useProfile } from '../../hooks'

import { HeaderLink } from './components/HeaderLink.component'

const routes = [
  {
    name: 'Dashboard',
    link: '/'
  },
  {
    name: 'Centro de Custo',
    link: '/centro-de-custo'
  },
  {
    name: 'Fluxo de Caixa',
    link: '/fluxo-de-caixa'
  },
  {
    name: 'Clientes',
    link: '/clientes'
  },
  {
    name: 'Fornecedores',
    link: '/fornecedores'
  },
  {
    name: 'Usuários',
    link: '/usuarios'
  }
]

export const HeaderBar = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { profile } = useProfile()

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
    <>
      {location.pathname !== '/login' && (
        <>
          <Hide below='md'>
            <Flex
              backgroundColor='brand.main'
              direction='row'
              justifyContent='start'
              alignItems='center'
              p={2}
              gap={8}
              height='60px'
            >
              <Image src={Logo} height='12' />
              <Flex flexGrow={1} gap={4}>
                {routes.map(route => (
                  <HeaderLink
                    key={route.name}
                    name={route.name}
                    link={route.link}
                    active={location.pathname === route.link}
                  />
                ))}
              </Flex>
              <Menu>
                <MenuButton aria-label='Perfil'>
                  <Avatar
                    size='md'
                    name={
                      profile?.firstName != null && profile.lastName != null
                        ? `${profile.firstName} ${profile.lastName}`
                        : ''
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<EditIcon />} onClick={onClickSignOut}>
                    Perfil
                  </MenuItem>
                  <MenuItem icon={<LockIcon />} onClick={onClickSignOut}>
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Hide>
          <Show below='md'>
            <Flex
              p={4}
              backgroundColor='brand.main'
              direction='row'
              alignItems='center'
              position='relative'
              height='60px'
            >
              <IconButton
                ref={btnRef}
                aria-label='Menu'
                icon={<HamburgerIcon color='white' />}
                onClick={onOpen}
                variant='ghost'
                size='lg'
                position='absolute'
              />
              <Text color='white' fontWeight='bold' fontSize={18} flexGrow={1} textAlign='center'>
                {routes.filter(route => route.link === location.pathname)[0].name}
              </Text>
            </Flex>
            <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader
                  sx={{
                    backgroundColor: 'brand.main',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8
                  }}
                >
                  <Image src={Logo} height='16' />
                </DrawerHeader>
                <DrawerBody display='flex' flexDirection='column' gap={4} padding={4}>
                  {routes.map(route => (
                    <Button
                      key={route.name}
                      leftIcon={<SettingsIcon />}
                      variant='ghost'
                      width='100%'
                      justifyContent='start'
                      gap={4}
                      paddingX={0}
                      onClick={() => {
                        navigate(route.link)
                        onClose()
                      }}
                    >
                      {route.name}
                    </Button>
                  ))}
                </DrawerBody>
                <DrawerFooter>
                  <Button
                    leftIcon={
                      <Avatar
                        size='sm'
                        name={
                          profile?.firstName != null && profile.lastName != null
                            ? `${profile.firstName} ${profile.lastName}`
                            : ''
                        }
                      />
                    }
                    variant='ghost'
                    width='100%'
                    justifyContent='start'
                    gap={4}
                    paddingX={0}
                  >
                    {profile?.firstName != null && profile.lastName != null
                      ? `${profile.firstName} ${profile.lastName}`
                      : ''}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Show>
        </>
      )}
    </>
  )
}
