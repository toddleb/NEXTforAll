// components/layout/DashboardPanel.tsx
import React from 'react';
import { 
  Box, 
  VStack, 
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react';
import { 
  FaChartBar, 
  FaUserFriends, 
  FaBrain, 
  FaRocket,
  FaInbox
} from 'react-icons/fa';

// Import the metrics section with updated path
import MetricsSection from '@/components/layout/MetricsSection';
import AnalyticsPanel from '@/components/common/AnalyticsPanel';
import ApplicantSection from '@/components/layout/ApplicantSection';

// Sample applicant data
const SAMPLE_APPLICANTS = [
  {
    id: '1',
    blindId: 'CAND-1092',
    name: 'Jane Smith',
    matchScore: 92,
    program: 'Computer Science',
    activity: '2 days ago',
    intent: 'high',
    isRevealed: true,
    skills: ['JavaScript', 'React', 'Node.js'],
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    blindId: 'CAND-2385',
    name: 'Michael Johnson',
    matchScore: 87,
    program: 'Data Science',
    activity: '5 days ago',
    intent: 'very-high',
    isRevealed: true,
    skills: ['Python', 'Machine Learning', 'SQL'],
    location: 'Boston, MA'
  },
  {
    id: '3',
    blindId: 'CAND-3721',
    matchScore: 76,
    program: 'Cybersecurity',
    activity: '1 week ago',
    intent: 'medium',
    isRevealed: false
  },
  {
    id: '4',
    blindId: 'CAND-4932',
    matchScore: 81,
    program: 'AI / Machine Learning',
    activity: '3 days ago',
    intent: 'high',
    isRevealed: false
  },
  {
    id: '5',
    blindId: 'CAND-5128',
    name: 'Emily Davis',
    matchScore: 94,
    program: 'Software Engineering',
    activity: 'Today',
    intent: 'very-high',
    isRevealed: true,
    skills: ['Java', 'Spring', 'AWS'],
    location: 'Seattle, WA'
  },
  {
    id: '6',
    blindId: 'CAND-6472',
    matchScore: 72,
    program: 'Computer Science',
    activity: '2 weeks ago',
    intent: 'medium',
    isRevealed: false
  },
  {
    id: '7',
    blindId: 'CAND-7823',
    name: 'Robert Wilson',
    matchScore: 85,
    program: 'Data Science',
    activity: '4 days ago',
    intent: 'high',
    isRevealed: true,
    skills: ['R', 'Statistics', 'Tableau'],
    location: 'Chicago, IL'
  },
  {
    id: '8',
    blindId: 'CAND-8294',
    matchScore: 79,
    program: 'Cybersecurity',
    activity: '1 week ago',
    intent: 'medium',
    isRevealed: false
  }
];

interface DashboardPanelProps {
  userType: 'program' | 'military' | 'agency';
  filteredCandidates: any[];
}

export default function DashboardPanel({
  userType,
  filteredCandidates
}: DashboardPanelProps) {
  // Dashboard state
  const [activeTab, setActiveTab] = React.useState(0);
  
  // Colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const tabBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Use our sample applicants data if no candidates are provided
  const applicantsData = filteredCandidates && filteredCandidates.length > 0 
    ? filteredCandidates 
    : SAMPLE_APPLICANTS;
  
  // Placeholder program ID - in a real app, you'd get this from props or context
  const programId = 'demo-program-id';
  
  // Tab configuration
  const tabs = [
    { 
      name: 'Overview', 
      icon: FaChartBar, 
      content: (
        <VStack spacing={6} align="stretch">
          {/* Metrics Section */}
          <MetricsSection programId={programId} />
          
          {/* Analytics Panel */}
          <AnalyticsPanel initialView="combined" />
          
          {/* Applicants Panel (condensed view) */}
          <ApplicantSection 
            userType={userType}
            filteredCandidates={applicantsData}
          />
        </VStack>
      ) 
    },
    { 
      name: 'Applicants', 
      icon: FaUserFriends, 
      content: (
        <VStack spacing={6} align="stretch" mt={6}>
          {/* Full Applicants Section */}
          <ApplicantSection 
            userType={userType}
            filteredCandidates={applicantsData}
          />
        </VStack>
      ) 
    },
    { 
      name: 'Analytics', 
      icon: FaBrain, 
      content: (
        <VStack spacing={6} align="stretch" mt={6}>
          <AnalyticsPanel initialView="combined" />
        </VStack>
      ) 
    },
    { 
      name: 'Campaigns', 
      icon: FaRocket, 
      content: (
        <VStack spacing={6} align="stretch" mt={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            height="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" align="center">
              <Icon as={FaRocket} boxSize={12} color="purple.400" mb={4} />
              <Box textAlign="center">
                <Box fontSize="lg" fontWeight="bold" mb={2}>Campaigns Module</Box>
                <Box maxW="400px" color="gray.500">
                  Create and manage recruitment campaigns, outreach initiatives, and marketing efforts.
                </Box>
              </Box>
            </Flex>
          </Box>
        </VStack>
      ) 
    },
    { 
      name: 'Messages', 
      icon: FaInbox, 
      content: (
        <VStack spacing={6} align="stretch" mt={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            height="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" align="center">
              <Icon as={FaInbox} boxSize={12} color="purple.400" mb={4} />
              <Box textAlign="center">
                <Box fontSize="lg" fontWeight="bold" mb={2}>Messages Module</Box>
                <Box maxW="400px" color="gray.500">
                  Manage all communications with prospective applicants and current candidates.
                </Box>
              </Box>
            </Flex>
          </Box>
        </VStack>
      ) 
    },
  ];

  return (
    <Box flex="1" overflowY="auto" p={6} bg={bgColor}>
      {/* Tab Navigation */}
      <Tabs
        index={activeTab}
        onChange={setActiveTab}
        variant="enclosed"
        colorScheme="purple"
        isLazy
      >
        <TabList>
          {tabs.map((tab, index) => (
            <Tab 
              key={index} 
              bg={activeTab === index ? tabBg : 'transparent'}
              borderTopRadius="lg"
              borderBottomColor={activeTab === index ? 'transparent' : borderColor}
              borderWidth="1px"
              borderColor={activeTab === index ? borderColor : 'transparent'}
              borderBottomWidth={activeTab === index ? 0 : '1px'}
              mb="-1px"
              py={3}
              fontWeight="medium"
              _selected={{ 
                color: 'purple.500', 
                borderColor: borderColor,
                borderBottomColor: 'transparent'
              }}
            >
              <Icon as={tab.icon} mr={2} />
              {tab.name}
            </Tab>
          ))}
        </TabList>

        <Box 
          borderWidth="1px" 
          borderColor={borderColor} 
          borderTopRadius="none" 
          borderBottomRadius="lg"
          bg={tabBg}
          p={0} // Changed to 0 to let the content control its own padding
        >
          <TabPanels>
            {tabs.map((tab, index) => (
              <TabPanel key={index} p={0}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Box>
      </Tabs>
    </Box>
  );
}