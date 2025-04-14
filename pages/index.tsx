// pages/index.tsx
import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  HStack,
  Image,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { MdSchool, MdMilitaryTech, MdBusinessCenter, MdPerson } from 'react-icons/md';

// Domain card configuration
const domainCards = [
  {
    icon: MdPerson,
    title: 'NEXT for Students',
    description: 'Discover your cosmic career path with personalized assessments',
    color: 'blue.500',
    href: '/student/dashboard',
  },
  {
    icon: MdSchool,
    title: 'NEXT for Programs',
    description: 'AI-powered candidate identification and scoring',
    color: 'purple.500',
    href: '/program/dashboard',
  },
  {
    icon: MdMilitaryTech,
    title: 'NEXT for Military',
    description: 'Connect service members with the right opportunities',
    color: 'green.500',
    href: '/military/dashboard',
  },
  {
    icon: MdBusinessCenter,
    title: 'NEXT for Agencies',
    description: 'Optimize talent pipelines with predictive intelligence',
    color: 'orange.400',
    href: '/agency/dashboard',
  },
];

// Assessment features
const assessmentFeatures = [
  {
    question: "What's my core working/learning style?",
    answer: "NEXT Profile Type",
    icon: "→"
  },
  {
    question: "What traits influence how I operate?",
    answer: "NEXT Modifiers",
    icon: "→"
  },
  {
    question: "Where are my strengths?",
    answer: "NEXT Skill Domains",
    icon: "→"
  },
];

const HomePage: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.900');
  const heroBg = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const purpleColor = "#a14793"; // Specific purple color from logo
  const logoGradient = "linear(to-r, #a14793, #3182CE)"; // Purple to blue gradient

  return (
    <Box>
      {/* Hero Section with Gradient Background */}
      <Box bgGradient="linear(to-r, purple.500, blue.500)" pt={12} pb={12} color="white">
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column-reverse', lg: 'row' }}
            align="center" 
            justify="space-between"
            gap={8}
          >
            {/* Hero Image/Mockup - Positioned to center above the N in NEXT for ALL */}
            <Box 
              maxW={{ base: "250px", md: "300px" }}
              alignSelf={{ base: "center", lg: "flex-start" }}
              order={{ base: 2, lg: 1 }}
              ml={{ lg: "16%" }}  
              position="relative"
            >
              <Image 
                src="/images/phone-mockup.png" 
                alt="NEXT platform on mobile" 
                fallbackSrc="https://via.placeholder.com/300x500?text=NEXT+App"
                boxShadow="2xl"
                borderRadius="xl"
              />
            </Box>
            
            {/* Text content - Now on the right */}
            <VStack 
              spacing={6} 
              align={{ base: "center", lg: "center" }} 
              maxW="700px"
              textAlign={{ base: "center", lg: "center" }}
              order={{ base: 1, lg: 2 }}
            >
              
              {/* Logo - Centered above text - CHANGED: made logo larger */}
              <Box 
                px={1} 
                py={1} 
                mb={4} 
                width="100%" 
                display="flex" 
                justifyContent={{ base: "center", lg: "center" }}
              >
                <Image 
                  src="/images/next-logo-white.png" 
                  alt="NEXT"
                  height="100px" // CHANGED: increased from 80px to 100px
                  fallbackSrc="https://via.placeholder.com/200x100?text=NEXT"
                />
              </Box>
              
              <Heading 
                as="h2" 
                size="xl" 
                fontWeight="medium"
                lineHeight="1.2"
              >
                {/* CHANGED: "Evolve" to "Engage" */}
                <Box as="span" fontWeight="bold" textDecoration="underline">N</Box>avigate.{' '}
                <Box as="span" fontWeight="bold" textDecoration="underline">E</Box>ngage.{' '}
                e<Box as="span" fontWeight="bold" textDecoration="underline">X</Box>plore.{' '}
                <Box as="span" fontWeight="bold" textDecoration="underline">T</Box>ransform.
              </Heading>
              
              <Text fontSize="xl" maxW="600px">
                The AI-powered platform connecting students, programs, agencies, and military 
                with personalized paths to success.
              </Text>
              
              <HStack spacing={4} mt={4}>
                {/* CHANGED: Removed Learn More button, kept only Get Started */}
                <Button 
                  as={NextLink} 
                  href="/login" 
                  size="lg"
                  colorScheme="whiteAlpha" 
                  rightIcon={<FaArrowRight />}
                  _hover={{ bg: 'whiteAlpha.300' }}
                >
                  Get Started
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* Domain Cards Section */}
      <Box py={16} id="learn-more" bg={bg}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            {/* CHANGED: Made logo and heading in same HStack */}
            <HStack spacing={4} justifyContent="center" alignItems="center">
              <Image 
                src="/images/next-logo-gradient.png" 
                alt="NEXT"
                height="60px"
                fallbackSrc="https://via.placeholder.com/150x60?text=NEXT"
              />
              <Heading size="xl">One Platform, Many Domains</Heading>
            </HStack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {domainCards.map((domain, index) => (
                <Box
                  key={index}
                  bg={cardBg}
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                >
                  <Box bg={domain.color} h="8px" />
                  <Box p={6}>
                    <VStack align="start" spacing={4}>
                      <Icon 
                        as={domain.icon} 
                        boxSize={8} 
                        color={domain.color} 
                      />
                      
                      <Heading size="md">{domain.title}</Heading>
                      
                      <Text fontSize="sm" color="gray.500" flex="1">
                        {domain.description}
                      </Text>
                      
                      <Button 
                        as={NextLink}
                        href={domain.href}
                        colorScheme={domain.color.split('.')[0]}
                        rightIcon={<FaArrowRight />}
                        size="sm"
                        w="full"
                      >
                        Explore
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      
      {/* NEXT eXpress Assessment Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column', lg: 'row' }}
            align="center" 
            justify="space-between"
            gap={12}
          >
            <VStack align="flex-start" spacing={6} maxW="600px">
              <VStack align="flex-start" spacing={2}>
                <Heading color={purpleColor} size="lg">
                  NEXT eXpress Assessments™
                </Heading>
                <Heading as="h2" size="xl" lineHeight="1.2">
                  A multidimensional career assessment framework
                </Heading>
              </VStack>
              
              <Text fontSize="lg" color={textColor}>
                Helps individuals identify how they learn, work, and grow—answering three essential questions:
              </Text>
              
              <VStack align="flex-start" spacing={4} pl={4} width="100%">
                {assessmentFeatures.map((feature, idx) => (
                  <Box key={idx} width="100%">
                    <HStack align="flex-start" spacing={3}>
                      <Text fontSize="xl" fontWeight="bold" color="gray.500">•</Text>
                      <VStack align="flex-start" spacing={1}>
                        <Text fontSize="xl" fontWeight="medium">{feature.question}</Text>
                        <HStack>
                          <Text fontSize="md" color="gray.500">{feature.icon}</Text>
                          <Text fontWeight="medium" color={purpleColor}>{feature.answer}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
                
                <Box pt={2}>
                  <HStack align="flex-start" spacing={3}>
                    <Text fontSize="xl" fontWeight="bold" color="gray.500">•</Text>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontSize="xl" fontWeight="medium">The result is a</Text>
                      <Text fontWeight="bold" color={purpleColor} fontSize="xl">NEXT eXpress Profile™</Text>
                      <Text>—a visual, actionable identity that powers personalized pathways across the NEXT platform.</Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>
              
              <Button 
                size="lg" 
                mt={4} 
                colorScheme="purple" 
                rightIcon={<FaArrowRight />}
                as={NextLink}
                href="/assessment-login"
              >
                Take Your Assessment
              </Button>
            </VStack>
            
            {/* Assessment Visual */}
            <Box 
              maxW={{ base: "320px", md: "450px" }}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="xl"
            >
              <Image 
                src="/images/next-express-profile.png" 
                alt="NEXT eXpress Assessment Profile"
                fallbackSrc="https://via.placeholder.com/450x500?text=Assessment+Profile"
                borderRadius="lg"
              />
            </Box>
          </Flex>
        </Container>
      </Box>
      
      {/* Call to Action */}
      <Box py={16}>
        <Container maxW="container.lg">
          <VStack 
            spacing={8} 
            bgGradient="linear(to-r, purple.600, blue.600)"
            color="white" 
            p={10}
            borderRadius="lg"
            textAlign="center"
            boxShadow="xl"
          >
            <Heading size="xl">Ready to Find Your NEXT?</Heading>
            <Text fontSize="lg" maxW="700px">
              Whether you're a student discovering your path or a program finding ideal candidates,
              NEXT is ready for you.
            </Text>
            
            <HStack spacing={6}>
              <Button 
                as={NextLink} 
                href="/login" 
                size="lg"
                colorScheme="whiteAlpha"
                rightIcon={<FaArrowRight />}
              >
                Platform Login
              </Button>
              
              {/* CHANGED: Made the Assessment Login button highlighted with a different color */}
              <Button 
                as={NextLink} 
                href="/assessment-login" 
                size="lg"
                colorScheme="purple" // Changed from outline to purple colorScheme
                rightIcon={<FaArrowRight />}
              >
                Assessment Login
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;