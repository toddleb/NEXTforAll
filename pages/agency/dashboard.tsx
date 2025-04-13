// pages/agency/dashboard.tsx
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaArrowLeft, FaBuilding } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AgencyDashboard: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Navbar />
      <Box bg={bgColor} minH="100vh" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Box textAlign="center" mb={10}>
              <Heading size="xl" mb={4}>NEXT for Agencies Dashboard</Heading>
              <Text fontSize="lg" color="gray.500">
                Optimize talent pipelines with predictive intelligence
              </Text>
            </Box>
            
            {/* Placeholder content */}
            <Box 
              p={10} 
              bg={cardBg} 
              borderRadius="lg" 
              shadow="md" 
              textAlign="center"
            >
              <Icon as={FaBuilding} boxSize={16} color="orange.500" mb={6} />
              <Heading size="lg" mb={4}>Coming Soon</Heading>
              <Text mb={6}>
                We're working hard to build your agency talent dashboard experience.
                Check back soon for updates!
              </Text>
              <Button 
                as={NextLink} 
                href="/" 
                colorScheme="orange" 
                leftIcon={<FaArrowLeft />}
              >
                Back to Home
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AgencyDashboard;