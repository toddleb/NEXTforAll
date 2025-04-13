// components/layout/NextDashboardLayout.tsx
import React, { useState } from 'react';
import { Flex, Box, useColorModeValue } from '@chakra-ui/react';

// Import components with clean names
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import DashboardTopBar from '@/components/layout/DashboardTopBar';
import DashboardPanel from '@/components/layout/DashboardPanel';

export default function NextDashboardLayout({
  userType,
  programData,
  institutionData,
  candidateData,
  insightsData
}) {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  // Using white background for left sidebar
  const leftSidebarBg = useColorModeValue('white', 'gray.800');
  const filteredCandidates = candidateData;
  
  // State for AI chat visibility
  const [isAiChatVisible, setIsAiChatVisible] = useState(false);

  return (
    <Flex height="100vh" direction="column" overflow="hidden" bg={bgColor}>
      {/* Top Bar */}
      <DashboardTopBar 
        userType={userType}
        programData={programData}
      />

      {/* Main Layout */}
      <Flex flex="1" overflow="hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          userType={userType}
          filteredCandidates={filteredCandidates}
          bgColor={leftSidebarBg}
        />

        {/* Main Dashboard Panel */}
        <DashboardPanel 
          userType={userType}
          filteredCandidates={filteredCandidates}
        />
        
        {/* Right Sidebar */}
        <RightSidebar
          userType={userType}
          programData={programData}
          insightsData={insightsData}
          isAiChatVisible={isAiChatVisible}
          setIsAiChatVisible={setIsAiChatVisible}
        />
      </Flex>
      
      {/* Chat UI component */}
      {isAiChatVisible && (
        <Box 
          position="fixed" 
          bottom="20px" 
          right="300px" 
          width="350px" 
          height="450px"
          bg="white"
          borderRadius="md"
          boxShadow="xl"
          borderWidth="1px"
          borderColor="gray.200"
          zIndex={1000}
        >
          {/* Chat UI would go here */}
          <Box 
            p={4} 
            borderBottomWidth="1px" 
            borderColor="gray.200"
            bg="purple.500"
            color="white"
            borderTopRadius="md"
          >
            <Flex justify="space-between" align="center">
              <Box fontWeight="bold">AI Career Assistant</Box>
              <Box 
                cursor="pointer" 
                onClick={() => setIsAiChatVisible(false)}
                fontSize="lg"
              >
                ×
              </Box>
            </Flex>
          </Box>
          <Box p={4}>
            <Box fontSize="sm" color="gray.500">
              Ask me questions about programs, career paths, or admissions.
            </Box>
          </Box>
        </Box>
      )}
    </Flex>
  );
}