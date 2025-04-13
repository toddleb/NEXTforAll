// pages/features.tsx
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
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { 
  FaUserCircle, 
  FaChartPie, 
  FaRobot, 
  FaBrain, 
  FaRegComments,
  FaSwatchbook,
  FaPuzzlePiece,
  FaChartLine
} from 'react-icons/fa';

const featureCategories = [
  {
    title: "Assessment Features",
    icon: FaUserCircle,
    color: "purple.500",
    features: [
      {
        name: "NEXT eXpress Profile™",
        description: "A multidimensional assessment that identifies your core working style, traits, and strengths.",
      },
      {
        name: "Skill Domain Analysis",
        description: "A comprehensive analysis of your strengths across different skill domains based on your profile.",
      },
      {
        name: "Career Compatibility Mapping",
        description: "See which careers align best with your unique profile and strengths.",
      }
    ]
  },
  {
    title: "AI-Driven Matching",
    icon: FaBrain,
    color: "blue.500",
    features: [
      {
        name: "Intent Prediction Engine",
        description: "Advanced AI that analyzes behavior patterns to predict candidate intent and interest levels.",
      },
      {
        name: "Multi-factor Matching",
        description: "Matching algorithm that considers profile compatibility, skills, goals, and preferences.",
      },
      {
        name: "Continuous Learning",
        description: "System that improves over time as it learns from successful matches and outcomes.",
      }
    ]
  },
  {
    title: "Analytics & Insights",
    icon: FaChartLine,
    color: "green.500",
    features: [
      {
        name: "Conversion Analytics",
        description: "Track and optimize your candidate funnel from awareness to enrollment.",
      },
      {
        name: "Engagement Metrics",
        description: "Understand how candidates interact with your program information and outreach.",
      },
      {
        name: "Predictive Trends",
        description: "AI-driven forecasting of candidate interests and program potential.",
      }
    ]
  },
  {
    title: "Communication Tools",
    icon: FaRegComments,
    color: "orange.500",
    features: [
      {
        name: "Personalized Messaging",
        description: "Engagement tools that help you connect with candidates based on their specific interests and profile.",
      },
      {
        name: "Multi-channel Outreach",
        description: "Reach candidates through their preferred communication channels.",
      },
      {
        name: "Response Tracking",
        description: "Monitor engagement and response rates to optimize your communication strategy.",
      }
    ]
  }
];

const FeaturesPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Header */}
          <Box textAlign="center" mb={8}>
            <Heading size="2xl" mb={4}>Platform Features</Heading>
            <Text fontSize="xl" maxW="800px" mx="auto" color="gray.500">
              Discover the powerful features that make NEXT a comprehensive solution for career planning and talent matching.
            </Text>
          </Box>
          
          {/* Feature Categories */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {featureCategories.map((category, idx) => (
              <Box 
                key={idx} 
                bg={boxBg} 
                p={8} 
                borderRadius="lg" 
                borderWidth="1px"
                borderColor={borderColor}
                shadow="md"
              >
                <Flex align="center" mb={6}>
                  <Icon 
                    as={category.icon} 
                    boxSize={10} 
                    color={category.color} 
                    mr={4}
                  />
                  <Heading size="lg">{category.title}</Heading>
                </Flex>
                
                <Accordion allowToggle defaultIndex={[0]}>
                  {category.features.map((feature, featureIdx) => (
                    <AccordionItem key={featureIdx} border="none" mb={4}>
                      <AccordionButton 
                        p={4} 
                        borderRadius="md" 
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                      >
                        <Box flex="1" textAlign="left" fontWeight="bold">
                          {feature.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4} pt={4} px={4}>
                        <Text>{feature.description}</Text>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default FeaturesPage;