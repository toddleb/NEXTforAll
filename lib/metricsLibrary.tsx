// lib/metricsLibrary.ts
import { Metric } from '@/components/common/MetricsBar';

// Categories of metrics
export const METRIC_CATEGORIES = {
  engagement: 'Engagement',
  conversion: 'Conversion',
  activity: 'Activity',
  general: 'General'
};

// Sample metrics data
export const METRICS = {
  impression_rate: {
    title: 'Impression Rate',
    value: '84%',
    change: '12.5%',
    trend: 'up',
    category: 'engagement',
    sparklineData: [12, 15, 18, 14, 20, 25, 22],
    description: 'The percentage of users who viewed your program details',
    isImportant: true
  },
  click_through_rate: {
    title: 'Click-Through Rate',
    value: '21.3%',
    change: '3.2%',
    trend: 'up',
    category: 'engagement',
    sparklineData: [15, 12, 14, 18, 20, 22, 25]
  },
  application_completion: {
    title: 'Application Completion',
    value: '62.7%',
    change: '5.8%',
    trend: 'down',
    category: 'conversion',
    sparklineData: [65, 62, 58, 60, 55, 58, 54],
    description: 'Percentage of started applications that are completed',
    isImportant: true
  },
  average_session: {
    title: 'Avg. Session Duration',
    value: '4:32',
    change: '0:48',
    trend: 'up',
    category: 'engagement',
    sparklineData: [3.5, 3.8, 4.1, 3.9, 4.2, 4.5, 4.8]
  },
  new_signups: {
    title: 'New Signups',
    value: '287',
    change: '16.4%',
    trend: 'up',
    category: 'conversion',
    sparklineData: [220, 245, 260, 248, 265, 280, 295],
    isImportant: true
  },
  conversion_rate: {
    title: 'Conversion Rate',
    value: '8.3%',
    change: '1.2%',
    trend: 'up',
    category: 'conversion',
    sparklineData: [6.5, 7.0, 7.2, 7.8, 8.0, 8.3, 8.5],
    description: 'Percentage of visitors who submit an application'
  },
  active_applicants: {
    title: 'Active Applicants',
    value: '1,248',
    change: '3.1%',
    trend: 'up',
    category: 'activity',
    sparklineData: [1150, 1180, 1210, 1195, 1220, 1240, 1260]
  },
  total_applicants: {
    title: 'Total Applicants',
    value: '3,824',
    category: 'general',
    description: 'Total number of applicants across all programs'
  },
  bounce_rate: {
    title: 'Bounce Rate',
    value: '38%',
    change: '2.5%',
    trend: 'down',
    category: 'engagement',
    sparklineData: [44, 42, 40, 41, 39, 38, 36],
    description: 'Percentage of visitors who leave without further interaction'
  },
  high_intent: {
    title: 'High Intent Leads',
    value: '512',
    change: '8.7%',
    trend: 'up',
    category: 'conversion',
    sparklineData: [425, 460, 475, 490, 505, 520, 540],
    isImportant: true,
    description: 'Leads identified as high intent by AI analysis'
  },
  returning_users: {
    title: 'Returning Users',
    value: '45%',
    change: '2.1%',
    trend: 'up',
    category: 'engagement',
    sparklineData: [40, 41, 42, 43, 44, 45, 46]
  },
  acceptance_rate: {
    title: 'Acceptance Rate',
    value: '18.4%',
    change: '0.7%',
    trend: 'neutral',
    category: 'general',
    sparklineData: [18.2, 18.3, 18.5, 18.1, 18.3, 18.4, 18.5],
    description: 'Percentage of applicants accepted to programs'
  }
};

// Default metrics to show on first load
export const DEFAULT_METRICS = [
  'impression_rate',
  'application_completion',
  'high_intent',
  'new_signups',
  'conversion_rate',
  'active_applicants'
];