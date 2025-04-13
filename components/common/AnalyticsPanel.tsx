// components/common/AnalyticsPanel.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  useColorModeValue,
  Flex,
  HStack,
  Text,
  Button,
  Icon
} from '@chakra-ui/react';
import { IoBarChart, IoGridOutline, IoStatsChart } from 'react-icons/io5';
import { SettingsIcon } from '@chakra-ui/icons';

// Import components
import ChartPanel from './ChartPanel';
import Heatmap from './Heatmap';
import AnalyticsSelector from './AnalyticsSelector';

// Import hooks and data
import { useSelectedAnalytics } from '@/lib/useSelectedAnalytics';
import { DEFAULT_CHARTS, DEFAULT_HEATMAPS } from '@/lib/analyticsLibrary';

interface AnalyticsPanelProps {
  initialView?: string;
  programId?: string;
}

export default function AnalyticsPanel({ 
  initialView = 'combined',
  programId = 'default'
}: AnalyticsPanelProps) {
  // Use useEffect to ensure client-side only state changes
  const [view, setView] = useState(initialView);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Ensure we only use client-side state after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Get the selected analytics using our custom hook - but only client side
  const { 
    selectedCharts, 
    selectedHeatmaps, 
    updateSelectedCharts, 
    updateSelectedHeatmaps 
  } = useSelectedAnalytics(programId, DEFAULT_CHARTS, DEFAULT_HEATMAPS);
  
  if (!isClient) {
    // Server-side or during hydration - render a minimal version
    return (
      <Box 
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        overflow="hidden"
      >
        <Flex 
          justify="space-between" 
          align="center" 
          p={4} 
          borderBottomWidth="1px"
          borderColor={borderColor}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Heading size="md">Analytics</Heading>
          <Button 
            id="analytics-panel-customize-btn"
            size="sm" 
            leftIcon={<SettingsIcon />} 
            colorScheme="purple" 
            variant="outline"
          >
            Customize
          </Button>
        </Flex>
        <Box p={6}>
          <Text>Loading analytics...</Text>
        </Box>
      </Box>
    );
  }
  
  return (
    <Box 
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
    >
      {/* Header with controls */}
      <Flex 
        justify="space-between" 
        align="center" 
        p={4} 
        borderBottomWidth="1px"
        borderColor={borderColor}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <HStack>
          <Heading size="md">Analytics</Heading>
        </HStack>
        
        <HStack spacing={4}>
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
            <Button
              size="sm"
              leftIcon={<Icon as={IoStatsChart} />}
              variant={view === 'charts' ? 'solid' : 'ghost'}
              colorScheme={view === 'charts' ? 'purple' : 'gray'}
              onClick={() => setView('charts')}
            >
              Charts
            </Button>
            <Button
              size="sm"
              leftIcon={<Icon as={IoGridOutline} />}
              variant={view === 'heatmaps' ? 'solid' : 'ghost'}
              colorScheme={view === 'heatmaps' ? 'purple' : 'gray'}
              onClick={() => setView('heatmaps')}
            >
              Heat Maps
            </Button>
            <Button
              size="sm"
              leftIcon={<Icon as={IoBarChart} />}
              variant={view === 'combined' ? 'solid' : 'ghost'}
              colorScheme={view === 'combined' ? 'purple' : 'gray'}
              onClick={() => setView('combined')}
            >
              Combined
            </Button>
          </HStack>
          
          {/* Add the customize button */}
          <Button 
            id="analytics-panel-customize-btn"
            size="sm" 
            leftIcon={<SettingsIcon />} 
            colorScheme="purple" 
            variant="outline"
            onClick={() => setIsSelectorOpen(true)}
          >
            Customize
          </Button>
        </HStack>
      </Flex>

      {/* Content based on view selection */}
      <Box p={6}>
        {view === 'charts' && (
          <ChartPanel 
            chartIds={selectedCharts} 
          />
        )}
        
        {view === 'heatmaps' && (
          <Heatmap 
            heatmapIds={selectedHeatmaps} 
          />
        )}
        
        {view === 'combined' && (
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <ChartPanel chartIds={selectedCharts} />
            <Heatmap heatmapIds={selectedHeatmaps} />
          </SimpleGrid>
        )}
      </Box>
      
      {/* Analytics Selector Drawer */}
      <AnalyticsSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        selectedCharts={selectedCharts}
        selectedHeatmaps={selectedHeatmaps}
        onUpdateCharts={updateSelectedCharts}
        onUpdateHeatmaps={updateSelectedHeatmaps}
      />
    </Box>
  );
}