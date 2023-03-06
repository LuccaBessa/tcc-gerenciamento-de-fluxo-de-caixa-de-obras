/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ReactElement, useRef } from 'react'
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
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { signOut } from 'firebase/auth'

import Logo from '@/assets/logo.webp'

import { auth } from '../../features/Login'
import { useAuth } from '../../hooks'

import { HeaderLink } from './components/HeaderLink.component'

export const HeaderBar = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const toast = useToast()
  const { user } = useAuth()

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
      <Hide below='md'>
        <Flex
          backgroundColor='brand.main'
          direction='row'
          justifyContent='start'
          alignItems='center'
          p={4}
          gap={8}
        >
          <Image src={Logo} height='12' />
          <Flex flexGrow={1} gap={4}>
            <HeaderLink name='Dashboard' link='/' />
            <HeaderLink name='Centro de Custo' link='/usuarios' />
            <HeaderLink name='Fluxo de Caixa' link='/usuarios' />
            <HeaderLink name='Clientes' link='/usuarios' />
            <HeaderLink name='Fornecedores' link='/usuarios' />
            <HeaderLink name='Usuários' link='/usuarios' active />
          </Flex>
          <Menu>
            <MenuButton aria-label='Perfil'>
              <Avatar size='sm' name={user?.displayName != null ? user?.displayName : ''} />
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
        <Flex p={4} backgroundColor='brand.main'>
          <IconButton
            ref={btnRef}
            aria-label='Menu'
            icon={<HamburgerIcon color='white' />}
            onClick={onOpen}
            variant='ghost'
            size='lg'
          />
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
              <Button
                leftIcon={<SettingsIcon />}
                variant='ghost'
                width='100%'
                justifyContent='start'
                gap={4}
                paddingX={0}
              >
                Dashboard
              </Button>
              <Button
                leftIcon={<SettingsIcon />}
                variant='ghost'
                width='100%'
                justifyContent='start'
                gap={4}
                paddingX={0}
              >
                Centro de Custo
              </Button>
              <Button
                leftIcon={<SettingsIcon />}
                variant='ghost'
                width='100%'
                justifyContent='start'
                gap={4}
                paddingX={0}
              >
                Fluxo de Caixa
              </Button>
              <Button
                leftIcon={<SettingsIcon />}
                variant='ghost'
                width='100%'
                justifyContent='start'
                gap={4}
                paddingX={0}
              >
                Clientes
              </Button>
              <Button
                leftIcon={<SettingsIcon />}
                variant='ghost'
                width='100%'
                justifyContent='start'
                gap={4}
                paddingX={0}
              >
                Fornecedores
              </Button>
              <Button
                leftIcon={<SettingsIcon />}
                variant='ghost'
                width='100%'
                justifyContent='start'
                gap={4}
                paddingX={0}
              >
                Usuários
              </Button>
            </DrawerBody>
            <DrawerFooter>
              <Button
                leftIcon={
                  <Avatar size='sm' name={user?.displayName != null ? user?.displayName : ''} />
                }
                variant='ghost'
                width='100%'
                justifyContent='start'
                gap={4}
                paddingX={0}
              >
                {user?.displayName != null ? user?.displayName : ''}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  )
}
