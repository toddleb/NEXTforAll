// components/layout/DashboardTopBar.tsx
import React from 'react';
import { 
  Box, 
  Flex, 
  HStack, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Avatar, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Icon,
  IconButton,
  Badge,
  useColorModeValue,
  Button,
  Divider
} from '@chakra-ui/react';
import { 
  SearchIcon, 
  BellIcon, 
  ChevronDownIcon 
} from '@chakra-ui/icons';
import { FaCog, FaUserAlt, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

interface DashboardTopBarProps {
  programData?: any;
  userType: 'program' | 'military' | 'agency';
}

export default function DashboardTopBar({ 
  programData,
  userType
}: DashboardTopBarProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const badgeBg = useColorModeValue('red.500', 'red.300');

  return (
    <Box 
      px={4} 
      py={2} 
      bg={bgColor} 
      borderBottomWidth="1px" 
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Flex justify="space-between" align="center">
        {/* Logo and Program Name */}
        <HStack spacing={3}>
          {programData?.logo && (
            <Box h="40px" w="40px">
              <img 
                src={programData.logo} 
                alt={programData.name} 
                style={{ height: '100%', objectFit: 'contain' }}
              />
            </Box>
          )}
          <Text fontWeight="bold" fontSize="lg">{programData?.name || 'Dashboard'}</Text>
        </HStack>
        
        {/* Search and Controls */}
        <HStack spacing={4}>
          <InputGroup w="300px" size="sm">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search candidates, programs..." 
              rounded="md" 
              borderColor={borderColor}
            />
          </InputGroup>
          
          {/* Help Button */}
          <IconButton
            aria-label="Help"
            icon={<FaQuestionCircle />}
            variant="ghost"
            size="sm"
          />
          
          {/* Notifications */}
          <Box position="relative">
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              size="sm"
            />
            <Badge 
              position="absolute" 
              top="-1" 
              right="-1" 
              fontSize="xs" 
              bg={badgeBg} 
              color="white" 
              borderRadius="full" 
              w={4} 
              h={4} 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
            >
              3
            </Badge>
          </Box>

          {/* Profile Menu */}
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              variant="ghost" 
              size="sm"
              px={2}
            >
              <HStack>
                <Avatar size="xs" name="Admin User" />
                <Text display={{ base: 'none', md: 'block' }}>Admin</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<Icon as={FaUserAlt} />}>
                Profile
              </MenuItem>
              <MenuItem icon={<Icon as={FaCog} />}>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem icon={<Icon as={FaSignOutAlt} />}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}