// lib/useSelectedAnalytics.tsx
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing selected analytics in localStorage
 * @param programId - Unique identifier for the program
 * @param defaultCharts - Default charts to use if none are stored
 * @param defaultHeatmaps - Default heatmaps to use if none are stored
 * @returns Object with selected analytics and update functions
 */
export function useSelectedAnalytics(
  programId: string, 
  defaultCharts: string[] = [], 
  defaultHeatmaps: string[] = []
) {
  // Storage keys for charts and heatmaps
  const chartsStorageKey = `program_analytics_charts_${programId}`;
  const heatmapsStorageKey = `program_analytics_heatmaps_${programId}`;
  
  // Initialize state with default values
  const [selectedCharts, setSelectedCharts] = useState<string[]>(defaultCharts);
  const [selectedHeatmaps, setSelectedHeatmaps] = useState<string[]>(defaultHeatmaps);
  
  // Load saved analytics from localStorage on initial render
  useEffect(() => {
    // Only run in the browser environment
    if (typeof window !== 'undefined') {
      try {
        // Load charts
        const savedCharts = localStorage.getItem(chartsStorageKey);
        if (savedCharts) {
          const parsedCharts = JSON.parse(savedCharts);
          // Make sure we have a valid array
          if (Array.isArray(parsedCharts)) {
            setSelectedCharts(parsedCharts);
          }
        }
        
        // Load heatmaps
        const savedHeatmaps = localStorage.getItem(heatmapsStorageKey);
        if (savedHeatmaps) {
          const parsedHeatmaps = JSON.parse(savedHeatmaps);
          // Make sure we have a valid array
          if (Array.isArray(parsedHeatmaps)) {
            setSelectedHeatmaps(parsedHeatmaps);
          }
        }
      } catch (error) {
        console.error('Error loading analytics from localStorage:', error);
        // Fall back to default values in case of error
        setSelectedCharts(defaultCharts);
        setSelectedHeatmaps(defaultHeatmaps);
      }
    }
  }, [chartsStorageKey, heatmapsStorageKey, defaultCharts, defaultHeatmaps]);

  // Update selected charts and save to localStorage
  const updateSelectedCharts = (newCharts: string[]) => {
    setSelectedCharts(newCharts);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(chartsStorageKey, JSON.stringify(newCharts));
      } catch (error) {
        console.error('Error saving charts to localStorage:', error);
      }
    }
  };
  
  // Update selected heatmaps and save to localStorage
  const updateSelectedHeatmaps = (newHeatmaps: string[]) => {
    setSelectedHeatmaps(newHeatmaps);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(heatmapsStorageKey, JSON.stringify(newHeatmaps));
      } catch (error) {
        console.error('Error saving heatmaps to localStorage:', error);
      }
    }
  };

  return {
    selectedCharts,
    selectedHeatmaps,
    updateSelectedCharts,
    updateSelectedHeatmaps
  };
}