// lib/analyticsLibrary.tsx
import { ChartDataset } from 'chart.js';

// Chart data types
export interface ChartDataConfig {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartConfig {
  title: string;
  description?: string;
  type: 'line' | 'bar' | 'area';
  timeRanges: {
    [key: string]: ChartDataConfig;
  };
  options?: any;
  isImportant?: boolean;
  category?: string;
}

// Heatmap data types
export interface HeatMapDataPoint {
  x: string;
  y: string;
  v: number;
}

export interface HeatMapConfig {
  id: string;
  title: string;
  description?: string;
  xLabels: string[];
  yLabels: string[];
  data: HeatMapDataPoint[];
  colorScale?: [string, string, string, string]; // Color progression
  isImportant?: boolean;
  category?: string;
}

// Categories of analytics
export const ANALYTICS_CATEGORIES = {
  performance: 'Performance',
  distribution: 'Distribution',
  conversion: 'Conversion',
  prediction: 'Prediction'
};

// Predefined chart configurations
export const CHART_CONFIGS: Record<string, ChartConfig> = {
  intent_activity: {
    title: 'Intent Activity',
    description: 'Measures user interest and engagement over time',
    type: 'area',
    category: 'performance',
    isImportant: true,
    timeRanges: {
      '7days': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Intent Score',
          data: [42, 46, 45, 58, 62, 65, 72],
          backgroundColor: 'rgba(98, 0, 238, 0.1)',
          borderColor: '#6200ee',
          tension: 0.4,
          fill: true,
        }]
      },
      '30days': {
        labels: ['W1', 'W2', 'W3', 'W4'],
        datasets: [{
          label: 'Intent Score',
          data: [45, 58, 62, 81],
          backgroundColor: 'rgba(98, 0, 238, 0.1)',
          borderColor: '#6200ee',
          tension: 0.4,
          fill: true,
        }]
      },
      '90days': {
        labels: ['Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Intent Score',
          data: [38, 55, 72],
          backgroundColor: 'rgba(98, 0, 238, 0.1)',
          borderColor: '#6200ee',
          tension: 0.4,
          fill: true,
        }]
      }
    }
  },
  capability_strength: {
    title: 'Capability Strength',
    description: 'Distribution of candidate skills and capabilities',
    type: 'bar',
    category: 'distribution',
    timeRanges: {
      '7days': {
        labels: ['Python', 'ML/AI', 'Stats', 'Cyber', 'Data'],
        datasets: [{
          label: 'Signal Strength',
          data: [78, 92, 84, 73, 69],
          backgroundColor: '#03dac6',
        }]
      },
      '30days': {
        labels: ['Python', 'ML/AI', 'Stats', 'Cyber', 'Data'],
        datasets: [{
          label: 'Signal Strength',
          data: [75, 88, 82, 70, 68],
          backgroundColor: '#03dac6',
        }]
      },
      '90days': {
        labels: ['Python', 'ML/AI', 'Stats', 'Cyber', 'Data'],
        datasets: [{
          label: 'Signal Strength',
          data: [68, 79, 75, 68, 62],
          backgroundColor: '#03dac6',
        }]
      }
    }
  },
  conversion_funnel: {
    title: 'Conversion Funnel',
    description: 'Tracks movement through recruitment stages',
    type: 'bar',
    category: 'conversion',
    isImportant: true,
    timeRanges: {
      '7days': {
        labels: ['Aware', 'Interest', 'Apply', 'Accept'],
        datasets: [{
          label: 'Candidates',
          data: [120, 85, 42, 24],
          backgroundColor: '#bb86fc',
        }]
      },
      '30days': {
        labels: ['Aware', 'Interest', 'Apply', 'Accept'],
        datasets: [{
          label: 'Candidates',
          data: [320, 195, 86, 48],
          backgroundColor: '#bb86fc',
        }]
      },
      '90days': {
        labels: ['Aware', 'Interest', 'Apply', 'Accept'],
        datasets: [{
          label: 'Candidates',
          data: [580, 385, 180, 95],
          backgroundColor: '#bb86fc',
        }]
      }
    }
  },
  response_rate: {
    title: 'Response Over Time',
    description: 'Shows candidate response rates to outreach efforts',
    type: 'line',
    category: 'performance',
    timeRanges: {
      '7days': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Response Rate',
          data: [52, 54, 59, 63, 58, 56, 60],
          backgroundColor: 'rgba(3, 218, 198, 0.1)',
          borderColor: '#03dac6',
          tension: 0.4,
        }]
      },
      '30days': {
        labels: ['W1', 'W2', 'W3', 'W4'],
        datasets: [{
          label: 'Response Rate',
          data: [54, 58, 62, 64],
          backgroundColor: 'rgba(3, 218, 198, 0.1)',
          borderColor: '#03dac6',
          tension: 0.4,
        }]
      },
      '90days': {
        labels: ['Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Response Rate',
          data: [48, 56, 65],
          backgroundColor: 'rgba(3, 218, 198, 0.1)',
          borderColor: '#03dac6',
          tension: 0.4,
        }]
      }
    }
  },
  enrollment_forecast: {
    title: 'Enrollment Forecast',
    description: 'Predicted enrollment numbers for upcoming periods',
    type: 'line',
    category: 'prediction',
    timeRanges: {
      '7days': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Forecast',
          data: [15, 18, 22, 19, 24, 28, 32],
          backgroundColor: 'rgba(187, 134, 252, 0.1)',
          borderColor: '#bb86fc',
          tension: 0.4,
          borderDash: [5, 5]
        },
        {
          label: 'Actual',
          data: [16, 20, 24, 18, 25, 30, 31],
          backgroundColor: 'rgba(98, 0, 238, 0.1)',
          borderColor: '#6200ee',
          tension: 0.4,
        }]
      },
      '30days': {
        labels: ['W1', 'W2', 'W3', 'W4'],
        datasets: [{
          label: 'Forecast',
          data: [42, 55, 63, 72],
          backgroundColor: 'rgba(187, 134, 252, 0.1)',
          borderColor: '#bb86fc',
          tension: 0.4,
          borderDash: [5, 5]
        },
        {
          label: 'Actual',
          data: [45, 52, 68, 76],
          backgroundColor: 'rgba(98, 0, 238, 0.1)',
          borderColor: '#6200ee',
          tension: 0.4,
        }]
      },
      '90days': {
        labels: ['Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Forecast',
          data: [120, 145, 170],
          backgroundColor: 'rgba(187, 134, 252, 0.1)',
          borderColor: '#bb86fc',
          tension: 0.4,
          borderDash: [5, 5]
        },
        {
          label: 'Actual',
          data: [124, 152, 168],
          backgroundColor: 'rgba(98, 0, 238, 0.1)',
          borderColor: '#6200ee',
          tension: 0.4,
        }]
      }
    }
  }
};

// Heat map configurations
export const HEATMAP_CONFIGS: Record<string, HeatMapConfig> = {
  geographic_distribution: {
    id: 'geographic-distribution',
    title: 'Geographic Distribution',
    description: 'Shows candidate locations and intent levels across the United States',
    category: 'distribution',
    isImportant: true,
    xLabels: [], // This is a special heatmap type that uses a different rendering approach
    yLabels: [],
    data: [], // Data is handled internally by the USMapHeatmap component
    colorScale: ['#63b3ed', '#9f7aea', '#ed64a6']
  },
  intent_capability: {
    id: 'intent-capability',
    title: 'Intent × Capability Matrix',
    description: 'Shows the relationship between candidate intent level and their capabilities',
    category: 'distribution',
    isImportant: true,
    xLabels: ['Low Intent', 'Medium Intent', 'High Intent'],
    yLabels: ['Python', 'ML/AI', 'Stats', 'Cyber', 'Data Viz'],
    data: [
      { x: 'Low Intent', y: 'Python', v: 4 },
      { x: 'Medium Intent', y: 'Python', v: 7 },
      { x: 'High Intent', y: 'Python', v: 11 },
      { x: 'Low Intent', y: 'ML/AI', v: 3 },
      { x: 'Medium Intent', y: 'ML/AI', v: 6 },
      { x: 'High Intent', y: 'ML/AI', v: 10 },
      { x: 'Low Intent', y: 'Stats', v: 2 },
      { x: 'Medium Intent', y: 'Stats', v: 5 },
      { x: 'High Intent', y: 'Stats', v: 8 },
      { x: 'Low Intent', y: 'Cyber', v: 1 },
      { x: 'Medium Intent', y: 'Cyber', v: 4 },
      { x: 'High Intent', y: 'Cyber', v: 7 },
      { x: 'Low Intent', y: 'Data Viz', v: 2 },
      { x: 'Medium Intent', y: 'Data Viz', v: 6 },
      { x: 'High Intent', y: 'Data Viz', v: 9 },
    ],
    colorScale: ['#ffebee', '#f48fb1', '#f06292', '#c2185b']
  },
  program_interest: {
    id: 'program-interest',
    title: 'Program Interest Distribution',
    description: 'Shows candidate interest levels across different programs and departments',
    category: 'distribution',
    xLabels: ['Low', 'Medium', 'High'],
    yLabels: ['Computer Science', 'Data Science', 'Cybersecurity', 'AI/ML', 'Software Eng'],
    data: [
      { x: 'Low', y: 'Computer Science', v: 5 },
      { x: 'Medium', y: 'Computer Science', v: 8 },
      { x: 'High', y: 'Computer Science', v: 14 },
      { x: 'Low', y: 'Data Science', v: 4 },
      { x: 'Medium', y: 'Data Science', v: 9 },
      { x: 'High', y: 'Data Science', v: 12 },
      { x: 'Low', y: 'Cybersecurity', v: 3 },
      { x: 'Medium', y: 'Cybersecurity', v: 6 },
      { x: 'High', y: 'Cybersecurity', v: 9 },
      { x: 'Low', y: 'AI/ML', v: 2 },
      { x: 'Medium', y: 'AI/ML', v: 8 },
      { x: 'High', y: 'AI/ML', v: 15 },
      { x: 'Low', y: 'Software Eng', v: 6 },
      { x: 'Medium', y: 'Software Eng', v: 10 },
      { x: 'High', y: 'Software Eng', v: 11 },
    ],
    colorScale: ['#e3f2fd', '#90caf9', '#42a5f5', '#1565c0']
  },
  conversion_stage: {
    id: 'conversion-stage',
    title: 'Conversion Stage Analysis',
    description: 'Shows candidate counts at different conversion stages by program',
    category: 'conversion',
    isImportant: true,
    xLabels: ['Awareness', 'Interest', 'Application', 'Accepted'],
    yLabels: ['Computer Science', 'Data Science', 'Cybersecurity', 'AI/ML', 'Software Eng'],
    data: [
      { x: 'Awareness', y: 'Computer Science', v: 24 },
      { x: 'Interest', y: 'Computer Science', v: 18 },
      { x: 'Application', y: 'Computer Science', v: 12 },
      { x: 'Accepted', y: 'Computer Science', v: 8 },
      { x: 'Awareness', y: 'Data Science', v: 28 },
      { x: 'Interest', y: 'Data Science', v: 22 },
      { x: 'Application', y: 'Data Science', v: 15 },
      { x: 'Accepted', y: 'Data Science', v: 10 },
      { x: 'Awareness', y: 'Cybersecurity', v: 20 },
      { x: 'Interest', y: 'Cybersecurity', v: 15 },
      { x: 'Application', y: 'Cybersecurity', v: 8 },
      { x: 'Accepted', y: 'Cybersecurity', v: 5 },
      { x: 'Awareness', y: 'AI/ML', v: 22 },
      { x: 'Interest', y: 'AI/ML', v: 17 },
      { x: 'Application', y: 'AI/ML', v: 12 },
      { x: 'Accepted', y: 'AI/ML', v: 9 },
      { x: 'Awareness', y: 'Software Eng', v: 26 },
      { x: 'Interest', y: 'Software Eng', v: 20 },
      { x: 'Application', y: 'Software Eng', v: 14 },
      { x: 'Accepted', y: 'Software Eng', v: 11 },
    ],
    colorScale: ['#e8f5e9', '#a5d6a7', '#66bb6a', '#2e7d32']
  },
  demographic_distribution: {
    id: 'demographic-distribution',
    title: 'Demographic Distribution',
    description: 'Shows the distribution of candidates across different demographic factors',
    category: 'distribution',
    xLabels: ['18-24', '25-34', '35-44', '45+'],
    yLabels: ['Urban', 'Suburban', 'Rural', 'International'],
    data: [
      { x: '18-24', y: 'Urban', v: 18 },
      { x: '25-34', y: 'Urban', v: 24 },
      { x: '35-44', y: 'Urban', v: 12 },
      { x: '45+', y: 'Urban', v: 6 },
      { x: '18-24', y: 'Suburban', v: 14 },
      { x: '25-34', y: 'Suburban', v: 20 },
      { x: '35-44', y: 'Suburban', v: 15 },
      { x: '45+', y: 'Suburban', v: 8 },
      { x: '18-24', y: 'Rural', v: 7 },
      { x: '25-34', y: 'Rural', v: 10 },
      { x: '35-44', y: 'Rural', v: 8 },
      { x: '45+', y: 'Rural', v: 5 },
      { x: '18-24', y: 'International', v: 12 },
      { x: '25-34', y: 'International', v: 16 },
      { x: '35-44', y: 'International', v: 6 },
      { x: '45+', y: 'International', v: 2 },
    ],
    colorScale: ['#fff8e1', '#ffecb3', '#ffd54f', '#ffb300']
  }
};

// Default analytics to show on first load
export const DEFAULT_CHARTS = [
  'intent_activity',
  'conversion_funnel',
  'capability_strength',
  'response_rate'
];

export const DEFAULT_HEATMAPS = [
  'geographic_distribution',
  'intent_capability',
  'conversion_stage'
];