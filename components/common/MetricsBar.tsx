// components/common/MetricsBar.tsx
import React from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
  Text,
  Divider,
  Flex,
  Badge,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

// Mini sparkline component using SVG
const MiniSparkline = ({ data, color, height = 20, width = 60 }) => {
  const normalizedData = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - (val / Math.max(...data)) * height
  }));

  // Create the SVG path
  const pathD = normalizedData.reduce((path, point, i) => {
    return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
  }, '');

  return (
    <Box height={`${height}px`} width={`${width}px`} ml={2}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    </Box>
  );
};

export interface Metric {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
  category?: 'engagement' | 'conversion' | 'activity' | 'general';
  description?: string;
  isImportant?: boolean;
}

interface MetricsBarProps {
  metrics: Metric[];
  showSparklines?: boolean;
  groupByCategory?: boolean;
}

export default function MetricsBar({
  metrics,
  showSparklines = true,
  groupByCategory = true
}: MetricsBarProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.500', 'gray.400');
  
  // Functions to determine color based on trend
  const getArrowColor = (trend?: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return 'green.400';
    if (trend === 'down') return 'red.400';
    return 'gray.400';
  };
  
  const getSparklineColor = (trend?: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return '#48BB78'; // green.400
    if (trend === 'down') return '#F56565'; // red.400
    return '#A0AEC0'; // gray.400
  };

  // Group metrics by category if needed
  const renderMetrics = () => {
    if (!groupByCategory) {
      return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {metrics.map((metric, index) => renderMetricCard(metric, index))}
        </SimpleGrid>
      );
    }

    // Group by category
    const categories = {
      engagement: { title: 'Engagement', metrics: [] },
      conversion: { title: 'Conversion', metrics: [] },
      activity: { title: 'Activity', metrics: [] },
      general: { title: 'General', metrics: [] }
    };

    // Sort metrics into categories
    metrics.forEach(metric => {
      const category = metric.category || 'general';
      categories[category].metrics.push(metric);
    });

    return (
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {Object.entries(categories).map(([catKey, category]) => {
          if (category.metrics.length === 0) return null;
          
          return (
            <Box key={catKey} borderWidth="1px" borderColor={borderColor} borderRadius="md" p={4}>
              <Text fontSize="sm" fontWeight="medium" color={headingColor} mb={3}>
                {category.title}
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {category.metrics.map((metric, idx) => renderMetricCard(metric, idx))}
              </SimpleGrid>
            </Box>
          );
        })}
      </SimpleGrid>
    );
  };

  // Render individual metric card
  const renderMetricCard = (metric: Metric, index: number) => (
    <Box 
      key={index} 
      p={4} 
      bg={cardBg} 
      borderRadius="md" 
      shadow="sm"
      borderLeft={metric.isImportant ? "4px solid" : "none"}
      borderColor={metric.isImportant ? "purple.500" : "transparent"}
    >
      <Flex justify="space-between" align="start">
        <Stat>
          <HStack spacing={1}>
            <StatLabel color={textColor}>{metric.title}</StatLabel>
            {metric.description && (
              <Tooltip label={metric.description} placement="top">
                <InfoIcon boxSize={3} color="gray.400" />
              </Tooltip>
            )}
          </HStack>
          <StatNumber fontSize="2xl">{metric.value}</StatNumber>
          {metric.change && (
            <HStack spacing={1} mt={1}>
              <StatHelpText mb={0}>
                <StatArrow type={metric.trend === 'up' ? 'increase' : 'decrease'} />
                {metric.change}
              </StatHelpText>
              {metric.sparklineData && showSparklines && (
                <MiniSparkline 
                  data={metric.sparklineData} 
                  color={getSparklineColor(metric.trend)} 
                />
              )}
            </HStack>
          )}
        </Stat>
        {metric.isImportant && (
          <Badge colorScheme="purple" variant="subtle" mt={1}>
            Key
          </Badge>
        )}
      </Flex>
    </Box>
  );

  return (
    <Box py={4}>
      {renderMetrics()}
    </Box>
  );
}