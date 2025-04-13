// pages/solutions.tsx
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Flex,
  Card,
  CardBody,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdSchool, MdMilitaryTech, MdBusinessCenter, MdPerson } from 'react-icons/md';

const solutions = [
  {
    title: 'Student Solution',
    description: 'Personalized career guidance and program matching based on your unique NEXT eXpress Profile™.',
    icon: MdPerson,
    color: 'blue.500',
    features: [
      'AI-powered career path suggestions',
      'Personalized program recommendations',
      'Self-discovery through NEXT eXpress Assessment™',
      'Direct connections with matched programs'
    ]
  },
  {
    title: 'Program Solution',
    description: 'Identify, engage, and convert high-intent candidates with precision using AI-driven tools.',
    icon: MdSchool,
    color: 'purple.500',
    features: [
      'Advanced candidate matching algorithm',
      'Intent scoring and tracking',
      'Engagement dashboard and analytics',
      'Seamless messaging and communication'
    ]
  },
  {
    title: 'Military Solution',
    description: 'Specialized tools to help service members transition to civilian careers or educational opportunities.',
    icon: MdMilitaryTech,
    color: 'green.500',
    features: [
      'Military skill translation to civilian opportunities',
      'GI Bill and benefit optimization',
      'Transition timeline planning',
      'Veteran-friendly program matching'
    ]
  },
  {
    title: 'Agency Solution',
    description: 'Optimize your talent pipeline with advanced analytics and predictive matching.',
    icon: MdBusinessCenter,
    color: 'orange.500',
    features: [
      'Aggregate talent pool insights',
      'Multi-program candidate management',
      'Conversion optimization tools',
      'Advanced reporting and forecasting'
    ]
  }
];

const SolutionsPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Header */}
          <Box textAlign="center" mb={8}>
            <Heading size="2xl" mb={4}>Our Solutions</Heading>
            <Text fontSize="xl" maxW="800px" mx="auto" color="gray.500">
              NEXT offers tailored solutions for every stakeholder in the educational and career ecosystem.
            </Text>
          </Box>
          
          {/* Solutions Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {solutions.map((solution, index) => (
              <Card key={index} bg={cardBg} overflow="hidden" variant="outline">
                <CardBody>
                  <Flex gap={4} align="start">
                    <Box>
                      <Icon 
                        as={solution.icon} 
                        boxSize={10} 
                        color={solution.color} 
                        mt={1}
                      />
                    </Box>
                    
                    <Stack spacing={4} flex="1">
                      <Heading size="md" color={solution.color}>
                        {solution.title}
                      </Heading>
                      
                      <Text>{solution.description}</Text>
                      
                      <VStack align="start" spacing={2}>
                        <Text fontWeight="bold">Key Features:</Text>
                        {solution.features.map((feature, idx) => (
                          <Text key={idx} pl={4} position="relative" fontSize="sm">
                            <Box
                              position="absolute"
                              left="0"
                              top="8px"
                              w="2px"
                              h="2px"
                              bg={solution.color}
                              borderRadius="full"
                            />
                            {feature}
                          </Text>
                        ))}
                      </VStack>
                    </Stack>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default SolutionsPage;