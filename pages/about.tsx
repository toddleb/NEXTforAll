// pages/about.tsx
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Flex,
  useColorModeValue,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

// Team members data
const teamMembers = [
  {
    name: "Todd LeBaron",
    title: "CEO & Founder",
    bio: "With over 25 years in AI, Sales and Planning Systems, Todd founded NEXT to revolutionize how students find their true path and how programs use advanced lead generation techniques to find the right candidates.",
    imageSrc: "/images/team/Todd.png"
  },
  {
    name: "Zach Collier",
    title: "Chief Product Officer",
    bio: "A veteran builder and entrepreneur, Zach has co-founded multiple companies and created software used by millions, with experience spanning development, design, and team leadership, he excels at helping teams build better products faster to delight users.",
    imageSrc: "/images/team/Zach.png"
  },
  {
    name: "Mike Guzman",
    title: "Head of Sales",
    bio: "Mike is a natural galvanizer who builds high-performing teams. His data-driven approach and discerning eye for opportunities make him exceptional at connecting NEXT's innovative solutions with the institutions that need them most.",
    imageSrc: "/images/team/Mike.png"
  }
];

const AboutPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const quoteColor = useColorModeValue('purple.500', 'purple.300');

  return (
    <Box bg={bgColor} py={12}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          {/* Mission Section */}
          <Box textAlign="center">
            <Heading size="2xl" mb={4}>Our Mission</Heading>
            <Text fontSize="xl" maxW="800px" mx="auto" color="gray.500" mb={8}>
              Empowering individuals to discover their unique potential and connecting them with opportunities that align with their true capabilities.
            </Text>
            
            <Box 
              mx="auto" 
              maxW="3xl" 
              p={8} 
              borderRadius="lg" 
              bg={boxBg}
              borderWidth="1px"
              borderColor={borderColor}
              position="relative"
            >
              <Icon 
                as={FaQuoteLeft} 
                position="absolute" 
                top={4} 
                left={4} 
                boxSize={8} 
                color={quoteColor} 
                opacity={0.2} 
              />
              
              <Text fontSize="2xl" fontStyle="italic" px={10}>
                We believe that everyone has unique strengths and working styles that should be celebrated and matched with the right opportunities. Our platform uses AI and data science to create a world where career decisions are based on true capability and potential, not just resumes and interviews.
              </Text>
              
              <Icon 
                as={FaQuoteRight} 
                position="absolute" 
                bottom={4} 
                right={4} 
                boxSize={8} 
                color={quoteColor} 
                opacity={0.2} 
              />
            </Box>
          </Box>
          
          {/* Story Section */}
          <Box>
            <Flex 
              direction={{ base: 'column', lg: 'row' }}
              align="center"
              gap={10}
            >
              <Box flex="1">
                <Heading size="xl" mb={4}>Our Story</Heading>
                <Text fontSize="lg" mb={4}>
                  NEXT began with a simple observation: the traditional ways of matching students to educational and career opportunities weren't working well for anyone involved.
                </Text>
                <Text fontSize="lg" mb={4}>
                  Students were making life-changing decisions with limited information. Programs were struggling to identify truly compatible candidates. Military personnel faced challenges transitioning to civilian careers.
                </Text>
                <Text fontSize="lg">
                  Founded in 2024, NEXT set out to create a multidimensional platform that looks beyond grades and test scores to identify the unique working style, traits, and strengths of each individual. By combining advanced assessment methodologies with cutting-edge AI, we've built a platform that creates meaningful connections between students and opportunities.
                </Text>
              </Box>
              
              <Box 
                flex="1" 
                maxW={{ base: "100%", lg: "500px" }}
                borderRadius="lg"
                overflow="hidden"
                shadow="xl"
              >
                <Image 
                  src="/images/about/team-working.jpg" 
                  alt="NEXT team working"
                  w="100%"
                  fallbackSrc="https://via.placeholder.com/800x600?text=Our+Story"
                />
              </Box>
            </Flex>
          </Box>
          
          <Divider />
          
          {/* Team Section */}
          <Box>
            <Heading size="xl" mb={8} textAlign="center">Leadership Team</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {teamMembers.map((member, idx) => (
                <Box 
                  key={idx} 
                  bg={boxBg} 
                  p={6} 
                  borderRadius="lg" 
                  borderWidth="1px"
                  borderColor={borderColor}
                  shadow="md"
                  textAlign="center"
                >
                  <Image 
                    src={member.imageSrc} 
                    alt={member.name}
                    borderRadius="full"
                    boxSize="150px"
                    mx="auto"
                    mb={4}
                    fallbackSrc={`https://via.placeholder.com/150?text=${member.name.split(' ').map(n => n[0]).join('')}`}
                  />
                  <Heading size="md" mb={1}>{member.name}</Heading>
                  <Text color="purple.500" fontWeight="medium" mb={3}>{member.title}</Text>
                  <Text fontSize="sm">{member.bio}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;