// components/common/MetricSelector.tsx
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Checkbox,
  VStack,
  Button,
  DrawerFooter,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  Badge,
  Text,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
// You'll need to create this file - let's make a placeholder for now
import { METRICS, METRIC_CATEGORIES } from '@/lib/metricsLibrary';

interface MetricSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMetrics: string[];
  onUpdate: (selected: string[]) => void;
}

export default function MetricSelector({
  isOpen,
  onClose,
  selectedMetrics,
  onUpdate,
}: MetricSelectorProps) {
  const [localSelection, setLocalSelection] = useState<string[]>([]);
  const accentColor = useColorModeValue('purple.500', 'purple.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const bgActive = useColorModeValue('purple.50', 'purple.900');

  useEffect(() => {
    setLocalSelection(selectedMetrics);
  }, [selectedMetrics]);

  const toggleMetric = (key: string) => {
    setLocalSelection(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // Group metrics by category for better organization
  const metricsByCategory = Object.entries(METRICS).reduce((acc, [key, metric]) => {
    const category = metric.category || 'general';
    if (!acc[category]) acc[category] = [];
    acc[category].push({ key, ...metric });
    return acc;
  }, {});

  // Select all metrics in a category
  const selectAllInCategory = (category: string) => {
    const categoryMetricKeys = metricsByCategory[category].map(m => m.key);
    const newSelection = [...localSelection];
    
    categoryMetricKeys.forEach(key => {
      if (!newSelection.includes(key)) {
        newSelection.push(key);
      }
    });
    
    setLocalSelection(newSelection);
  };

  // Deselect all metrics in a category
  const deselectAllInCategory = (category: string) => {
    const categoryMetricKeys = metricsByCategory[category].map(m => m.key);
    setLocalSelection(prev => prev.filter(key => !categoryMetricKeys.includes(key)));
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      placement="right" 
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Customize Dashboard Metrics
        </DrawerHeader>
        
        <DrawerBody>
          <Text fontSize="sm" color={textColor} mb={4}>
            Select metrics to display on your dashboard. You can choose up to 12 metrics.
          </Text>
          
          <Accordion allowToggle defaultIndex={[0]} mb={4}>
            {Object.entries(METRIC_CATEGORIES).map(([categoryKey, categoryName]) => {
              const categoryMetrics = metricsByCategory[categoryKey] || [];
              if (categoryMetrics.length === 0) return null;
              
              // Check if all metrics in this category are selected
              const allSelected = categoryMetrics.every(m => localSelection.includes(m.key));
              const someSelected = categoryMetrics.some(m => localSelection.includes(m.key));
              
              return (
                <AccordionItem key={categoryKey}>
                  <AccordionButton py={3}>
                    <Box flex="1" textAlign="left" fontWeight="medium">
                      {categoryName}
                    </Box>
                    <HStack spacing={2}>
                      <Badge colorScheme={someSelected ? "purple" : "gray"}>
                        {categoryMetrics.filter(m => localSelection.includes(m.key)).length} / {categoryMetrics.length}
                      </Badge>
                      <AccordionIcon />
                    </HStack>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <HStack mb={3} justify="flex-end">
                      <Button 
                        size="xs" 
                        onClick={() => selectAllInCategory(categoryKey)}
                        colorScheme="purple"
                        variant="outline"
                      >
                        Select All
                      </Button>
                      <Button 
                        size="xs" 
                        onClick={() => deselectAllInCategory(categoryKey)}
                        variant="outline"
                      >
                        Deselect All
                      </Button>
                    </HStack>
                    
                    <VStack align="start" spacing={3}>
                      {categoryMetrics.map(metric => (
                        <HStack 
                          key={metric.key} 
                          w="100%" 
                          p={2} 
                          borderRadius="md"
                          bg={localSelection.includes(metric.key) ? bgActive : 'transparent'}
                          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                        >
                          <Checkbox
                            colorScheme="purple"
                            isChecked={localSelection.includes(metric.key)}
                            onChange={() => toggleMetric(metric.key)}
                          >
                            <Text fontWeight={metric.isImportant ? "medium" : "normal"}>
                              {metric.title}
                              {metric.isImportant && (
                                <Badge ml={2} colorScheme="purple" variant="subtle">Key</Badge>
                              )}
                            </Text>
                          </Checkbox>
                          
                          {metric.description && (
                            <Tooltip label={metric.description} placement="top">
                              <InfoIcon ml="auto" boxSize={3.5} color="gray.400" />
                            </Tooltip>
                          )}
                        </HStack>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
          
          <Box mt={4} p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md" fontSize="sm">
            <Text fontWeight="medium" mb={1}>Selected: {localSelection.length} metrics</Text>
            <Text color={textColor}>
              Displaying too many metrics can make your dashboard cluttered. We recommend 6-8 metrics for optimal visibility.
            </Text>
          </Box>
        </DrawerBody>
        
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="purple" 
            onClick={() => { 
              onUpdate(localSelection); 
              onClose(); 
            }}
          >
            Apply Changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}