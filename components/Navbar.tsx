// components/Navbar.tsx
import React from 'react';
import {
  Box,
  Flex,
  Button,
  Link,
  useColorModeValue,
  useColorMode,
  Container,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      position="sticky" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={1000} 
      bg={bg} 
      boxShadow="sm"
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      transition="all 0.3s ease"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Link 
            as={NextLink} 
            href="/"
            _hover={{ textDecoration: 'none' }}
          >
            {/* Logo placeholder */}
            <Image 
              src="/images/next-logo-gradient.png" 
              alt="NEXT" 
              height="40px"
              fallbackSrc="https://via.placeholder.com/120x40?text=NEXT"
            />
          </Link>

          {/* Right side actions */}
          <Flex align="center">
            {/* Theme Toggle */}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              mr={3}
              size="md"
            />
            
            {/* Login Button */}
            <Button
              as={NextLink}
              href="/login"
              size="sm"
              fontWeight={600}
              colorScheme="purple"
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;