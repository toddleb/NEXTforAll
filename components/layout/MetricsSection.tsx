// components/layout/MetricsSection.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  HStack, 
  Button, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Icon,
  Text
} from '@chakra-ui/react';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { IoGrid, IoBarChart } from 'react-icons/io5';

// Import directly from files
import MetricsBar from '@/components/common/MetricsBar';
import MetricSelector from '@/components/common/MetricSelector';
import { METRICS, DEFAULT_METRICS } from '@/lib/metricsLibrary';
import { useSelectedMetrics } from '@/lib/useSelectedMetrics';

interface MetricsSectionProps {
  programId: string;
}

export default function MetricsSection({ programId }: MetricsSectionProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // States for UI control
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [metricsView, setMetricsView] = useState<'grid' | 'categories'>('categories');
  const [timeFrame, setTimeFrame] = useState('30days');

  // Ensure we have default metrics to fallback to
  const fallbackMetrics = DEFAULT_METRICS || [
    'impression_rate', 
    'conversion_rate', 
    'high_intent'
  ];
  
  // Use the hook - always call this, regardless of conditions
  const { selected, updateSelected } = useSelectedMetrics(programId, fallbackMetrics);
  
  // Filter metrics after hook call
  const validMetrics = [];
  
  // Only process if METRICS is available
  if (METRICS) {
    // Ensure selected is an array and filter valid metrics
    const validKeys = Array.isArray(selected) ? 
      selected.filter(key => METRICS[key]) : 
      [];
    
    // Map keys to metric objects
    for (const key of validKeys) {
      if (METRICS[key]) {
        validMetrics.push(METRICS[key]);
      }
    }
  }

  const timeFrameOptions = {
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    '90days': 'Last 90 Days',
    'year': 'Past Year',
  };

  // If no METRICS available, show error
  if (!METRICS) {
    return (
      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
        <Heading size="md">Performance Metrics</Heading>
        <Text mt={4} color="red.500">Error: Metrics library not loaded properly.</Text>
      </Box>
    );
  }

  // If no valid metrics, show empty state
  if (validMetrics.length === 0) {
    return (
      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
        <HStack justify="space-between" mb={4}>
          <Heading size="md">Performance Metrics</Heading>
          <Button 
            size="sm" 
            leftIcon={<SettingsIcon />} 
            colorScheme="purple" 
            variant="outline" 
            onClick={() => setDrawerOpen(true)}
          >
            Customize
          </Button>
        </HStack>
        <Text>No metrics selected. Click Customize to add metrics to your dashboard.</Text>
        
        {/* Metric Selector Drawer */}
        <MetricSelector
          isOpen={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedMetrics={Array.isArray(selected) ? selected : []}
          onUpdate={updateSelected}
        />
      </Box>
    );
  }

  // Normal render with metrics
  return (
    <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
      <HStack justify="space-between" mb={4}>
        <HStack>
          <Heading size="md">Performance Metrics</Heading>
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              size="sm" 
              variant="outline"
              ml={2}
            >
              {timeFrameOptions[timeFrame]}
            </MenuButton>
            <MenuList>
              {Object.entries(timeFrameOptions).map(([key, label]) => (
                <MenuItem
                  key={key}
                  onClick={() => setTimeFrame(key)}
                  fontWeight={timeFrame === key ? "bold" : "normal"}
                >
                  {label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
        
        <HStack>
          <Button 
            size="sm" 
            leftIcon={<Icon as={metricsView === 'grid' ? IoGrid : IoBarChart} />}
            variant="ghost" 
            onClick={() => setMetricsView(metricsView === 'grid' ? 'categories' : 'grid')} 
          >
            {metricsView === 'grid' ? 'Grid View' : 'Category View'}
          </Button>
          <Button 
            size="sm" 
            leftIcon={<SettingsIcon />} 
            colorScheme="purple" 
            variant="outline" 
            onClick={() => setDrawerOpen(true)}
          >
            Customize
          </Button>
        </HStack>
      </HStack>
      
      <MetricsBar 
        metrics={validMetrics} 
        showSparklines={true} 
        groupByCategory={metricsView === 'categories'} 
      />

      {/* Metric Selector Drawer */}
      <MetricSelector
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedMetrics={Array.isArray(selected) ? selected : []}
        onUpdate={updateSelected}
      />
    </Box>
  );
}