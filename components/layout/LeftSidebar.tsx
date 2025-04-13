// components/layout/LeftSidebar.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  List,
  ListItem, 
  Button, 
  Badge, 
  Divider,
  IconButton,
  Collapse,
  useColorModeValue,
  Icon,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  StarIcon,
  CheckIcon,
  SettingsIcon
} from '@chakra-ui/icons';
import { 
  FaUserGraduate, 
  FaFilter, 
  FaRegBuilding,
  FaGraduationCap,
  FaUsers,
  FaChartPie
} from 'react-icons/fa';

interface LeftSidebarProps {
  userType: 'program' | 'military' | 'agency';
  bgColor?: string;
  filteredCandidates?: any[];
}

export default function LeftSidebar({
  userType,
  bgColor,
  filteredCandidates,
}: LeftSidebarProps) {
  // States for expandable sections
  const [expandedFilters, setExpandedFilters] = useState(true);
  const [expandedPrograms, setExpandedPrograms] = useState(true);
  const [expandedSegments, setExpandedSegments] = useState(false);
  
  // Colors
  const defaultBg = useColorModeValue('gray.100', 'gray.900');
  const navBg = useColorModeValue('white', 'gray.800');
  const navHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const activeBg = useColorModeValue('purple.50', 'purple.900');
  const activeColor = useColorModeValue('purple.600', 'purple.200');
  
  // Predefined segments
  const segments = [
    { name: 'High Intent', count: 48, color: 'green' },
    { name: 'New Applicants', count: 36, color: 'blue' },
    { name: 'Needs Follow-up', count: 12, color: 'orange' },
    { name: 'Recently Active', count: 27, color: 'purple' },
  ];
  
  // Programs list
  const programs = [
    { name: 'Computer Science', count: 32, active: true },
    { name: 'Data Science', count: 27 },
    { name: 'Cybersecurity', count: 18 },
    { name: 'AI / Machine Learning', count: 22 },
    { name: 'Software Engineering', count: 25 },
  ];

  return (
    <Box 
      w="280px" 
      bg={bgColor || defaultBg} 
      borderRightWidth="1px"
      borderColor={borderColor}
      overflowY="auto"
    >
      {/* Program search */}
      <Box p={4}>
        <InputGroup size="sm" mb={4}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search candidates..." 
            bg={navBg}
            borderRadius="md"
          />
        </InputGroup>
        
        <Text fontSize="xs" color={textColor} fontWeight="medium" mb={1} letterSpacing="wider">
          NAVIGATION
        </Text>
      </Box>
      
      {/* Main navigation */}
      <List spacing={0} styleType="none">
        <ListItem 
          bg={activeBg}
          color={activeColor}
          p={3}
          fontWeight="medium"
          cursor="pointer"
          _hover={{ bg: navHoverBg }}
        >
          <HStack spacing={2}>
            <Icon as={FaChartPie} />
            <Text>Dashboard</Text>
          </HStack>
        </ListItem>
        
        <ListItem 
          p={3}
          fontWeight="medium"
          cursor="pointer"
          _hover={{ bg: navHoverBg }}
        >
          <HStack spacing={2}>
            <Icon as={FaUsers} />
            <Text>All Candidates</Text>
          </HStack>
        </ListItem>
        
        <ListItem 
          p={3}
          fontWeight="medium"
          cursor="pointer"
          _hover={{ bg: navHoverBg }}
        >
          <HStack spacing={2}>
            <Icon as={FaRegBuilding} />
            <Text>Programs</Text>
          </HStack>
        </ListItem>
      </List>
      
      {/* Filters section */}
      <Box px={4} mb={4}>
        <HStack justify="space-between" onClick={() => setExpandedFilters(!expandedFilters)} cursor="pointer" mb={2}>
          <HStack spacing={2}>
            <Icon as={FaFilter} fontSize="xs" />
            <Text fontSize="xs" color={textColor} fontWeight="medium" letterSpacing="wider">
              FILTERS
            </Text>
          </HStack>
          <Icon as={expandedFilters ? ChevronDownIcon : ChevronRightIcon} fontSize="xs" />
        </HStack>
        
        <Collapse in={expandedFilters}>
          <VStack align="stretch" spacing={2} pl={1}>
            {segments.map((segment, idx) => (
              <HStack key={idx} fontSize="sm" cursor="pointer" p={2} borderRadius="md" _hover={{ bg: navHoverBg }}>
                <Badge colorScheme={segment.color} variant="subtle">
                  {segment.count}
                </Badge>
                <Text>{segment.name}</Text>
              </HStack>
            ))}
            
            <Button size="xs" leftIcon={<Icon as={FaFilter} />} variant="outline" mt={1}>
              More Filters
            </Button>
          </VStack>
        </Collapse>
      </Box>
      
      <Divider mb={4} />
      
      {/* Programs section */}
      <Box px={4} mb={4}>
        <HStack justify="space-between" onClick={() => setExpandedPrograms(!expandedPrograms)} cursor="pointer" mb={2}>
          <HStack spacing={2}>
            <Icon as={FaGraduationCap} fontSize="xs" />
            <Text fontSize="xs" color={textColor} fontWeight="medium" letterSpacing="wider">
              PROGRAMS
            </Text>
          </HStack>
          <Icon as={expandedPrograms ? ChevronDownIcon : ChevronRightIcon} fontSize="xs" />
        </HStack>
        
        <Collapse in={expandedPrograms}>
          <VStack align="stretch" spacing={2} pl={1}>
            {programs.map((program, idx) => (
              <HStack 
                key={idx} 
                fontSize="sm" 
                cursor="pointer" 
                p={2} 
                borderRadius="md" 
                bg={program.active ? activeBg : 'transparent'}
                color={program.active ? activeColor : 'inherit'}
                _hover={{ bg: program.active ? activeBg : navHoverBg }}
              >
                <Text flex="1">{program.name}</Text>
                <Badge colorScheme={program.active ? "purple" : "gray"} variant="subtle">
                  {program.count}
                </Badge>
              </HStack>
            ))}
            
            <Button size="xs" leftIcon={<Icon as={FaGraduationCap} />} variant="outline" mt={1}>
              All Programs
            </Button>
          </VStack>
        </Collapse>
      </Box>
      
      <Divider mb={4} />
      
      {/* Saved segments */}
      <Box px={4} mb={4}>
        <HStack justify="space-between" onClick={() => setExpandedSegments(!expandedSegments)} cursor="pointer" mb={2}>
          <HStack spacing={2}>
            <StarIcon fontSize="xs" />
            <Text fontSize="xs" color={textColor} fontWeight="medium" letterSpacing="wider">
              SAVED SEGMENTS
            </Text>
          </HStack>
          <Icon as={expandedSegments ? ChevronDownIcon : ChevronRightIcon} fontSize="xs" />
        </HStack>
        
        <Collapse in={expandedSegments}>
          <VStack align="stretch" spacing={2} pl={1}>
            <HStack fontSize="sm" cursor="pointer" p={2} borderRadius="md" _hover={{ bg: navHoverBg }}>
              <Text>High Intent CS Majors</Text>
            </HStack>
            <HStack fontSize="sm" cursor="pointer" p={2} borderRadius="md" _hover={{ bg: navHoverBg }}>
              <Text>Applied but Inactive</Text>
            </HStack>
            <Button size="xs" leftIcon={<StarIcon />} variant="outline" mt={1}>
              Create Segment
            </Button>
          </VStack>
        </Collapse>
      </Box>
      
      {/* Footer */}
      <Box mt="auto" p={4} borderTopWidth="1px" borderColor={borderColor}>
        <HStack>
          <Tooltip label="Settings">
            <IconButton aria-label="Settings" icon={<SettingsIcon />} size="sm" variant="ghost" />
          </Tooltip>
          <Text fontSize="sm">v2.5.0</Text>
        </HStack>
      </Box>
    </Box>
  );
}