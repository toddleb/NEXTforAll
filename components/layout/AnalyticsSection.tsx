// components/layout/AnalyticsSection.tsx
import React from 'react';
import { 
  Box, 
  Heading, 
  useColorModeValue, 
  Button, 
  Flex,
  VStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, DownloadIcon, SettingsIcon } from '@chakra-ui/icons';

// Import our components
import AnalyticsPanel from '@/components/common/AnalyticsPanel';
import { DEFAULT_CHARTS, DEFAULT_HEATMAPS } from '@/lib/analyticsLibrary';
import { useSelectedAnalytics } from '@/lib/useSelectedAnalytics';

interface AnalyticsSectionProps {
  programId: string;
  showHeader?: boolean;
  initialView?: 'charts' | 'heatmaps' | 'combined';
}

export default function AnalyticsSection({ 
  programId, 
  showHeader = true,
  initialView = 'combined' 
}: AnalyticsSectionProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Get the selected analytics using our custom hook
  const { 
    selectedCharts, 
    selectedHeatmaps, 
    updateSelectedCharts, 
    updateSelectedHeatmaps 
  } = useSelectedAnalytics(programId, DEFAULT_CHARTS, DEFAULT_HEATMAPS);
  
  // Time range options
  const timeFrameOptions = {
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    '90days': 'Last 90 Days',
  };

  return (
    <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
      {showHeader && (
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">Analytics</Heading>
          
          <HStack spacing={2}>
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />} 
                size="sm" 
                variant="outline"
              >
                Export
              </MenuButton>
              <MenuList>
                <MenuItem icon={<DownloadIcon />}>Export as CSV</MenuItem>
                <MenuItem icon={<DownloadIcon />}>Export as PDF</MenuItem>
                <MenuItem icon={<DownloadIcon />}>Export as Image</MenuItem>
              </MenuList>
            </Menu>
            
            <Button 
              size="sm" 
              leftIcon={<SettingsIcon />} 
              colorScheme="purple" 
              variant="outline"
              onClick={() => {
                // Find the AnalyticsPanel child component and trigger its customize dialog
                const analyticsPanel = document.querySelector('#analytics-panel-customize-btn');
                if (analyticsPanel) {
                  (analyticsPanel as HTMLButtonElement).click();
                }
              }}
            >
              Customize
            </Button>
          </HStack>
        </Flex>
      )}
      
      {/* Check if we have any analytics selected */}
      {(selectedCharts.length > 0 || selectedHeatmaps.length > 0) ? (
        <AnalyticsPanel 
          programId={programId}
          initialView={initialView}
        />
      ) : (
        <Box 
          p={8} 
          textAlign="center" 
          borderWidth="1px" 
          borderColor={borderColor} 
          borderRadius="md"
          bg={useColorModeValue('white', 'gray.800')}
        >
          <Text color="gray.500" mb={4}>No analytics selected for this dashboard.</Text>
          <Button 
            colorScheme="purple" 
            leftIcon={<SettingsIcon />}
            onClick={() => {
              // Reset to defaults
              updateSelectedCharts(DEFAULT_CHARTS);
              updateSelectedHeatmaps(DEFAULT_HEATMAPS);
            }}
          >
            Add Default Analytics
          </Button>
        </Box>
      )}
    </Box>
  );
}