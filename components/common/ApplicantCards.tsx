// components/common/ApplicantCards.tsx
import React, { useState } from 'react';
import {
  Box, 
  SimpleGrid, 
  Text, 
  Badge, 
  Button, 
  Flex, 
  HStack, 
  VStack,
  Icon,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react';
import { 
  SearchIcon, 
  ChevronDownIcon, 
  StarIcon, 
  ChatIcon, 
  ViewIcon,
  EmailIcon,
  PhoneIcon,
  CheckIcon
} from '@chakra-ui/icons';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

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
}

interface ApplicantCardsProps {
  candidates: Candidate[];
  isLoading?: boolean;
  onViewProfile?: (candidate: Candidate) => void;
  onToggleFavorite?: (id: string, value: boolean) => void;
  onContact?: (candidate: Candidate, method: 'email' | 'phone' | 'message') => void;
}

export default function ApplicantCards({
  candidates,
  isLoading = false,
  onViewProfile,
  onToggleFavorite,
  onContact
}: ApplicantCardsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('matchScore');
  const [filterIntent, setFilterIntent] = useState('all');
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const secondaryBg = useColorModeValue('gray.50', 'gray.700');
  
  // Intent badge colors
  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'very-high': return 'purple';
      case 'high': return 'green';
      case 'medium': return 'blue';
      case 'low': return 'gray';
      default: return 'gray';
    }
  };
  
  // Status badge colors
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

  // Filter and sort candidates
  const filteredCandidates = candidates
    .filter(candidate => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchFields = [
          candidate.blindId,
          candidate.name,
          candidate.program,
          candidate.skills?.join(' '),
          candidate.location,
        ].filter(Boolean).map(f => f?.toLowerCase());
        
        if (!searchFields.some(field => field?.includes(searchLower))) {
          return false;
        }
      }
      
      // Intent filter
      if (filterIntent !== 'all' && candidate.intent !== filterIntent) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'matchScore') {
        return b.matchScore - a.matchScore;
      }
      
      if (sortBy === 'activity') {
        if (!a.activityDate || !b.activityDate) return 0;
        return new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime();
      }
      
      return 0;
    });

  return (
    <Box>
      {/* Controls Panel */}
      <Flex 
        mb={6} 
        gap={4} 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
      >
        <InputGroup maxW={{ base: 'full', md: '320px' }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search candidates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderRadius="md"
          />
        </InputGroup>
        
        <HStack spacing={4}>
          <Select
            value={filterIntent}
            onChange={(e) => setFilterIntent(e.target.value)}
            size="md"
            width="auto"
            icon={<FaFilter />}
          >
            <option value="all">All Intents</option>
            <option value="very-high">Very High Intent</option>
            <option value="high">High Intent</option>
            <option value="medium">Medium Intent</option>
            <option value="low">Low Intent</option>
          </Select>
          
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="md"
            width="auto"
            icon={<FaSortAmountDown />}
          >
            <option value="matchScore">Sort by Match Score</option>
            <option value="activity">Sort by Recent Activity</option>
          </Select>
        </HStack>
      </Flex>
      
      {/* Loading state */}
      {isLoading ? (
        <Flex justify="center" align="center" direction="column" my={10}>
          <Spinner size="xl" color="purple.500" />
          <Text mt={4} color="gray.500">Loading candidates...</Text>
        </Flex>
      ) : filteredCandidates.length === 0 ? (
        <Flex justify="center" align="center" direction="column" my={10}>
          <Text color="gray.500">No candidates match your criteria</Text>
          <Button 
            mt={4} 
            size="sm" 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setFilterIntent('all');
            }}
          >
            Reset Filters
          </Button>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredCandidates.map(candidate => (
            <Box 
              key={candidate.id} 
              borderWidth="1px" 
              borderColor={borderColor} 
              borderRadius="lg" 
              overflow="hidden"
              bg={cardBg}
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-3px)', shadow: 'md' }}
              position="relative"
            >
              {/* Card Header - Match Score & Favorite */}
              <Flex 
                justify="space-between" 
                align="center" 
                p={4} 
                borderBottomWidth="1px" 
                borderColor={borderColor}
                bg={secondaryBg}
              >
                <Badge 
                  px={3} 
                  py={1} 
                  borderRadius="full" 
                  colorScheme="purple" 
                  variant="solid"
                  fontSize="sm"
                >
                  {candidate.matchScore}% Match
                </Badge>
                
                <IconButton
                  aria-label={candidate.favorite ? "Remove from favorites" : "Add to favorites"}
                  icon={<StarIcon />}
                  size="sm"
                  variant="ghost"
                  color={candidate.favorite ? "yellow.400" : "gray.400"}
                  onClick={() => onToggleFavorite?.(candidate.id, !candidate.favorite)}
                />
              </Flex>
              
              {/* Card Content */}
              <Box p={4}>
                <Flex gap={3} mb={3}>
                  <Avatar 
                    size="md" 
                    name={candidate.isRevealed ? candidate.name : candidate.blindId}
                    src={candidate.avatarUrl}
                    bg="purple.500"
                  />
                  <Box>
                    <Text fontWeight="bold" fontSize="md" isTruncated>
                      {candidate.isRevealed ? candidate.name : candidate.blindId}
                    </Text>
                    {candidate.location && (
                      <Text fontSize="sm" color={textColor} isTruncated>
                        {candidate.location}
                      </Text>
                    )}
                    <HStack mt={1} spacing={2}>
                      <Badge colorScheme={getIntentColor(candidate.intent)}>
                        {candidate.intent.toUpperCase()}
                      </Badge>
                      {candidate.status && (
                        <Badge colorScheme={getStatusColor(candidate.status)}>
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </Badge>
                      )}
                    </HStack>
                  </Box>
                </Flex>
                
                <VStack align="stretch" spacing={2} mt={4}>
                  <Text fontSize="sm" fontWeight="medium">
                    Program: <Text as="span" fontWeight="normal">{candidate.program}</Text>
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    Activity: <Text as="span" fontWeight="normal">{candidate.activity}</Text>
                  </Text>
                  
                  {candidate.skills && candidate.skills.length > 0 && (
                    <Box mt={1}>
                      <Text fontSize="sm" fontWeight="medium" mb={1}>
                        Skills:
                      </Text>
                      <Flex wrap="wrap" gap={2}>
                        {candidate.skills.map((skill, idx) => (
                          <Badge key={idx} colorScheme="green" variant="subtle">
                            {skill}
                          </Badge>
                        ))}
                      </Flex>
                    </Box>
                  )}
                </VStack>
              </Box>
              
              {/* Card Actions */}
              <Flex 
                p={3} 
                borderTopWidth="1px" 
                borderColor={borderColor} 
                justify="space-between"
                bg={secondaryBg}
              >
                {candidate.isRevealed ? (
                  <HStack spacing={1}>
                    {candidate.email && (
                      <Tooltip label={`Email ${candidate.name}`}>
                        <IconButton
                          aria-label="Email candidate"
                          icon={<EmailIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => onContact?.(candidate, 'email')}
                        />
                      </Tooltip>
                    )}
                    {candidate.phone && (
                      <Tooltip label={`Call ${candidate.name}`}>
                        <IconButton
                          aria-label="Call candidate"
                          icon={<PhoneIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => onContact?.(candidate, 'phone')}
                        />
                      </Tooltip>
                    )}
                    <Tooltip label="Message candidate">
                      <IconButton
                        aria-label="Message candidate"
                        icon={<ChatIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => onContact?.(candidate, 'message')}
                      />
                    </Tooltip>
                  </HStack>
                ) : (
                  <Button 
                    leftIcon={<CheckIcon />}
                    size="sm" 
                    variant="outline"
                    colorScheme="purple"
                  >
                    Request Reveal
                  </Button>
                )}
                
                <Button
                  rightIcon={<ViewIcon />}
                  size="sm"
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => onViewProfile?.(candidate)}
                >
                  View Profile
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}