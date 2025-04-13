// components/common/ApplicantTable.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Checkbox,
  Tooltip,
  useColorModeValue,
  Spinner,
  Icon,
  CloseButton,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';
import { FaFilter, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

// Define our candidate interface
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
}

interface ApplicantTableProps {
  candidates: Candidate[];
  isLoading?: boolean;
  onViewProfile?: (candidate: Candidate) => void;
  onToggleFavorite?: (id: string, value: boolean) => void;
}

// Sort functions
type SortKey = 'matchScore' | 'activity' | 'intent' | 'program' | 'status';
type SortDir = 'asc' | 'desc';

export default function ApplicantTable({
  candidates,
  isLoading = false,
  onViewProfile,
  onToggleFavorite
}: ApplicantTableProps) {
  // States for table controls
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('matchScore');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    intent: [] as string[],
    program: [] as string[],
    status: [] as string[],
  });

  // Colors
  const tableBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
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

  // Toggle a candidate selection
  const toggleSelection = (id: string) => {
    setSelectedCandidates(prev => 
      prev.includes(id) 
        ? prev.filter(cid => cid !== id) 
        : [...prev, id]
    );
  };

  // Toggle selection of all candidates
  const toggleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  // Handle sort change
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('desc');
    }
  };

  // Helper to get unique values for filter options
  const getUniqueValues = (key: 'intent' | 'program' | 'status') => {
    return Array.from(new Set(candidates.map(c => String(c[key])).filter(Boolean)));
  };

  // Apply filters and search
  const filteredCandidates = useMemo(() => {
    return candidates
      .filter(candidate => {
        // Apply text search
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
        
        // Apply filters
        if (filters.intent.length > 0 && !filters.intent.includes(candidate.intent)) {
          return false;
        }
        
        if (filters.program.length > 0 && !filters.program.includes(candidate.program)) {
          return false;
        }
        
        if (filters.status.length > 0 && candidate.status && !filters.status.includes(candidate.status)) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Apply sorting
        if (sortBy === 'matchScore') {
          return sortDir === 'asc' 
            ? a.matchScore - b.matchScore 
            : b.matchScore - a.matchScore;
        }
        
        if (sortBy === 'activity') {
          if (!a.activityDate || !b.activityDate) return 0;
          const dateA = new Date(a.activityDate).getTime();
          const dateB = new Date(b.activityDate).getTime();
          return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
        }
        
        // String comparisons for other fields
        const valA = String(a[sortBy] || '').toLowerCase();
        const valB = String(b[sortBy] || '').toLowerCase();
        
        return sortDir === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [candidates, searchTerm, sortBy, sortDir, filters]);

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(f => f.length > 0);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      intent: [],
      program: [],
      status: [],
    });
    setSearchTerm('');
  };

  // Toggle a specific filter
  const toggleFilter = (type: 'intent' | 'program' | 'status', value: string) => {
    setFilters(prev => {
      const currentFilters = [...prev[type]];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [type]: currentFilters.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...currentFilters, value]
        };
      }
    });
  };

  return (
    <Box 
      bg={tableBg} 
      borderRadius="md" 
      overflow="hidden" 
      position="relative"
    >
      {/* Table Controls */}
      <Flex 
        p={4} 
        justify="space-between" 
        align="center" 
        borderBottomWidth="1px" 
        borderColor={borderColor}
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        gap={3}
      >
        <InputGroup size="sm" maxW={{ base: 'full', md: '320px' }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search candidates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderRadius="md"
          />
          {searchTerm && (
            <InputRightElement>
              <CloseButton size="sm" onClick={() => setSearchTerm('')} />
            </InputRightElement>
          )}
        </InputGroup>
        
        <HStack spacing={3}>
          {/* Filters Menu */}
          <Menu closeOnSelect={false}>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              leftIcon={<Icon as={FaFilter} />} 
              size="sm"
              colorScheme={hasActiveFilters ? "purple" : "gray"}
              variant={hasActiveFilters ? "solid" : "outline"}
            >
              Filters
              {hasActiveFilters && (
                <Badge ml={2} colorScheme="purple" borderRadius="full">
                  {Object.values(filters).flat().length}
                </Badge>
              )}
            </MenuButton>
            <MenuList minW="220px">
              <Box px={3} py={2} borderBottomWidth="1px" borderColor={borderColor}>
                <Text fontWeight="medium" fontSize="sm">Filter Candidates</Text>
              </Box>
              
              {/* Intent Filters */}
              <Box px={3} py={2}>
                <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>INTENT</Text>
                {getUniqueValues('intent').map(intent => (
                  <Checkbox 
                    key={intent} 
                    isChecked={filters.intent.includes(intent)}
                    onChange={() => toggleFilter('intent', intent)}
                    colorScheme={getIntentColor(intent)}
                    size="sm"
                    mb={1}
                  >
                    <Text fontSize="sm">
                      {intent.charAt(0).toUpperCase() + intent.slice(1)}
                    </Text>
                  </Checkbox>
                ))}
              </Box>
              
              {/* Program Filters */}
              <Box px={3} py={2} borderTopWidth="1px" borderColor={borderColor}>
                <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>PROGRAM</Text>
                {getUniqueValues('program').map(program => (
                  <Checkbox 
                    key={program} 
                    isChecked={filters.program.includes(program)}
                    onChange={() => toggleFilter('program', program)}
                    colorScheme="purple"
                    size="sm"
                    mb={1}
                  >
                    <Text fontSize="sm">{program}</Text>
                  </Checkbox>
                ))}
              </Box>
              
              {/* Status Filters */}
              <Box px={3} py={2} borderTopWidth="1px" borderColor={borderColor}>
                <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>STATUS</Text>
                {getUniqueValues('status').map(status => (
                  <Checkbox 
                    key={status} 
                    isChecked={filters.status.includes(status)}
                    onChange={() => toggleFilter('status', status)}
                    colorScheme={getStatusColor(status)}
                    size="sm"
                    mb={1}
                  >
                    <Text fontSize="sm">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </Checkbox>
                ))}
              </Box>
              
              {/* Clear Filters */}
              {hasActiveFilters && (
                <Box px={3} py={2} borderTopWidth="1px" borderColor={borderColor}>
                  <Button 
                    size="xs" 
                    width="full" 
                    onClick={clearAllFilters}
                    colorScheme="red"
                    variant="outline"
                  >
                    Clear All Filters
                  </Button>
                </Box>
              )}
            </MenuList>
          </Menu>
          
          {/* Results count */}
          {filteredCandidates.length !== candidates.length && (
            <Text fontSize="sm" color="gray.500">
              {filteredCandidates.length} of {candidates.length}
            </Text>
          )}
        </HStack>
      </Flex>
      
      {/* Table */}
      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th width="40px" px={3}>
                <Checkbox 
                  isChecked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                  isIndeterminate={selectedCandidates.length > 0 && selectedCandidates.length < filteredCandidates.length}
                  onChange={toggleSelectAll}
                  colorScheme="purple"
                  isDisabled={filteredCandidates.length === 0}
                />
              </Th>
              <Th width="40px"></Th>
              <Th>Candidate</Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('matchScore')}
                display={{ base: 'none', md: 'table-cell' }}
              >
                <HStack spacing={1}>
                  <Text>Match</Text>
                  <Icon 
                    as={
                      sortBy === 'matchScore' 
                        ? sortDir === 'asc' 
                          ? FaSortUp 
                          : FaSortDown 
                        : FaSort
                    } 
                    fontSize="xs" 
                  />
                </HStack>
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('program')}
              >
                <HStack spacing={1}>
                  <Text>Program</Text>
                  <Icon 
                    as={
                      sortBy === 'program' 
                        ? sortDir === 'asc' 
                          ? FaSortUp 
                          : FaSortDown 
                        : FaSort
                    } 
                    fontSize="xs" 
                  />
                </HStack>
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('intent')}
                display={{ base: 'none', md: 'table-cell' }}
              >
                <HStack spacing={1}>
                  <Text>Intent</Text>
                  <Icon 
                    as={
                      sortBy === 'intent' 
                        ? sortDir === 'asc' 
                          ? FaSortUp 
                          : FaSortDown 
                        : FaSort
                    } 
                    fontSize="xs" 
                  />
                </HStack>
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('status')}
                display={{ base: 'none', lg: 'table-cell' }}
              >
                <HStack spacing={1}>
                  <Text>Status</Text>
                  <Icon 
                    as={
                      sortBy === 'status' 
                        ? sortDir === 'asc' 
                          ? FaSortUp 
                          : FaSortDown 
                        : FaSort
                    } 
                    fontSize="xs" 
                  />
                </HStack>
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('activity')}
                display={{ base: 'none', lg: 'table-cell' }}
              >
                <HStack spacing={1}>
                  <Text>Last Seen</Text>
                  <Icon 
                    as={
                      sortBy === 'activity' 
                        ? sortDir === 'asc' 
                          ? FaSortUp 
                          : FaSortDown 
                        : FaSort
                    } 
                    fontSize="xs" 
                  />
                </HStack>
              </Th>
              <Th width="80px" textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={8} textAlign="center" py={10}>
                  <Spinner size="lg" color="purple.500" />
                  <Text mt={4} color="gray.500">Loading candidates...</Text>
                </Td>
              </Tr>
            ) : filteredCandidates.length === 0 ? (
              <Tr>
                <Td colSpan={8} textAlign="center" py={10}>
                  <Text color="gray.500">No candidates match your criteria</Text>
                  {hasActiveFilters && (
                    <Button 
                      mt={4} 
                      size="sm" 
                      variant="outline" 
                      onClick={clearAllFilters}
                    >
                      Clear Filters
                    </Button>
                  )}
                </Td>
              </Tr>
            ) : (
              filteredCandidates.map(candidate => (
                <Tr 
                  key={candidate.id} 
                  _hover={{ bg: hoverBg }}
                  bg={selectedCandidates.includes(candidate.id) ? hoverBg : undefined}
                >
                  <Td px={3}>
                    <Checkbox 
                      isChecked={selectedCandidates.includes(candidate.id)}
                      onChange={() => toggleSelection(candidate.id)}
                      colorScheme="purple"
                    />
                  </Td>
                  <Td px={2}>
                    <IconButton
                      aria-label="Toggle favorite"
                      icon={<StarIcon />}
                      size="xs"
                      variant="ghost"
                      color={candidate.favorite ? "yellow.400" : "gray.300"}
                      _hover={{ color: "yellow.400" }}
                      onClick={() => onToggleFavorite?.(candidate.id, !candidate.favorite)}
                    />
                  </Td>
                  <Td>
                    <Text fontWeight="medium">
                      {candidate.isRevealed ? candidate.name : candidate.blindId}
                    </Text>
                    {candidate.location && (
                      <Text fontSize="xs" color="gray.500">{candidate.location}</Text>
                    )}
                  </Td>
                  <Td display={{ base: 'none', md: 'table-cell' }}>
                    <Text fontWeight="medium" color="purple.500">
                      {candidate.matchScore}%
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{candidate.program}</Text>
                  </Td>
                  <Td display={{ base: 'none', md: 'table-cell' }}>
                    <Badge colorScheme={getIntentColor(candidate.intent)}>
                      {candidate.intent.toUpperCase()}
                    </Badge>
                  </Td>
                  <Td display={{ base: 'none', lg: 'table-cell' }}>
                    {candidate.status ? (
                      <Badge colorScheme={getStatusColor(candidate.status)}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </Badge>
                    ) : (
                      <Text fontSize="sm" color="gray.400">-</Text>
                    )}
                  </Td>
                  <Td display={{ base: 'none', lg: 'table-cell' }}>
                    <Text fontSize="sm">{candidate.activity}</Text>
                  </Td>
                  <Td textAlign="right">
                    <IconButton
                      aria-label="View profile"
                      icon={<ViewIcon />}
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewProfile?.(candidate)}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}