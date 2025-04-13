// pages/_app.tsx
import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define basic theme
const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  colors: {
    purple: {
      500: "#805AD5",
    },
    blue: {
      500: "#3182CE", 
    },
  },
});

// Routes where navigation should be hidden
const noNavigationRoutes = [
  '/login',
  '/assessment-login',
  '/student/dashboard',
  '/program/dashboard', 
  '/military/dashboard',
  '/agency/dashboard'
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Determine if we should show navigation
  const hideNavigation = noNavigationRoutes.some(route => 
    router.pathname === route || router.pathname.startsWith(`${route}/`)
  );
  
  const showNavigation = !hideNavigation;
  
  return (
    <ChakraProvider theme={theme}>
      {showNavigation && <Navbar />}
      <Component {...pageProps} />
      {showNavigation && <Footer />}
    </ChakraProvider>
  );
}

export default MyApp;