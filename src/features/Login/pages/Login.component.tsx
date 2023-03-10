import { type ReactElement, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Show,
  useToast
} from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Logo from '@/assets/logo.webp'

import { auth } from '../services'

import Banner from './assets/banner.webp'

export const Login = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Endereço de email inválido').required('Obrigatório'),
      password: Yup.string().required('Obrigatório')
    }),
    onSubmit: async values => {
      setIsLoading(true)

      try {
        await signInWithEmailAndPassword(auth, values.email, values.password)
      } catch (error) {
        toast({
          title: 'Erro ao fazer login',
          description: 'Favor verificar suas credenciais de acesso',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <Flex sx={{ height: '100%', width: '100%', backgroundColor: 'gray.100' }}>
      <Show above='lg'>
        <Image src={Banner} sx={{ width: '70%', objectFit: 'cover' }} />
      </Show>
      <Flex sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <Card sx={{ width: '320px' }}>
          <CardHeader sx={{ display: 'flex', justifyContent: 'center' }}>
            <Image src={Logo} sx={{ width: '80%' }} />
          </CardHeader>
          <CardBody>
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <FormControl isInvalid={!(formik.errors.email == null) && formik.touched.email}>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!(formik.errors.password == null) && formik.touched.password}>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='*******'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isLoading}
                type='submit'
                colorScheme='brand'
                width='full'
                onSubmit={() => {
                  formik.handleSubmit()
                }}
              >
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  )
}
