// components/layout/RightSidebar.tsx
import React from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Divider, 
  Button, 
  Progress,
  Avatar,
  Flex,
  useColorModeValue,
  Icon,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react';
import { 
  FaBullseye, 
  FaBell, 
  FaRocket, 
  FaChartLine,
  FaUsers,
  FaUserGraduate,
  FaRegClock
} from 'react-icons/fa';
import { InfoIcon, ExternalLinkIcon } from '@chakra-ui/icons';

interface RightSidebarProps {
  userType: 'program' | 'military' | 'agency';
  programData?: any;
  insightsData?: any;
  isAiChatVisible?: boolean;
  setIsAiChatVisible?: (visible: boolean) => void;
}

export default function RightSidebar({ 
  userType,
  programData,
  insightsData,
  isAiChatVisible,
  setIsAiChatVisible
}: RightSidebarProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.700', 'gray.50');
  
  const notifications = [
    {
      title: '5 new high-intent candidates',
      time: '2h ago',
      type: 'candidates',
      icon: FaUsers,
      color: 'green'
    },
    {
      title: 'Application deadline approaching',
      time: '1d ago',
      type: 'reminder',
      icon: FaRegClock,
      color: 'orange'
    },
    {
      title: 'AI detected new engagement pattern',
      time: '3d ago',
      type: 'insight',
      icon: FaChartLine,
      color: 'blue'
    },
  ];
  
  const goals = [
    { name: 'Enrollment Target', current: 76, target: 100, unit: 'students', progress: 76 },
    { name: 'Outreach Goal', current: 145, target: 200, unit: 'contacts', progress: 72 },
  ];
  
  const recommendedActions = [
    { action: 'Contact 8 high-intent candidates', priority: 'high' },
    { action: 'Review 12 new applications', priority: 'medium' },
    { action: 'Update program description', priority: 'low' },
  ];

  return (
    <Box 
      w="280px" 
      bg={bgColor}
      borderLeftWidth="1px"
      borderColor={borderColor}
      overflowY="auto"
    >
      {/* Program Insights */}
      <Box p={4} mb={2}>
        <Text fontSize="xs" fontWeight="medium" color={textColor} letterSpacing="wider" mb={3}>
          PROGRAM INSIGHTS
        </Text>
        
        <VStack spacing={3} align="stretch" mb={4}>
          <Box 
            bg={cardBg} 
            borderRadius="md" 
            p={3} 
            shadow="sm" 
            borderWidth="1px" 
            borderColor={borderColor}
          >
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="medium" color={headingColor}>Leads Conversion</Text>
              <InfoIcon boxSize={3} color="gray.400" />
            </HStack>
            <Stat>
              <StatNumber fontSize="lg">37.2%</StatNumber>
              <StatHelpText mb={0}>
                <StatArrow type="increase" />
                4.3% vs. last month
              </StatHelpText>
            </Stat>
          </Box>
          
          <Box 
            bg={cardBg} 
            borderRadius="md" 
            p={3} 
            shadow="sm" 
            borderWidth="1px" 
            borderColor={borderColor}
          >
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="medium" color={headingColor}>Top Program</Text>
              <InfoIcon boxSize={3} color="gray.400" />
            </HStack>
            <Text fontSize="lg" fontWeight="medium">Data Science</Text>
            <Text fontSize="sm" color={textColor}>34 high-intent leads</Text>
          </Box>
        </VStack>
      </Box>
      
      <Divider mb={4} />
      
      {/* Goals Section */}
      <Box px={4} mb={4}>
        <Text fontSize="xs" fontWeight="medium" color={textColor} letterSpacing="wider" mb={3}>
          GOALS
        </Text>
        
        <VStack spacing={4} align="stretch">
          {goals.map((goal, idx) => (
            <Box key={idx}>
              <HStack justify="space-between" mb={1}>
                <Text fontSize="sm" fontWeight="medium">{goal.name}</Text>
                <HStack>
                  <Badge colorScheme="purple">{goal.current}</Badge>
                  <Text fontSize="xs" color={textColor}>/ {goal.target}</Text>
                </HStack>
              </HStack>
              <Progress 
                value={goal.progress} 
                size="sm" 
                colorScheme="purple" 
                borderRadius="full" 
                mb={1}
              />
              <Text fontSize="xs" color={textColor}>{goal.unit}</Text>
            </Box>
          ))}
          
          <Button 
            size="xs" 
            variant="outline" 
            leftIcon={<Icon as={FaBullseye} />} 
            alignSelf="flex-start"
          >
            Manage Goals
          </Button>
        </VStack>
      </Box>
      
      <Divider mb={4} />
      
      {/* Notifications */}
      <Box px={4} mb={4}>
        <HStack justify="space-between" mb={3}>
          <Text fontSize="xs" fontWeight="medium" color={textColor} letterSpacing="wider">
            NOTIFICATIONS
          </Text>
          <Badge colorScheme="red" variant="solid" borderRadius="full">
            {notifications.length}
          </Badge>
        </HStack>
        
        <VStack spacing={3} align="stretch">
          {notifications.map((notification, idx) => (
            <HStack 
              key={idx} 
              bg={cardBg} 
              p={3} 
              borderRadius="md" 
              borderWidth="1px"
              borderColor={borderColor}
              cursor="pointer"
              _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
            >
              <Flex 
                p={2} 
                borderRadius="md" 
                bg={`${notification.color}.100`} 
                color={`${notification.color}.700`}
              >
                <Icon as={notification.icon} boxSize={4} />
              </Flex>
              
              <Box flex="1">
                <Text fontSize="sm" fontWeight="medium">{notification.title}</Text>
                <Text fontSize="xs" color={textColor}>{notification.time}</Text>
              </Box>
            </HStack>
          ))}
          
          <Button 
            size="xs" 
            variant="outline" 
            leftIcon={<Icon as={FaBell} />} 
            alignSelf="flex-start"
          >
            View All
          </Button>
        </VStack>
      </Box>
      
      <Divider mb={4} />
      
      {/* Recommended Actions */}
      <Box px={4} mb={4}>
        <Text fontSize="xs" fontWeight="medium" color={textColor} letterSpacing="wider" mb={3}>
          RECOMMENDED ACTIONS
        </Text>
        
        <VStack spacing={3} align="stretch">
          {recommendedActions.map((action, idx) => (
            <HStack 
              key={idx} 
              bg={cardBg} 
              p={3} 
              borderRadius="md"
              borderWidth="1px"
              borderColor={borderColor}
              cursor="pointer"
              _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
            >
              <Badge 
                colorScheme={
                  action.priority === 'high' ? 'red' : 
                  action.priority === 'medium' ? 'orange' : 'blue'
                }
                variant="subtle"
              >
                {action.priority}
              </Badge>
              <Text fontSize="sm" flex="1">{action.action}</Text>
            </HStack>
          ))}
          
          <Button 
            size="xs" 
            variant="outline" 
            leftIcon={<Icon as={FaRocket} />} 
            alignSelf="flex-start"
          >
            More Actions
          </Button>
        </VStack>
      </Box>
      
      {/* AI Assistant */}
      <Box p={4} mt="auto">
        <Box 
          bg="purple.500" 
          color="white" 
          p={3} 
          borderRadius="md" 
          cursor="pointer"
          _hover={{ bg: 'purple.600' }}
          role="button"
          tabIndex={0}
          aria-label="Toggle AI Career Assistant"
          onClick={() => setIsAiChatVisible?.(!isAiChatVisible)}
        >
          <HStack>
            <Icon as={FaUserGraduate} boxSize={5} />
            <VStack align="start" spacing={0}>
              <Text fontWeight="medium">AI Career Assistant</Text>
              <Text fontSize="xs">Ask questions about programs</Text>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}