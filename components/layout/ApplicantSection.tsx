// components/layout/ApplicantSection.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { 
  ViewIcon, 
  DownloadIcon,
  ChevronDownIcon
} from '@chakra-ui/icons';
import { FaTable, FaThLarge, FaIdCard } from 'react-icons/fa';

// Import common components with correct paths
import ApplicantTable from '../common/ApplicantTable';
import ApplicantCards from '../common/ApplicantCards';
import ApplicantProfile from '../common/ApplicantProfile';

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
  // Additional profile fields can be added here
}

interface ApplicantSectionProps {
  userType: 'program' | 'military' | 'agency';
  filteredCandidates: any[]; // Use the actual data from your API
}

type ViewMode = 'table' | 'cards' | 'profile';

export default function ApplicantSection({
  userType,
  filteredCandidates,
}: ApplicantSectionProps) {
  // State for UI control
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Convert the filteredCandidates to our candidate format
  // In a real app, this would come from your API directly
  const candidates: Candidate[] = filteredCandidates.map(c => ({
    id: c.id || Math.random().toString(36).substring(2, 11),
    blindId: c.blindId || `CAND-${Math.floor(Math.random() * 10000)}`,
    matchScore: c.matchScore || Math.floor(Math.random() * 30) + 70,
    program: c.program || 'Computer Science',
    activity: c.activity || '3 days ago',
    activityDate: new Date(Date.now() - Math.random() * 1000000000),
    intent: c.intent || ['low', 'medium', 'high', 'very-high'][Math.floor(Math.random() * 4)],
    isRevealed: c.isRevealed || Math.random() > 0.5,
    name: c.isRevealed ? (c.name || 'John Doe') : undefined,
    skills: c.skills || ['JavaScript', 'React', 'Node.js'],
    location: c.location || 'San Francisco, CA',
    status: c.status || ['new', 'contacted', 'applied', 'interviewed', 'accepted'][Math.floor(Math.random() * 5)],
    email: c.isRevealed ? (c.email || 'candidate@example.com') : undefined,
    phone: c.isRevealed ? (c.phone || '+1 (555) 123-4567') : undefined,
    favorite: c.favorite || Math.random() > 0.7,
  }));

  // Handle view profile button click
  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    onOpen();
  };

  // Handle toggle favorite
  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    // In a real app, you would call your API to update the favorite status
    toast({
      title: isFavorite ? 'Added to favorites' : 'Removed from favorites',
      status: isFavorite ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle contact candidate
  const handleContact = (candidate: Candidate, method: 'email' | 'phone' | 'message') => {
    // In a real app, you would implement the contact functionality
    toast({
      title: `Contacting ${candidate.isRevealed ? candidate.name : candidate.blindId}`,
      description: `Opening ${method} interface...`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle request to reveal candidate
  const handleRevealRequest = (candidateId: string) => {
    // In a real app, you would call your API to request candidate reveal
    toast({
      title: 'Reveal requested',
      description: 'Your request has been submitted and is pending approval.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle status change
  const handleStatusChange = (status: string) => {
    if (!selectedCandidate) return;
    
    // In a real app, you would call your API to update status
    toast({
      title: 'Status updated',
      description: `Candidate status changed to ${status}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      {/* Header with View Toggles */}
      <HStack justify="space-between" mb={6}>
        <HStack>
          <Heading size="md">Applicants</Heading>
          <Text color="gray.500" fontSize="sm" ml={2}>
            {candidates.length} total
          </Text>
        </HStack>
        
        <HStack spacing={4}>
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              leftIcon={<DownloadIcon />}
              size="sm"
              variant="outline"
            >
              Export
            </MenuButton>
            <MenuList>
              <MenuItem>Export as CSV</MenuItem>
              <MenuItem>Export as Excel</MenuItem>
              <MenuItem>Export as PDF</MenuItem>
            </MenuList>
          </Menu>
          
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button 
              onClick={() => setViewMode('table')} 
              isActive={viewMode === 'table'}
              leftIcon={<Icon as={FaTable} />}
            >
              Table
            </Button>
            <Button 
              onClick={() => setViewMode('cards')} 
              isActive={viewMode === 'cards'}
              leftIcon={<Icon as={FaThLarge} />}
            >
              Cards
            </Button>
            <Button 
              onClick={() => setViewMode('profile')} 
              isActive={viewMode === 'profile'}
              leftIcon={<Icon as={FaIdCard} />}
              display={{ base: 'none', md: 'flex' }}
            >
              Full Profile
            </Button>
          </ButtonGroup>
        </HStack>
      </HStack>
      
      {/* Main Content */}
      <Box
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        bg={bgColor}
        overflow="hidden"
      >
        {viewMode === 'table' && (
          <ApplicantTable 
            candidates={candidates}
            isLoading={isLoading}
            onViewProfile={handleViewProfile}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        
        {viewMode === 'cards' && (
          <Box p={6}>
            <ApplicantCards 
              candidates={candidates}
              isLoading={isLoading}
              onViewProfile={handleViewProfile}
              onToggleFavorite={handleToggleFavorite}
              onContact={handleContact}
            />
          </Box>
        )}
        
        {viewMode === 'profile' && candidates.length > 0 && (
          <Box p={6}>
            {/* Display the selected profile, or the first one if none is selected */}
            <ApplicantProfile
              candidate={selectedCandidate || candidates[0]}
              onClose={() => setSelectedCandidate(null)}
              onRevealRequest={handleRevealRequest}
              onContactClick={(method) => handleContact(selectedCandidate || candidates[0], method)}
              onStatusChange={handleStatusChange}
            />
          </Box>
        )}
      </Box>
      
      {/* Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent maxW="90vw">
          <ApplicantProfile 
            candidate={selectedCandidate!} 
            onClose={onClose}
            onRevealRequest={handleRevealRequest}
            onContactClick={(method) => selectedCandidate && handleContact(selectedCandidate, method)}
            onStatusChange={handleStatusChange}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
}