// components/common/ChartPanel.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Text,
  Flex,
  HStack,
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Badge,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { ChevronDownIcon, InfoIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Import our analytics library
import { CHART_CONFIGS } from '@/lib/analyticsLibrary';

// Register Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ChartTooltip,
  Legend,
  Filler
);

// Common chart options
const getChartOptions = (type: 'line' | 'bar' | 'area', showLegend = false, showGrid = true, title = '') => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: showLegend },
      title: {
        display: !!title,
        text: title
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        bodyFont: {
          size: 12
        },
        titleFont: {
          size: 14
        }
      }
    },
    scales: {
      x: {
        grid: { display: showGrid },
        ticks: { 
          font: { size: 10 } 
        }
      },
      y: {
        grid: { display: showGrid },
        ticks: { 
          font: { size: 10 } 
        },
        beginAtZero: true
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false
    }
  };
  
  return options;
};

interface ChartPanelProps {
  initialTimeRange?: string;
  initialChartSize?: 'compact' | 'expanded';
  chartIds?: string[]; // Optional list of specific chart IDs to display
}

export default function ChartPanel({
  initialTimeRange = '30days',
  initialChartSize = 'compact',
  chartIds // If not provided, we'll use all charts
}: ChartPanelProps) {
  const [timeRange, setTimeRange] = useState(initialTimeRange);
  const [chartSize, setChartSize] = useState<'compact' | 'expanded'>(initialChartSize);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.700', 'white');

  // Debug log to see what chart IDs we're getting
  useEffect(() => {
    console.log("Available Chart Configs:", Object.keys(CHART_CONFIGS));
    console.log("Chart IDs passed to component:", chartIds);
  }, [chartIds]);

  // Get charts to display - either the specified ones or all of them
  const chartsToDisplay = chartIds && chartIds.length > 0
    ? chartIds.map(id => {
        const config = CHART_CONFIGS[id];
        if (!config) console.log(`No chart found for ID: ${id}`);
        return config;
      }).filter(Boolean)
    : Object.values(CHART_CONFIGS);

  // Chart rendering helper
  const renderChart = (config, index) => {
    if (!config || !config.timeRanges || !config.timeRanges[timeRange]) {
      return (
        <Box key={index} p={4} bg={cardBg} borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor} textAlign="center">
          <Text>No data available for this chart</Text>
        </Box>
      );
    }
    
    const chartData = config.timeRanges[timeRange];
    const chartOptions = getChartOptions(config.type, false, true);
    
    const chartHeight = chartSize === 'compact' ? 140 : 220;
    
    return (
      <Box 
        key={index} 
        p={4} 
        bg={cardBg} 
        borderRadius="md" 
        shadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <HStack justify="space-between" mb={2}>
          <Text fontSize="sm" fontWeight="medium" color={headingColor}>{config.title}</Text>
          {config.description && (
            <Tooltip label={config.description}>
              <InfoIcon boxSize={3.5} color="gray.400" />
            </Tooltip>
          )}
        </HStack>
        
        <Box h={`${chartHeight}px`} position="relative">
          {config.type === 'bar' && (
            <Bar 
              data={chartData} 
              options={chartOptions} 
            />
          )}
          
          {(config.type === 'line' || config.type === 'area') && (
            <Line 
              data={chartData} 
              options={chartOptions} 
            />
          )}
        </Box>
      </Box>
    );
  };

  const timeRangeOptions = {
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    '90days': 'Last 90 Days'
  };

  // If no charts available
  if (chartsToDisplay.length === 0) {
    return (
      <Box p={6} bg={bgColor} borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor} textAlign="center">
        <Text>No chart data available. Please select charts in the customization panel.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="sm">Performance Analytics</Heading>
        
        <HStack spacing={2}>
          <Menu>
            <MenuButton 
              as={Button} 
              size="sm" 
              variant="outline" 
              rightIcon={<ChevronDownIcon />}
            >
              {timeRangeOptions[timeRange]}
            </MenuButton>
            <MenuList>
              {Object.entries(timeRangeOptions).map(([key, label]) => (
                <MenuItem 
                  key={key} 
                  onClick={() => setTimeRange(key)}
                  fontWeight={timeRange === key ? "medium" : "normal"}
                >
                  {label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          
          <Tooltip label={chartSize === 'compact' ? 'Expand charts' : 'Compact view'}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setChartSize(chartSize === 'compact' ? 'expanded' : 'compact')}
            >
              {chartSize === 'compact' ? 'Expand' : 'Compact'}
            </Button>
          </Tooltip>
          
          <Tooltip label="Refresh data">
            <IconButton
              aria-label="Refresh data"
              icon={<RepeatIcon />}
              size="sm"
              variant="ghost"
              onClick={() => console.log('Refreshing chart data')}
            />
          </Tooltip>
        </HStack>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
        {chartsToDisplay.map((config, index) => renderChart(config, index))}
      </SimpleGrid>
    </Box>
  );
}