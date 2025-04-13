// components/common/ApplicantProfile.tsx
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  IconButton,
  Heading,
  VStack,
  HStack,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Icon,
  Tooltip
} from '@chakra-ui/react';
import {
  StarIcon,
  PhoneIcon,
  EmailIcon,
  ChatIcon,
  ViewIcon,
  UnlockIcon,
  InfoIcon
} from '@chakra-ui/icons';
import { 
  FaUserGraduate, 
  FaBriefcase,
  FaPuzzlePiece,
  FaUserCircle,
  FaFileAlt,
  FaComments,
  FaChartBar,
  FaMapMarkerAlt
} from 'react-icons/fa';

// Import our new Assessment component
import ApplicantAssessment from './ApplicantAssessment';

// Candidate interface
interface Candidate {
  id: string;
  blindId: string;
  matchScore: number;
  program: string;
  activity: string;
  activityDate?: Date;
  intent: 'low' | 'medium' | 'high' | 'very-high';
  isRevealed?: boolean;
  name?: string;
  skills?: string[];
  location?: string;
  status?: 'new' | 'contacted' | 'applied' | 'interviewed' | 'accepted';
  notes?: string;
  email?: string;
  phone?: string;
  favorite?: boolean;
  avatarUrl?: string;
  
  // Additional fields that would be in a full profile
  education?: { institution: string; degree: string; field: string; graduationDate: string; }[];
  experience?: { company: string; position: string; duration: string; description: string; }[];
  achievements?: string[];
  interests?: string[];
}

interface ApplicantProfileProps {
  candidate: Candidate;
  onClose?: () => void;
  onRevealRequest?: (candidateId: string) => void;
  onContactClick?: (type: 'email' | 'phone' | 'message') => void;
  onStatusChange?: (status: string) => void;
}

export default function ApplicantProfile({
  candidate,
  onClose,
  onRevealRequest,
  onContactClick,
  onStatusChange
}: ApplicantProfileProps) {
  const [activeTab, setActiveTab] = useState(0);
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  // Helper functions for colors
  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'very-high': return 'purple';
      case 'high': return 'green';
      case 'medium': return 'blue';
      case 'low': return 'gray';
      default: return 'gray';
    }
  };
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new': return 'blue';
      case 'contacted': return 'purple';
      case 'applied': return 'orange';
      case 'interviewed': return 'teal';
      case 'accepted': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      maxW="4xl"
      w="100%"
    >
      {/* Header Section */}
      <Box
        bg={cardBg}
        p={6}
        borderBottomWidth="1px"
        borderColor={borderColor}
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={6}
          align={{ base: 'center', md: 'flex-start' }}
        >
          {/* Avatar and Match Score */}
          <Flex direction="column" align="center">
            <Avatar
              size="2xl"
              name={candidate.isRevealed ? candidate.name : candidate.blindId}
              src={candidate.avatarUrl}
              bg="purple.500"
              mb={3}
            />
            
            <Badge 
              px={3} 
              py={1} 
              borderRadius="full" 
              colorScheme="purple" 
              variant="solid"
              fontSize="md"
              mb={2}
            >
              {candidate.matchScore}% Match
            </Badge>
            
            {!candidate.isRevealed && (
              <Button
                leftIcon={<UnlockIcon />}
                size="sm"
                colorScheme="purple"
                onClick={() => onRevealRequest?.(candidate.id)}
              >
                Request to Reveal
              </Button>
            )}
          </Flex>
          
          {/* Candidate Details */}
          <Box flex="1">
            <Flex
              justify="space-between"
              align={{ base: 'flex-start', sm: 'center' }}
              direction={{ base: 'column', sm: 'row' }}
              mb={4}
              gap={{ base: 2, sm: 0 }}
            >
              <Heading as="h2" size="lg">
                {candidate.isRevealed ? candidate.name : candidate.blindId}
              </Heading>
              
              <HStack>
                <IconButton
                  aria-label={candidate.favorite ? "Remove from favorites" : "Add to favorites"}
                  icon={<StarIcon />}
                  size="md"
                  variant="outline"
                  color={candidate.favorite ? "yellow.400" : undefined}
                />
                
                <Button size="sm" variant="outline" onClick={onClose}>
                  Close
                </Button>
              </HStack>
            </Flex>
            
            <Box mb={4}>
              <HStack flexWrap="wrap" gap={2}>
                <HStack>
                  <Icon as={FaMapMarkerAlt} color="gray.500" />
                  <Text>{candidate.location || 'Location Unknown'}</Text>
                </HStack>
                
                <HStack ml={4}>
                  <Icon as={FaUserGraduate} color="gray.500" />
                  <Text>{candidate.program}</Text>
                </HStack>
              </HStack>
              
              <Text fontSize="sm" color={textColor} mt={2}>
                Last Activity: {candidate.activity}
              </Text>
              
              <HStack spacing={3} mt={3}>
                <Badge colorScheme={getIntentColor(candidate.intent)} py={1} px={2}>
                  {candidate.intent.toUpperCase()} INTENT
                </Badge>
                
                {candidate.status && (
                  <Badge colorScheme={getStatusColor(candidate.status)} py={1} px={2}>
                    {candidate.status.toUpperCase()}
                  </Badge>
                )}
              </HStack>
            </Box>
            
            {/* Contact Actions (only if revealed) */}
            {candidate.isRevealed && (
              <HStack spacing={3} mt={4}>
                <Button
                  leftIcon={<EmailIcon />}
                  colorScheme="blue"
                  size="md"
                  onClick={() => onContactClick?.('email')}
                >
                  Email
                </Button>
                <Button
                  leftIcon={<PhoneIcon />}
                  colorScheme="green"
                  size="md"
                  variant="outline"
                  onClick={() => onContactClick?.('phone')}
                >
                  Call
                </Button>
                <Button
                  leftIcon={<ChatIcon />}
                  colorScheme="purple"
                  size="md"
                  variant="outline"
                  onClick={() => onContactClick?.('message')}
                >
                  Message
                </Button>
              </HStack>
            )}
          </Box>
        </Flex>
      </Box>
      
      {/* Tabs Section */}
      <Tabs colorScheme="purple" isLazy onChange={setActiveTab} index={activeTab}>
        <TabList px={6} borderBottomWidth="1px" borderBottomColor={borderColor}>
          <Tab><Icon as={FaUserCircle} mr={2} /> Profile</Tab>
          <Tab><Icon as={FaChartBar} mr={2} /> Assessment</Tab>
          <Tab><Icon as={FaFileAlt} mr={2} /> Activity</Tab>
          <Tab><Icon as={FaComments} mr={2} /> Communication</Tab>
        </TabList>
        
        <TabPanels>
          {/* Profile Tab */}
          <TabPanel p={6}>
            <VStack align="stretch" spacing={6}>
              {/* Skills Section */}
              <Box p={4} borderWidth="1px" borderColor={borderColor} borderRadius="md">
                <Heading size="md" mb={4}>Skills & Interests</Heading>
                {candidate.skills && candidate.skills.length > 0 ? (
                  <Flex flexWrap="wrap" gap={2}>
                    {candidate.skills.map((skill, idx) => (
                      <Badge key={idx} colorScheme="purple" variant="subtle" p={2}>
                        {skill}
                      </Badge>
                    ))}
                  </Flex>
                ) : (
                  <Text color="gray.500">No skills information available</Text>
                )}
                
                {candidate.interests && candidate.interests.length > 0 && (
                  <>
                    <Divider my={4} />
                    <Heading size="sm" mb={2}>Interests</Heading>
                    <Flex flexWrap="wrap" gap={2}>
                      {candidate.interests.map((interest, idx) => (
                        <Badge key={idx} colorScheme="blue" variant="subtle" p={2}>
                          <Icon as={FaPuzzlePiece} mr={1} />
                          {interest}
                        </Badge>
                      ))}
                    </Flex>
                  </>
                )}
              </Box>
              
              {/* Education Section */}
              <Box p={4} borderWidth="1px" borderColor={borderColor} borderRadius="md">
                <Heading size="md" mb={4}>Education</Heading>
                {candidate.education && candidate.education.length > 0 ? (
                  <VStack align="stretch" spacing={4} divider={<Divider />}>
                    {candidate.education.map((edu, index) => (
                      <Box key={index}>
                        <HStack>
                          <Icon as={FaUserGraduate} boxSize={5} color="purple.500" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{edu.institution}</Text>
                            <Text>
                              {edu.degree} in {edu.field}
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {edu.graduationDate}
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Text color="gray.500">No education information available</Text>
                )}
              </Box>
              
              {/* Experience Section */}
              <Box p={4} borderWidth="1px" borderColor={borderColor} borderRadius="md">
                <Heading size="md" mb={4}>Experience</Heading>
                {candidate.experience && candidate.experience.length > 0 ? (
                  <VStack align="stretch" spacing={4} divider={<Divider />}>
                    {candidate.experience.map((exp, index) => (
                      <Box key={index}>
                        <HStack align="start" spacing={3}>
                          <Icon as={FaBriefcase} boxSize={5} color="blue.500" mt={1} />
                          <Box>
                            <Text fontWeight="bold">{exp.position}</Text>
                            <Text>{exp.company}</Text>
                            <Text fontSize="sm" color={textColor}>{exp.duration}</Text>
                            <Text mt={2} fontSize="sm">{exp.description}</Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Text color="gray.500">No experience information available</Text>
                )}
              </Box>
            </VStack>
          </TabPanel>
          
          {/* Assessment Tab */}
          <TabPanel p={6}>
            <ApplicantAssessment candidate={candidate} />
          </TabPanel>
          
          {/* Activity Tab - Placeholder */}
          <TabPanel p={6}>
            <Box
              p={6}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="md"
              bg={cardBg}
              textAlign="center"
            >
              <Icon as={FaFileAlt} boxSize={12} color="blue.400" mb={4} />
              <Heading size="md" mb={2}>Activity Timeline</Heading>
              <Text maxW="600px" mx="auto" color={textColor}>
                This section will display the candidate's full activity history,
                including application status changes, interactions, and engagement with your programs.
              </Text>
            </Box>
          </TabPanel>
          
          {/* Communication Tab - Placeholder */}
          <TabPanel p={6}>
            <Box
              p={6}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="md"
              bg={cardBg}
              textAlign="center"
            >
              <Icon as={FaComments} boxSize={12} color="green.400" mb={4} />
              <Heading size="md" mb={2}>Communication History</Heading>
              <Text maxW="600px" mx="auto" color={textColor}>
                This section will display all communications with this candidate,
                including emails, messages, and notes from calls or interviews.
              </Text>
              <Button mt={4} colorScheme="purple" leftIcon={<ChatIcon />}>
                Start New Conversation
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}