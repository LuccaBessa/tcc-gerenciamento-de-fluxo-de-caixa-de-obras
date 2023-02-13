import { ChakraProvider } from '@chakra-ui/react';
import { Router } from './features/routes/Router.component';

export const App = () => {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
};
