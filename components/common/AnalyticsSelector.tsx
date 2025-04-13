// components/common/AnalyticsSelector.tsx
import React, { useEffect, useState } from 'react';
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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

// Import analytics library
import { 
  ANALYTICS_CATEGORIES, 
  CHART_CONFIGS, 
  HEATMAP_CONFIGS 
} from '@/lib/analyticsLibrary';

interface AnalyticsSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCharts: string[];
  selectedHeatmaps: string[];
  onUpdateCharts: (selected: string[]) => void;
  onUpdateHeatmaps: (selected: string[]) => void;
}

export default function AnalyticsSelector({
  isOpen,
  onClose,
  selectedCharts,
  selectedHeatmaps,
  onUpdateCharts,
  onUpdateHeatmaps,
}: AnalyticsSelectorProps) {
  // State for local selection
  const [localCharts, setLocalCharts] = useState<string[]>([]);
  const [localHeatmaps, setLocalHeatmaps] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  
  // Colors
  const accentColor = useColorModeValue('purple.500', 'purple.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const bgActive = useColorModeValue('purple.50', 'purple.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Initialize local state when the drawer opens
  useEffect(() => {
    setLocalCharts(selectedCharts);
    setLocalHeatmaps(selectedHeatmaps);
  }, [selectedCharts, selectedHeatmaps, isOpen]);

  // Toggle chart selection
  const toggleChart = (key: string) => {
    setLocalCharts(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };
  
  // Toggle heatmap selection
  const toggleHeatmap = (key: string) => {
    setLocalHeatmaps(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // Group charts by category for better organization
  const chartsByCategory = Object.entries(CHART_CONFIGS).reduce((acc, [key, chart]) => {
    const category = chart.category || 'performance';
    if (!acc[category]) acc[category] = [];
    acc[category].push({ key, ...chart });
    return acc;
  }, {} as Record<string, any[]>);
  
  // Group heatmaps by category
  const heatmapsByCategory = Object.entries(HEATMAP_CONFIGS).reduce((acc, [key, heatmap]) => {
    const category = heatmap.category || 'distribution';
    if (!acc[category]) acc[category] = [];
    acc[category].push({ key, ...heatmap });
    return acc;
  }, {} as Record<string, any[]>);

  // Select all charts in a category
  const selectAllChartsInCategory = (category: string) => {
    const categoryChartKeys = chartsByCategory[category]?.map(c => c.key) || [];
    const newSelection = [...localCharts];
    
    categoryChartKeys.forEach(key => {
      if (!newSelection.includes(key)) {
        newSelection.push(key);
      }
    });
    
    setLocalCharts(newSelection);
  };

  // Deselect all charts in a category
  const deselectAllChartsInCategory = (category: string) => {
    const categoryChartKeys = chartsByCategory[category]?.map(c => c.key) || [];
    setLocalCharts(prev => prev.filter(key => !categoryChartKeys.includes(key)));
  };
  
  // Select all heatmaps in a category
  const selectAllHeatmapsInCategory = (category: string) => {
    const categoryHeatmapKeys = heatmapsByCategory[category]?.map(h => h.key) || [];
    const newSelection = [...localHeatmaps];
    
    categoryHeatmapKeys.forEach(key => {
      if (!newSelection.includes(key)) {
        newSelection.push(key);
      }
    });
    
    setLocalHeatmaps(newSelection);
  };

  // Deselect all heatmaps in a category
  const deselectAllHeatmapsInCategory = (category: string) => {
    const categoryHeatmapKeys = heatmapsByCategory[category]?.map(h => h.key) || [];
    setLocalHeatmaps(prev => prev.filter(key => !categoryHeatmapKeys.includes(key)));
  };

  // Save changes and close
  const saveChanges = () => {
    onUpdateCharts(localCharts);
    onUpdateHeatmaps(localHeatmaps);
    onClose();
  };

  // Render charts selection
  const renderChartsSelection = () => {
    return (
      <>
        <Text fontSize="sm" color={textColor} mb={4}>
          Select charts to display on your dashboard. Choose the charts that best represent your program's performance.
        </Text>
        
        <Accordion allowMultiple defaultIndex={[0]} mb={4}>
          {Object.entries(ANALYTICS_CATEGORIES).map(([categoryKey, categoryName]) => {
            const categoryCharts = chartsByCategory[categoryKey] || [];
            if (categoryCharts.length === 0) return null;
            
            // Check if all charts in this category are selected
            const allSelected = categoryCharts.every(c => localCharts.includes(c.key));
            const someSelected = categoryCharts.some(c => localCharts.includes(c.key));
            
            return (
              <AccordionItem key={categoryKey}>
                <AccordionButton py={3}>
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    {categoryName} Charts
                  </Box>
                  <HStack spacing={2}>
                    <Badge colorScheme={someSelected ? "purple" : "gray"}>
                      {categoryCharts.filter(c => localCharts.includes(c.key)).length} / {categoryCharts.length}
                    </Badge>
                    <AccordionIcon />
                  </HStack>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <HStack mb={3} justify="flex-end">
                    <Button 
                      size="xs" 
                      onClick={() => selectAllChartsInCategory(categoryKey)}
                      colorScheme="purple"
                      variant="outline"
                    >
                      Select All
                    </Button>
                    <Button 
                      size="xs" 
                      onClick={() => deselectAllChartsInCategory(categoryKey)}
                      variant="outline"
                    >
                      Deselect All
                    </Button>
                  </HStack>
                  
                  <VStack align="start" spacing={3}>
                    {categoryCharts.map(chart => (
                      <HStack 
                        key={chart.key} 
                        w="100%" 
                        p={2} 
                        borderRadius="md"
                        bg={localCharts.includes(chart.key) ? bgActive : 'transparent'}
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                      >
                        <Checkbox
                          colorScheme="purple"
                          isChecked={localCharts.includes(chart.key)}
                          onChange={() => toggleChart(chart.key)}
                        >
                          <Text fontWeight={chart.isImportant ? "medium" : "normal"}>
                            {chart.title}
                            {chart.isImportant && (
                              <Badge ml={2} colorScheme="purple" variant="subtle">Key</Badge>
                            )}
                          </Text>
                        </Checkbox>
                        
                        {chart.description && (
                          <Tooltip label={chart.description} placement="top">
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
      </>
    );
  };
  
  // Render heatmaps selection
  const renderHeatmapsSelection = () => {
    return (
      <>
        <Text fontSize="sm" color={textColor} mb={4}>
          Select heatmaps to display on your dashboard. Heatmaps are great for visualizing distributions and relationships.
        </Text>
        
        <Accordion allowMultiple defaultIndex={[0]} mb={4}>
          {Object.entries(ANALYTICS_CATEGORIES).map(([categoryKey, categoryName]) => {
            const categoryHeatmaps = heatmapsByCategory[categoryKey] || [];
            if (categoryHeatmaps.length === 0) return null;
            
            // Check if all heatmaps in this category are selected
            const allSelected = categoryHeatmaps.every(h => localHeatmaps.includes(h.key));
            const someSelected = categoryHeatmaps.some(h => localHeatmaps.includes(h.key));
            
            return (
              <AccordionItem key={categoryKey}>
                <AccordionButton py={3}>
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    {categoryName} Heatmaps
                  </Box>
                  <HStack spacing={2}>
                    <Badge colorScheme={someSelected ? "purple" : "gray"}>
                      {categoryHeatmaps.filter(h => localHeatmaps.includes(h.key)).length} / {categoryHeatmaps.length}
                    </Badge>
                    <AccordionIcon />
                  </HStack>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <HStack mb={3} justify="flex-end">
                    <Button 
                      size="xs" 
                      onClick={() => selectAllHeatmapsInCategory(categoryKey)}
                      colorScheme="purple"
                      variant="outline"
                    >
                      Select All
                    </Button>
                    <Button 
                      size="xs" 
                      onClick={() => deselectAllHeatmapsInCategory(categoryKey)}
                      variant="outline"
                    >
                      Deselect All
                    </Button>
                  </HStack>
                  
                  <VStack align="start" spacing={3}>
                    {categoryHeatmaps.map(heatmap => (
                      <HStack 
                        key={heatmap.key} 
                        w="100%" 
                        p={2} 
                        borderRadius="md"
                        bg={localHeatmaps.includes(heatmap.key) ? bgActive : 'transparent'}
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                      >
                        <Checkbox
                          colorScheme="purple"
                          isChecked={localHeatmaps.includes(heatmap.key)}
                          onChange={() => toggleHeatmap(heatmap.key)}
                        >
                          <Text fontWeight={heatmap.isImportant ? "medium" : "normal"}>
                            {heatmap.title}
                            {heatmap.isImportant && (
                              <Badge ml={2} colorScheme="purple" variant="subtle">Key</Badge>
                            )}
                          </Text>
                        </Checkbox>
                        
                        {heatmap.description && (
                          <Tooltip label={heatmap.description} placement="top">
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
      </>
    );
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
        <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
          Customize Analytics Dashboard
        </DrawerHeader>
        
        <DrawerBody>
          <Tabs colorScheme="purple" index={tabIndex} onChange={setTabIndex} mb={4}>
            <TabList>
              <Tab>Charts</Tab>
              <Tab>Heatmaps</Tab>
            </TabList>
            
            <TabPanels mt={4}>
              <TabPanel px={0}>
                {renderChartsSelection()}
              </TabPanel>
              <TabPanel px={0}>
                {renderHeatmapsSelection()}
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          <Box mt={4} p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md" fontSize="sm">
            <Text fontWeight="medium" mb={1}>
              Selected: {localCharts.length} charts, {localHeatmaps.length} heatmaps
            </Text>
            <Text color={textColor}>
              For optimal dashboard performance, we recommend selecting 3-4 charts and 1-2 heatmaps that are most relevant to your program.
            </Text>
          </Box>
        </DrawerBody>
        
        <DrawerFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="purple" 
            onClick={saveChanges}
          >
            Apply Changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}