
import NextDashboardLayout from '@/components/layout/NextDashboardLayout';

const programData = {
  name: 'Northern Arizona University',
  logo: '/logos/NAU_Heritage_ctr_282_3514.png',
  primaryColor: '#00205b',
};

const institutionData = [];

const candidateData = [
  {
    id: 'c101',
    blindId: 'Candidate #101',
    matchScore: 94,
    program: 'B.S. Data Science',
    activity: '2 hours ago',
    intent: 'high',
    skills: ['Python', 'Data Viz'],
  },
  {
    id: 'c102',
    blindId: 'Candidate #102',
    matchScore: 89,
    program: 'B.S. Computer Science',
    activity: '1 day ago',
    intent: 'medium',
    skills: ['JavaScript', 'React', 'APIs'],
  },
  {
    id: 'c103',
    blindId: 'Candidate #103',
    matchScore: 82,
    program: 'M.S. AI',
    activity: '3 days ago',
    intent: 'very-high',
    skills: ['ML', 'Neural Networks'],
    isRevealed: true,
    name: 'Jordan Ellis'
  }
];

const insightsData = [];

export default function ProgramDashboard() {
  return (
    <NextDashboardLayout
      userType="program"
      programData={programData}
      institutionData={institutionData}
      candidateData={candidateData}
      insightsData={insightsData}
    />
  );
}
