
import React from 'react';
import { Box, Heading, SimpleGrid, Text, Button, Flex, useColorModeValue } from '@chakra-ui/react';

type ViewMode = 'cards' | 'table' | 'profile';

interface ApplicantGalleryViewProps {
  userType: 'program' | 'military' | 'agency';
  viewMode: ViewMode;
  filteredCandidates: any[];
}

const ApplicantGalleryView: React.FC<ApplicantGalleryViewProps> = ({ userType, viewMode, filteredCandidates }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const cardColor = useColorModeValue('gray.100', 'gray.700');

  if (filteredCandidates.length === 0) {
    return (
      <Box p={6}>
        <Text>No candidates to display.</Text>
      </Box>
    );
  }

  switch (viewMode) {
    case 'cards':
      return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={6}>
          {filteredCandidates.map((candidate, index) => (
            <Box key={index} p={5} bg={cardColor} borderRadius="lg" shadow="md">
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold">{candidate.blindId || candidate.name || 'Unnamed Candidate'}</Text>
                <Text color="purple.400" fontSize="sm">{candidate.intent?.toUpperCase()}</Text>
              </Flex>
              <Text fontSize="sm">Match Score: {candidate.matchScore}</Text>
              <Text fontSize="sm" color="gray.500">Program: {candidate.program}</Text>
              <Text fontSize="sm" color="gray.500">Activity: {candidate.activity}</Text>
              <Button mt={3} size="sm" variant="outline">View Profile</Button>
            </Box>
          ))}
        </SimpleGrid>
      );
    case 'table':
      return (
        <Box p={6}>
          <Text fontSize="lg" mb={4}>[TABLE VIEW] — Coming soon</Text>
        </Box>
      );
    case 'profile':
      return (
        <Box p={6}>
          <Text fontSize="lg" mb={4}>[PROFILE VIEW] — Coming soon</Text>
        </Box>
      );
    default:
      return null;
  }
};

export default ApplicantGalleryView;
