import { ChakraProvider, Container, extendTheme } from '@chakra-ui/react';
import { Contacts } from './containers';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/400.css';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans'
  },
  colors: {
    brand: {
      100: '#f7fafc',
      900: '#1a202c'
    },
    mainBlue: {
      500: '#1874BB',
      300: '#0F82C1'
    },
    mainGreen: {
      100: '#CFD9D9',
      200: '#4FB7BE',
      300: '#4FB7BE',
      400: '#4FB7BE',
      500: '#6cc0c5',
      600: '#4FB7BE',
      700: '#4FB7BE',
      800: '#4FB7BE',
      900: '#4FB7BE'
    },
    mainSecondary: {
      100: '#d8e1e5',
      200: '#AFC2C4',
      500: '#424B43'
    }
  },
  styles: {
    global: {
      th: {
        color: 'white !important',
        border: 'none !important',
        fontSize: '16px !important',
        fontWeight: 'normal !important',
        textTransform: 'none !important'
      },
      td: {
        borderColor: '#AFC2C4 !important'
      }
    }
  }
});

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container
        bg="mainBlue.300"
        display="flex"
        justifyContent="center"
        alignItems="center"
        maxW="100vw"
        h="100vh">
        <Contacts />
      </Container>
    </ChakraProvider>
  );
}

export default App;
