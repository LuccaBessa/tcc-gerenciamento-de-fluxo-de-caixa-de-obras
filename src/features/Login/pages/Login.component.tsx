import {
  Box,
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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Banner from './assets/banner.webp';
import Logo from '../../../assets/logo.webp';

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Endereço de email inválido').required('Obrigatório'),
      password: Yup.string().required('Obrigatório'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Flex sx={{ height: '100%', backgroundColor: 'gray.100' }}>
      <Show above='lg'>
        <Image src={Banner} sx={{ width: '70%', objectFit: 'cover' }} />
      </Show>
      <Flex sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ width: '320px' }}>
          <CardHeader sx={{ display: 'flex', justifyContent: 'center' }}>
            <Image src={Logo} sx={{ width: '80%' }} />
          </CardHeader>
          <CardBody>
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
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
              <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
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
                type='submit'
                colorScheme='brand'
                width='full'
                onSubmit={() => formik.handleSubmit()}
              >
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};
