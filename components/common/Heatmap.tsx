// components/common/Heatmap.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  VStack, 
  HStack, 
  Text, 
  useColorModeValue,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  Badge,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { InfoIcon, DownloadIcon } from '@chakra-ui/icons';
import { 
  Chart as ChartJS, 
  Tooltip as ChartTooltip, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Legend 
} from 'chart.js';

// Import our analytics library
import { HEATMAP_CONFIGS, HeatMapConfig } from '@/lib/analyticsLibrary';
import USMapHeatmap from './USMapHeatmap';

// Register required Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  ChartTooltip, 
  Title, 
  Legend
);

// Helper function to get color for heatmap cells
const getColorForValue = (value: number, max: number, colorScale: string[]) => {
  const normalizedValue = value / max;
  if (normalizedValue < 0.25) return colorScale[0];
  if (normalizedValue < 0.5) return colorScale[1];
  if (normalizedValue < 0.75) return colorScale[2];
  return colorScale[3];
};

interface HeatmapProps {
  initialTabIndex?: number;
  heatmapIds?: string[]; // Optional array of specific heatmaps to display
}

export default function Heatmap({ 
  initialTabIndex = 0,
  heatmapIds  // If not provided, use all heatmaps
}: HeatmapProps) {
  const [tabIndex, setTabIndex] = useState(initialTabIndex);
  const [showLegend, setShowLegend] = useState(true);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  
  // Debug log to see what heatmap IDs we're getting
  useEffect(() => {
    console.log("Available Heatmap Configs:", Object.keys(HEATMAP_CONFIGS));
    console.log("Heatmap IDs passed to component:", heatmapIds);
  }, [heatmapIds]);
  
  // Get the heatmaps to display - either the specified ones or all
  let heatmapsToDisplay = heatmapIds && heatmapIds.length > 0
    ? heatmapIds.map(id => {
        const config = HEATMAP_CONFIGS[id];
        if (!config) console.log(`No heatmap found for ID: ${id}`);
        return config;
      }).filter(Boolean)
    : Object.values(HEATMAP_CONFIGS);
    
  // Sort heatmaps to put geographic at the end
  heatmapsToDisplay = heatmapsToDisplay.sort((a, b) => {
    // If a is geographic, move it to the end
    if (a.id === 'geographic-distribution') return 1;
    // If b is geographic, move it to the end
    if (b.id === 'geographic-distribution') return -1;
    // Otherwise keep original order
    return 0;
  });
  
  // Make sure we have a valid tab index
  useEffect(() => {
    if (heatmapsToDisplay.length <= tabIndex) {
      setTabIndex(0);
    }
  }, [heatmapsToDisplay, tabIndex]);
  
  // Get current heat map config
  const currentConfig = heatmapsToDisplay.length > 0 
    ? heatmapsToDisplay[Math.min(tabIndex, heatmapsToDisplay.length - 1)]
    : null;
  
  // Get min and max values for legend
  const minValue = currentConfig && currentConfig.data && currentConfig.data.length 
    ? Math.min(...currentConfig.data.map(d => d.v)) 
    : 0;
  const maxValue = currentConfig && currentConfig.data && currentConfig.data.length
    ? Math.max(...currentConfig.data.map(d => d.v)) 
    : 0;

  // Helper to render color legend
  const renderColorLegend = (colorScale: string[], min: number, max: number) => {
    return (
      <HStack mt={2} spacing={1}>
        {colorScale.map((color, i) => (
          <Flex key={i} direction="column" align="center">
            <Box 
              w="20px" 
              h="20px" 
              bg={color} 
              borderRadius="sm"
              borderWidth="1px"
              borderColor={borderColor}
            />
            <Text fontSize="xs" mt={1}>
              {i === 0 ? min : i === colorScale.length - 1 ? max : ''}
            </Text>
          </Flex>
        ))}
        <Text fontSize="xs" ml={2} color={textColor}>
          {min} - {max} candidates
        </Text>
      </HStack>
    );
  };

  // Special rendering for different heatmap types
  const renderHeatmapContent = (config) => {
    if (config.id === 'geographic-distribution') {
      return (
        <USMapHeatmap 
          title={config.title}
          description={config.description}
        />
      );
    }
    
    return renderSimpleHeatmap(config);
  };

  // Simple heatmap rendering without the library
  const renderSimpleHeatmap = (config: HeatMapConfig) => {
    if (!config.data || config.data.length === 0) {
      return (
        <Box p={4} textAlign="center">
          <Text>No data available for this heatmap</Text>
        </Box>
      );
    }
    
    const maxVal = Math.max(...config.data.map(d => d.v));
    
    return (
      <Box>
        {/* Column Headers */}
        <Flex mt={4} ml={20}>
          {config.xLabels.map((label, idx) => (
            <Box key={idx} width={`${100 / config.xLabels.length}%`} textAlign="center">
              <Text fontSize="sm" fontWeight="medium">{label}</Text>
            </Box>
          ))}
        </Flex>
        
        {/* Rows */}
        {config.yLabels.map((yLabel, yIdx) => (
          <Flex key={yIdx} align="center" my={1}>
            {/* Row Label */}
            <Box width="80px" textAlign="right" pr={3}>
              <Text fontSize="sm" noOfLines={1}>{yLabel}</Text>
            </Box>
            
            {/* Data Cells */}
            <Flex flex="1">
              {config.xLabels.map((xLabel, xIdx) => {
                const dataPoint = config.data.find(d => d.x === xLabel && d.y === yLabel);
                const value = dataPoint ? dataPoint.v : 0;
                const colorScale = config.colorScale || ['#f3e5f5', '#ce93d8', '#9c27b0', '#4a148c'];
                const bgColor = getColorForValue(value, maxVal, colorScale);
                
                return (
                  <Box 
                    key={xIdx} 
                    flex="1" 
                    height="40px" 
                    mx={1}
                    bg={bgColor}
                    borderRadius="sm"
                    position="relative"
                    _hover={{ 
                      transform: "scale(1.05)", 
                      zIndex: 2,
                      boxShadow: "md" 
                    }}
                    transition="all 0.2s"
                  >
                    <Tooltip label={`${yLabel} × ${xLabel}: ${value}`}>
                      <Flex 
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        align="center"
                        justify="center"
                      >
                        <Text 
                          fontSize="xs" 
                          fontWeight="bold" 
                          color={value > maxVal * 0.5 ? "white" : "black"}
                        >
                          {value}
                        </Text>
                      </Flex>
                    </Tooltip>
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        ))}
      </Box>
    );
  };

  // If no config is available, show an empty state
  if (!currentConfig) {
    return (
      <Box p={6} bg={bgColor} borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor} textAlign="center">
        <Text>No heatmap data available. Please select heatmaps in the customization panel.</Text>
      </Box>
    );
  }

  return (
    <Box p={6} bg={bgColor} borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor}>
      <VStack align="start" spacing={4}>
        <Flex width="100%" justify="space-between" align="center">
          <HStack>
            <Heading size="sm">{currentConfig.title}</Heading>
            {currentConfig.description && (
              <Tooltip label={currentConfig.description}>
                <InfoIcon boxSize={3.5} color="gray.400" />
              </Tooltip>
            )}
          </HStack>
          
          <HStack>
            <ButtonGroup size="xs" isAttached variant="outline">
              <Button 
                onClick={() => setShowLegend(!showLegend)}
                isActive={showLegend}
              >
                Legend
              </Button>
              <Tooltip label="Download as CSV">
                <IconButton
                  aria-label="Download data"
                  icon={<DownloadIcon />}
                  size="xs"
                />
              </Tooltip>
            </ButtonGroup>
          </HStack>
        </Flex>
        
        {/* Only show tabs if we have multiple heatmaps */}
        {heatmapsToDisplay.length > 1 && (
          <Tabs 
            variant="soft-rounded" 
            colorScheme="purple" 
            size="sm" 
            index={tabIndex} 
            onChange={setTabIndex}
            w="100%"
          >
            <TabList>
              {heatmapsToDisplay.map((config, idx) => (
                <Tab key={config.id} fontSize="xs">
                  {config.title.split(' ')[0]}
                </Tab>
              ))}
            </TabList>
            
            <Box mt={4} w="100%">
              {renderHeatmapContent(currentConfig)}
            </Box>
          </Tabs>
        )}
        
        {/* If we're showing a specific heatmap or only have one, don't show tabs */}
        {heatmapsToDisplay.length === 1 && (
          <Box mt={4} w="100%">
            {renderHeatmapContent(currentConfig)}
          </Box>
        )}
        
        {showLegend && (
          <Flex 
            justify="center" 
            w="100%" 
            borderTopWidth="1px" 
            borderColor={borderColor} 
            pt={3}
          >
            {renderColorLegend(
              currentConfig.colorScale || ['#f3e5f5', '#ce93d8', '#9c27b0', '#4a148c'],
              minValue,
              maxValue
            )}
          </Flex>
        )}
      </VStack>
    </Box>
  );
}