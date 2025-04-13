// lib/useSelectedMetrics.ts
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing selected metrics in localStorage
 * @param programId - Unique identifier for the program
 * @param defaultMetrics - Default metrics to use if none are stored
 * @returns Object with selected metrics and update function
 */
export function useSelectedMetrics(programId: string, defaultMetrics: string[]) {
  // Always initialize with default metrics
  const storageKey = `program_metrics_${programId}`;
  const [selected, setSelected] = useState<string[]>(defaultMetrics || []);
  
  // Load saved metrics from localStorage on initial render
  useEffect(() => {
    // Only run in the browser environment
    if (typeof window !== 'undefined') {
      try {
        const savedMetrics = localStorage.getItem(storageKey);
        if (savedMetrics) {
          const parsedMetrics = JSON.parse(savedMetrics);
          // Make sure we have a valid array
          if (Array.isArray(parsedMetrics)) {
            setSelected(parsedMetrics);
          }
        }
      } catch (error) {
        console.error('Error loading metrics from localStorage:', error);
        // Fall back to default metrics in case of error
        setSelected(defaultMetrics || []);
      }
    }
  }, [storageKey, defaultMetrics]);

  // Update selected metrics and save to localStorage
  const updateSelected = (newSelection: string[]) => {
    setSelected(newSelection);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newSelection));
      } catch (error) {
        console.error('Error saving metrics to localStorage:', error);
      }
    }
  };

  return {
    selected,
    updateSelected
  };
}