// components/Footer.tsx
import React from 'react';
import {
  Box,
  Container,
  Text,
  Link,
  Stack,
  Flex,
  Heading,
  useColorModeValue,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Divider,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.500', 'gray.400');
  const footerHeadingColor = useColorModeValue('gray.700', 'white');

  return (
    <Box
      bg={bg}
      color={textColor}
      borderTopWidth={1}
      borderColor={borderColor}
    >
      <Container maxW="container.xl" py={10}>
        <SimpleGrid 
          templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          {/* Company Info */}
          <VStack align="start" spacing={4}>
            <Image 
              src="/images/next-logo-gradient.png" 
              alt="NEXT" 
              height="40px"
              fallbackSrc="https://via.placeholder.com/120x40?text=NEXT"
            />
            <Text maxW="300px">
              The AI-powered platform connecting students, programs, agencies, and military with personalized paths to success.
            </Text>
            <HStack spacing={4}>
              <Link href="https://twitter.com" isExternal>
                <Icon as={FaTwitter} boxSize={5} />
              </Link>
              <Link href="https://linkedin.com" isExternal>
                <Icon as={FaLinkedin} boxSize={5} />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <Icon as={FaInstagram} boxSize={5} />
              </Link>
            </HStack>
          </VStack>
          
          {/* Solutions */}
          <VStack align="start" spacing={3}>
            <Heading size="sm" color={footerHeadingColor} mb={2}>
              Solutions
            </Heading>
            <Link as={NextLink} href="/student/dashboard">For Students</Link>
            <Link as={NextLink} href="/program/dashboard">For Programs</Link>
            <Link as={NextLink} href="/military/dashboard">For Military</Link>
            <Link as={NextLink} href="/agency/dashboard">For Agencies</Link>
          </VStack>
          
          {/* Company */}
          <VStack align="start" spacing={3}>
            <Heading size="sm" color={footerHeadingColor} mb={2}>
              Company
            </Heading>
            <Link as={NextLink} href="/about">About Us</Link>
            <Link as={NextLink} href="/features">Features</Link>
            <Link as={NextLink} href="/contact">Contact</Link>
          </VStack>
          
          {/* Legal */}
          <VStack align="start" spacing={3}>
            <Heading size="sm" color={footerHeadingColor} mb={2}>
              Legal
            </Heading>
            <Link as={NextLink} href="/terms">Terms of Service</Link>
            <Link as={NextLink} href="/privacy">Privacy Policy</Link>
            <Link as={NextLink} href="/cookies">Cookie Policy</Link>
          </VStack>
        </SimpleGrid>
      </Container>
      
      {/* Copyright and Powered by Section */}
      <Box borderTopWidth={1} borderColor={borderColor} py={4}>
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={3}
          >
            <Text fontSize="sm">
              © {new Date().getFullYear()} NEXT. All rights reserved.
            </Text>
            <Flex align="center" gap={2}>
              <Text fontSize="sm">Powered by</Text>
              <Image 
                src="/images/prizym-logo.png" 
                alt="Prizym.ai" 
                height="24px"
                fallbackSrc="https://via.placeholder.com/80x24?text=Prizym.ai"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;