// components/common/USMapHeatmap.tsx
import React, { useState } from 'react';
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
  Select,
} from '@chakra-ui/react';
import { InfoIcon, DownloadIcon } from '@chakra-ui/icons';

// US State coordinates (approximated central points)
const stateCoordinates = {
  'AL': { x: 320, y: 350 }, // Alabama
  'AK': { x: 100, y: 450 }, // Alaska (not geographically accurate, placed for visibility)
  'AZ': { x: 150, y: 300 }, // Arizona
  'AR': { x: 290, y: 320 }, // Arkansas
  'CA': { x: 80, y: 250 }, // California
  'CO': { x: 210, y: 250 }, // Colorado
  'CT': { x: 460, y: 190 }, // Connecticut
  'DE': { x: 440, y: 230 }, // Delaware
  'FL': { x: 380, y: 400 }, // Florida
  'GA': { x: 360, y: 350 }, // Georgia
  'HI': { x: 180, y: 450 }, // Hawaii (not geographically accurate, placed for visibility)
  'ID': { x: 150, y: 170 }, // Idaho
  'IL': { x: 310, y: 230 }, // Illinois
  'IN': { x: 330, y: 230 }, // Indiana
  'IA': { x: 280, y: 200 }, // Iowa
  'KS': { x: 250, y: 270 }, // Kansas
  'KY': { x: 340, y: 260 }, // Kentucky
  'LA': { x: 290, y: 370 }, // Louisiana
  'ME': { x: 480, y: 130 }, // Maine
  'MD': { x: 420, y: 230 }, // Maryland
  'MA': { x: 460, y: 170 }, // Massachusetts
  'MI': { x: 330, y: 180 }, // Michigan
  'MN': { x: 270, y: 150 }, // Minnesota
  'MS': { x: 310, y: 350 }, // Mississippi
  'MO': { x: 290, y: 270 }, // Missouri
  'MT': { x: 180, y: 140 }, // Montana
  'NE': { x: 250, y: 220 }, // Nebraska
  'NV': { x: 120, y: 220 }, // Nevada
  'NH': { x: 470, y: 150 }, // New Hampshire
  'NJ': { x: 440, y: 210 }, // New Jersey
  'NM': { x: 190, y: 320 }, // New Mexico
  'NY': { x: 420, y: 170 }, // New York
  'NC': { x: 390, y: 300 }, // North Carolina
  'ND': { x: 230, y: 130 }, // North Dakota
  'OH': { x: 360, y: 230 }, // Ohio
  'OK': { x: 250, y: 310 }, // Oklahoma
  'OR': { x: 100, y: 160 }, // Oregon
  'PA': { x: 400, y: 210 }, // Pennsylvania
  'RI': { x: 470, y: 180 }, // Rhode Island
  'SC': { x: 380, y: 330 }, // South Carolina
  'SD': { x: 230, y: 180 }, // South Dakota
  'TN': { x: 340, y: 300 }, // Tennessee
  'TX': { x: 230, y: 370 }, // Texas
  'UT': { x: 160, y: 230 }, // Utah
  'VT': { x: 450, y: 150 }, // Vermont
  'VA': { x: 400, y: 270 }, // Virginia
  'WA': { x: 120, y: 110 }, // Washington
  'WV': { x: 380, y: 250 }, // West Virginia
  'WI': { x: 300, y: 170 }, // Wisconsin
  'WY': { x: 200, y: 180 }, // Wyoming
  'DC': { x: 420, y: 240 }, // Washington DC
};

// Sample state data with candidate counts and intent percentages
const defaultStateData = {
  'CA': { count: 235, avgIntent: 72 },
  'TX': { count: 188, avgIntent: 68 },
  'NY': { count: 172, avgIntent: 75 },
  'FL': { count: 156, avgIntent: 64 },
  'IL': { count: 112, avgIntent: 70 },
  'PA': { count: 105, avgIntent: 67 },
  'OH': { count: 98, avgIntent: 65 },
  'GA': { count: 95, avgIntent: 71 },
  'NC': { count: 92, avgIntent: 69 },
  'MI': { count: 88, avgIntent: 66 },
  'NJ': { count: 85, avgIntent: 73 },
  'VA': { count: 82, avgIntent: 74 },
  'WA': { count: 79, avgIntent: 76 },
  'MA': { count: 75, avgIntent: 77 },
  'AZ': { count: 72, avgIntent: 63 },
  'IN': { count: 65, avgIntent: 62 },
  'TN': { count: 62, avgIntent: 64 },
  'MO': { count: 58, avgIntent: 61 },
  'MD': { count: 56, avgIntent: 72 },
  'WI': { count: 55, avgIntent: 68 },
  'MN': { count: 54, avgIntent: 71 },
  'CO': { count: 52, avgIntent: 75 },
  'AL': { count: 48, avgIntent: 63 },
  'SC': { count: 45, avgIntent: 65 },
  'LA': { count: 44, avgIntent: 61 },
  'KY': { count: 42, avgIntent: 62 },
  'OR': { count: 41, avgIntent: 73 },
  'OK': { count: 38, avgIntent: 60 },
  'CT': { count: 36, avgIntent: 74 },
  'IA': { count: 32, avgIntent: 63 },
  'MS': { count: 30, avgIntent: 59 },
  'AR': { count: 29, avgIntent: 60 },
  'KS': { count: 28, avgIntent: 62 },
  'UT': { count: 27, avgIntent: 69 },
  'NV': { count: 25, avgIntent: 68 },
  'NM': { count: 22, avgIntent: 64 },
  'NE': { count: 20, avgIntent: 61 },
  'WV': { count: 18, avgIntent: 59 },
  'ID': { count: 16, avgIntent: 66 },
  'HI': { count: 14, avgIntent: 70 },
  'ME': { count: 13, avgIntent: 68 },
  'NH': { count: 12, avgIntent: 72 },
  'RI': { count: 11, avgIntent: 71 },
  'MT': { count: 10, avgIntent: 65 },
  'DE': { count: 9, avgIntent: 67 },
  'SD': { count: 8, avgIntent: 62 },
  'AK': { count: 7, avgIntent: 64 },
  'ND': { count: 6, avgIntent: 60 },
  'VT': { count: 5, avgIntent: 71 },
  'WY': { count: 4, avgIntent: 63 },
  'DC': { count: 20, avgIntent: 78 },
};

interface USMapHeatmapProps {
  title?: string;
  description?: string;
  stateData?: Record<string, { count: number, avgIntent: number }>;
  width?: number;
  height?: number;
  showLegend?: boolean;
  showControls?: boolean;
}

export default function USMapHeatmap({
  title = "Candidate Geographic Distribution",
  description = "Shows candidate counts and average intent scores by state",
  stateData = defaultStateData,
  width = 550,
  height = 350,
  showLegend = true,
  showControls = true,
}: USMapHeatmapProps) {
  const [dataType, setDataType] = useState<'count' | 'intent'>('intent');
  const [showLabels, setShowLabels] = useState(true);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  
  // Calculate the maximum values for normalization
  const maxCount = Math.max(...Object.values(stateData).map(d => d.count));
  const maxIntent = 100; // Intent is a percentage, max is 100
  
  // Helper to calculate circle radius based on count
  const getCircleRadius = (count: number) => {
    const minRadius = 5;
    const maxRadius = 25;
    return minRadius + ((count / maxCount) * (maxRadius - minRadius));
  };
  
  // Helper to get color based on intent percentage
  const getIntentColor = (intent: number) => {
    // Create a gradient from blue to purple to red
    if (intent < 50) {
      return `rgba(66, 153, 225, ${intent / 50})`; // Blue with opacity based on intent
    } else if (intent < 75) {
      return `rgba(159, 122, 234, ${intent / 75})`; // Purple
    } else {
      return `rgba(237, 100, 166, ${intent / 100})`; // Pink
    }
  };
  
  // Helper to get background color based on count
  const getCountColor = (count: number) => {
    const opacity = Math.min(0.9, Math.max(0.1, count / maxCount));
    return `rgba(159, 122, 234, ${opacity})`; // Purple with opacity based on count
  };
  
  // Get the appropriate data value to display
  const getDataValue = (state: string) => {
    if (!stateData[state]) return null;
    
    if (dataType === 'count') {
      return stateData[state].count;
    } else {
      return stateData[state].avgIntent;
    }
  };
  
  // Get the appropriate tooltip text
  const getTooltipText = (state: string) => {
    if (!stateData[state]) return `${state}: No data`;
    
    return `${state}: ${stateData[state].count} candidates, ${stateData[state].avgIntent}% avg intent`;
  };
  
  return (
    <Box p={6} bg={bgColor} borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor}>
      <VStack align="start" spacing={4}>
        <Flex width="100%" justify="space-between" align="center">
          <HStack>
            <Heading size="sm">{title}</Heading>
            {description && (
              <Tooltip label={description}>
                <InfoIcon boxSize={3.5} color="gray.400" />
              </Tooltip>
            )}
          </HStack>
          
          {showControls && (
            <HStack>
              <Select 
                size="sm" 
                value={dataType}
                onChange={(e) => setDataType(e.target.value as 'count' | 'intent')}
                width="150px"
              >
                <option value="count">Candidate Count</option>
                <option value="intent">Intent Score</option>
              </Select>
              
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button
                  isActive={showLabels}
                  onClick={() => setShowLabels(!showLabels)}
                >
                  Labels
                </Button>
                <Tooltip label="Download as CSV">
                  <IconButton
                    aria-label="Download data"
                    icon={<DownloadIcon />}
                    size="sm"
                  />
                </Tooltip>
              </ButtonGroup>
            </HStack>
          )}
        </Flex>
        
        {/* US Map SVG Container */}
        <Box width="100%" height={`${height}px`} position="relative">
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            {/* State circles */}
            {Object.entries(stateCoordinates).map(([state, coords]) => {
              const dataValue = getDataValue(state);
              
              // Skip if no data for this state
              if (dataValue === null) return null;
              
              const circleRadius = getCircleRadius(stateData[state].count);
              const circleColor = dataType === 'intent' 
                ? getIntentColor(stateData[state].avgIntent)
                : getCountColor(stateData[state].count);
              
              return (
                <g key={state}>
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={circleRadius}
                    fill={circleColor}
                    stroke={useColorModeValue('white', 'gray.800')}
                    strokeWidth="1"
                  >
                    <title>{getTooltipText(state)}</title>
                  </circle>
                  
                  {showLabels && (
                    <text
                      x={coords.x}
                      y={coords.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={useColorModeValue('gray.800', 'white')}
                    >
                      {state}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </Box>
        
        {/* Legend */}
        {showLegend && (
          <Flex justify="center" w="100%" borderTopWidth="1px" borderColor={borderColor} pt={3}>
            <HStack spacing={4}>
              <VStack spacing={1} align="center">
                <Text fontSize="xs" fontWeight="medium">Size = Candidate Count</Text>
                <HStack spacing={2}>
                  <Box position="relative" width="20px" height="20px">
                    <Box position="absolute" top="7.5px" left="7.5px" width="5px" height="5px" borderRadius="full" bg="purple.400" />
                  </Box>
                  <Text fontSize="xs">Few</Text>
                  <Box position="relative" width="20px" height="20px">
                    <Box position="absolute" top="2.5px" left="2.5px" width="15px" height="15px" borderRadius="full" bg="purple.400" />
                  </Box>
                  <Text fontSize="xs">Many</Text>
                </HStack>
              </VStack>
              
              <Box height="30px" width="1px" bg={borderColor} />
              
              <VStack spacing={1} align="center">
                <Text fontSize="xs" fontWeight="medium">Color = Intent Score</Text>
                <HStack spacing={1}>
                  <Box width="15px" height="15px" bg="blue.400" borderRadius="sm" />
                  <Box width="15px" height="15px" bg="purple.400" borderRadius="sm" />
                  <Box width="15px" height="15px" bg="pink.400" borderRadius="sm" />
                  <Text fontSize="xs">Low → High</Text>
                </HStack>
              </VStack>
            </HStack>
          </Flex>
        )}
      </VStack>
    </Box>
  );
}