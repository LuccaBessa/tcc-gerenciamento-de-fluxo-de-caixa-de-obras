import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Select, Stack } from '@chakra-ui/react'
import { type ReactElement, type RefObject } from 'react'

interface IProps {
  isOpen: boolean
  onClose: () => void
  btnRef: RefObject<any>
  size: string
}

export const UserForm = ({ isOpen, onClose, btnRef, size }: IProps): ReactElement => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Criar Usuário</DrawerHeader>

        <DrawerBody>
          <Stack gap={2}>
            <Input placeholder='Nome' />
            <Input placeholder='Sobrenome' />
            <Input placeholder='Email'/>
            <Input placeholder='Senha' type='password' />
            <Select placeholder='Permissão'>
              <option value={0}>Leitura</option>
              <option value={1}>Escrita</option>
              <option value={2}>Adminstrador</option>
            </Select>
            <Input placeholder='Telefone'/>
            <Input placeholder='Documento' />
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme='brand' variant='solid' w='100%' onClick={onClose}>
            Criar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
