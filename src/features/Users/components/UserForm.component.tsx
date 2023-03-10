import { type ReactElement, type RefObject, useState } from 'react'
import MaskedInput from 'react-text-mask'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Spinner,
  Stack
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { type IUser } from '../services/interfaces'

interface IProps {
  isOpen: boolean
  onClose: () => void
  btnRef: RefObject<any>
  size: string
}

const phoneRegExp = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/g

const defaultValues: IUser = {
  userId: '',
  personId: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  permission: 0,
  document: '',
  phone: ''
}

export const UserForm = ({ isOpen, onClose, btnRef, size }: IProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik<IUser>({
    initialValues: defaultValues,
    validationSchema: Yup.object<IUser>({
      email: Yup.string().email('Endereço de email inválido').required('Obrigatório'),
      password: Yup.string().required('Obrigatório'),
      firstName: Yup.string().required('Obrigatório'),
      lastName: Yup.string().required('Obrigatório'),
      permission: Yup.number().required('Obrigatório'),
      document: Yup.string().required('Obrigatório'),
      phone: Yup.string()
        .matches(phoneRegExp, 'Número de telefone inválido')
        .required('Obrigatório')
    }),
    onSubmit: async values => {
      setIsLoading(true)
      onClose()
      setIsLoading(false)
    }
  })

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={() => {
        formik.resetForm()
        onClose()
      }}
      finalFocusRef={btnRef}
      size={size}
    >
      <DrawerOverlay />
      <form
        onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit(e)
        }}
      >
        <DrawerContent>
          {isLoading && (
            <Box
              sx={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 2,
                cursor: 'not-allowed'
              }}
            >
              <Spinner size='xl' color='white' />
            </Box>
          )}
          <DrawerCloseButton />
          <DrawerHeader>Criar Usuário</DrawerHeader>

          <DrawerBody>
            <Stack gap={2}>
              <FormControl
                isInvalid={!(formik.errors.firstName == null) && formik.touched.firstName}
              >
                <Input
                  id='firstName'
                  name='firstName'
                  placeholder='Nome*'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!(formik.errors.lastName == null) && formik.touched.lastName}>
                <Input
                  id='lastName'
                  name='lastName'
                  placeholder='Sobrenome*'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!(formik.errors.email == null) && formik.touched.email}>
                <Input
                  id='email'
                  name='email'
                  placeholder='Email*'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!(formik.errors.password == null) && formik.touched.password}>
                <Input
                  id='password'
                  name='password'
                  placeholder='Senha*'
                  type='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!(formik.errors.permission == null) && formik.touched.permission}
              >
                <Select
                  id='permission'
                  name='permission'
                  placeholder='Permissão*'
                  value={JSON.stringify(formik.values.permission)}
                  onChange={formik.handleChange}
                >
                  <option value={0}>Leitura</option>
                  <option value={1}>Escrita</option>
                  <option value={2}>Adminstrador</option>
                </Select>
                <FormErrorMessage>{formik.errors.permission}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!(formik.errors.phone == null) && formik.touched.phone}>
                <Input
                  as={MaskedInput}
                  id='phone'
                  name='phone'
                  placeholder='Telefone*'
                  mask={[
                    '(',
                    /[1-9]/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/
                  ]}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!(formik.errors.document == null) && formik.touched.document}>
                <Input
                  id='document'
                  name='document'
                  placeholder='Documento*'
                  value={formik.values.document}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.document}</FormErrorMessage>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='brand' type='submit' variant='solid' w='100%'>
              Criar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  )
}
