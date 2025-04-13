// components/StarsynProfileDemo.tsx
import React, { useState } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { StarIcon, ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';

const StarsynProfileDemo = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  // State declarations
  const [isConnected, setIsConnected] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState('technical');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  
  // Section visibility toggles
  const [showTopGrid, setShowTopGrid] = useState(true);
  const [showTopSkills, setShowTopSkills] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  
  // Sample assessment data for a person
  const profileData = {
    candidateId: "20250101", // Anonymous candidate ID

    assessmentDetails: {
      date: "Mar 25, 2025",
      version: "3.2",
      completionRate: 96,
      reliability: "High",
      questionCount: 105
    },
    primaryType: {
      name: "The Architect",
      description: "Structured, methodical, systems-focused approach",
      color: "#3B82F6", // Blue
      strengths: "Building robust solutions, logical thinking, precision",
      learningStyle: "Sequential, structured, concept-based",
      careerPaths: "Engineering, systems design, technical architecture"
    },
    secondaryInfluences: [
      {
        name: "Empath",
        level: 78,
        color: "#EC4899", // Pink
        description: "Increases people-orientation and user focus"
      },
      {
        name: "Visionary",
        level: 65,
        color: "#8B5CF6", // Purple
        description: "Enhances future-focus and big picture thinking"
      }
    ],
    skillCategories: [
      { 
        id: 'technical', 
        name: 'Technical Proficiency', 
        color: '#3B82F6', // Blue
        description: "Hard skills, tools, technologies",
        score: 92,
        skills: [
          { id: 't1', name: 'Programming Languages', score: 95 },
          { id: 't2', name: 'Database Systems', score: 90 },
          { id: 't3', name: 'System Design', score: 94 }
        ]
      },
      { 
        id: 'creative', 
        name: 'Creative Expression', 
        color: '#10B981', // Green
        description: "Design thinking, innovation, artistic elements",
        score: 75,
        skills: [
          { id: 'c1', name: 'Design Thinking', score: 82 },
          { id: 'c2', name: 'Visual Design', score: 68 },
          { id: 'c3', name: 'Innovative Ideation', score: 84 }
        ]
      },
      { 
        id: 'analytical', 
        name: 'Analytical Reasoning', 
        color: '#F59E0B', // Amber
        description: "Data, research, critical thinking",
        score: 88,
        skills: [
          { id: 'a1', name: 'Data Analysis', score: 90 },
          { id: 'a2', name: 'Critical Thinking', score: 92 },
          { id: 'a3', name: 'Research Methods', score: 85 }
        ]
      },
      { 
        id: 'social', 
        name: 'Social Dynamics', 
        color: '#EC4899', // Pink
        description: "Teamwork, leadership, communication",
        score: 72,
        skills: [
          { id: 's1', name: 'Written Communication', score: 88 },
          { id: 's2', name: 'Verbal Communication', score: 75 },
          { id: 's3', name: 'Team Collaboration', score: 70 }
        ]
      },
      { 
        id: 'implementation', 
        name: 'Implementation Craft', 
        color: '#6366F1', // Indigo
        description: "Building, refining, deploying",
        score: 90,
        skills: [
          { id: 'i1', name: 'Code Quality', score: 94 },
          { id: 'i2', name: 'Testing Practices', score: 88 },
          { id: 'i3', name: 'Deployment Procedures', score: 92 }
        ]
      },
      { 
        id: 'strategic', 
        name: 'Strategic Vision', 
        color: '#8B5CF6', // Purple
        description: "Planning, forecasting, resource allocation",
        score: 78,
        skills: [
          { id: 'st1', name: 'Long-term Planning', score: 82 },
          { id: 'st2', name: 'Resource Allocation', score: 76 },
          { id: 'st3', name: 'Risk Assessment', score: 85 }
        ]
      }
    ]
  };
  
  // Flatten all skills for the mini-visualization
  const allSkills = profileData.skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      categoryId: category.id,
      categoryColor: category.color,
      categoryName: category.name
    }))
  );
  
  // Calculate top 5 skills for quick view
  const topSkills = [...allSkills].sort((a, b) => b.score - a.score).slice(0, 5);
  
  // Calculate positions for radial lines based on all individual skills
  const calculateRadialPoints = () => {
    const totalSkills = allSkills.length;
    const angleStep = (2 * Math.PI) / totalSkills;
    
    return allSkills.map((skill, index) => {
      const angle = index * angleStep;
      // Scale the score to determine line length
      const length = (skill.score / 100) * 45;
      
      // Calculate end point of the line
      const x = 50 + length * Math.cos(angle);
      const y = 50 + length * Math.sin(angle);
      
      return {
        ...skill,
        angle,
        x,
        y
      };
    });
  };
  
  const radialSkills = calculateRadialPoints();
  
  // Generate circular guides
  const generateGuides = (count = 3) => {
    return Array.from({ length: count }).map((_, i) => {
      const percentage = ((i + 1) * 33); // 33%, 66%, 100%
      const radius = (percentage / 100) * 45; // Map to 0-45% of container radius
      return { percentage, radius };
    });
  };
  
  const guides = generateGuides();
  
  // Handle skill selection
  const handleSkillSelect = (skill) => {
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
    setShowDetailsPanel(selectedSkill?.id !== skill.id);
  };
  
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };
  
  // Prepare styles for dark/light mode
  const styles = {
    container: {
      bg: isDark ? 'gray.800' : 'white',
      border: isDark ? 'gray.700' : 'gray.200',
    },
    card: {
      bg: isDark ? 'gray.700' : 'white',
      border: isDark ? 'gray.600' : 'gray.200',
      text: isDark ? 'gray.100' : 'gray.700',
    },
    guideLines: {
      stroke: isDark ? '#4a5568' : '#e5e7eb',
    },
    text: {
      primary: isDark ? 'white' : 'gray.700',
      secondary: isDark ? 'gray.300' : 'gray.500',
    },
    hover: {
      bg: isDark ? 'gray.600' : 'gray.50',
    }
  };
  
  return (
    <div className={`rounded-lg shadow-md border overflow-hidden max-w-4xl mx-auto`}
         style={{ 
           backgroundColor: isDark ? '#1A202C' : 'white',
           borderColor: isDark ? '#4A5568' : '#E2E8F0'
         }}>
      {/* Header with primary type */}
      <div 
        className="p-3 text-white"
        style={{ 
          background: `linear-gradient(to right, ${profileData.primaryType.color} 100%, ${profileData.primaryType.color}55 33%)` 
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-1 rounded-full mr-2">
              <span className="text-yellow-300">
                <StarIcon w={5} h={5} />
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold">{profileData.primaryType.name.replace('The ', '')} {profileData.candidateId}</h1>
              <p className="text-xs opacity-90">{profileData.primaryType.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider opacity-80">PROFILE</div>
            <div className="font-bold cursor-pointer" onClick={toggleConnection}>
              {isConnected ? "Alex J." : "Blind Mode"}
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary Influences - Mini version */}
      <div 
        className="px-3 py-2 flex items-center space-x-2 text-xs"
        style={{ 
          backgroundColor: isDark ? `${profileData.primaryType.color}15` : `${profileData.primaryType.color}10`,
          color: isDark ? 'white' : 'inherit'
        }}
      >
        <div 
          className="font-medium" 
          style={{ color: profileData.primaryType.color }}
        >
          Influences:
        </div>
        {profileData.secondaryInfluences.map((influence, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-2 h-2 rounded-full mr-1" 
              style={{ backgroundColor: influence.color }}
            ></div>
            <span>{influence.name} {influence.level}%</span>
          </div>
        ))}
      </div>
      
      {/* Section header for the top grid */}
      <div className="px-4 pt-4 flex justify-between items-center">
        <h2 className="text-sm font-semibold" style={{ color: isDark ? 'white' : '#4A5568' }}>
          Current Assessment
        </h2>
        <button 
          className="text-xs hover:text-blue-700 transition"
          style={{ color: '#3B82F6' }}
          onClick={() => setShowTopGrid(!showTopGrid)}
        >
          {showTopGrid ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {/* Main content - 2x2 Grid Layout */}
      {showTopGrid && (
        <div className="p-4 grid grid-cols-2 gap-4">
          {/* Main Type Details - Top Left */}
          <div className="border rounded-lg p-3 shadow-sm" 
               style={{ 
                 backgroundColor: isDark ? '#2D3748' : 'white',
                 borderColor: isDark ? '#4A5568' : '#E2E8F0'
               }}>
            <div className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: profileData.primaryType.color }}
              ></div>
              <h2 className="text-sm font-semibold" style={{ color: profileData.primaryType.color }}>
                {profileData.primaryType.name.replace('The ', '')}
              </h2>
            </div>
            
            <div className="text-xs space-y-2">
              <div>
                <div style={{ color: isDark ? '#A0AEC0' : '#718096' }} className="mb-1">Key Strengths:</div>
                <div className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.primaryType.strengths}
                </div>
              </div>
              <div>
                <div style={{ color: isDark ? '#A0AEC0' : '#718096' }} className="mb-1">Learning Style:</div>
                <div className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.primaryType.learningStyle}
                </div>
              </div>
              <div>
                <div style={{ color: isDark ? '#A0AEC0' : '#718096' }} className="mb-1">Potential Career Paths:</div>
                <div className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.primaryType.careerPaths}
                </div>
              </div>
            </div>
          </div>
          
          {/* Assessment Details Card - Top Right */}
          <div className="border rounded-lg p-3 shadow-sm"
               style={{ 
                 backgroundColor: isDark ? '#2D3748' : 'white',
                 borderColor: isDark ? '#4A5568' : '#E2E8F0'
               }}>
            <div className="flex items-center mb-2">
              <InfoIcon w={4} h={4} mr={1} color="indigo.600" />
              <h2 className="text-sm font-semibold" style={{ color: isDark ? 'white' : '#4A5568' }}>
                Assessment Details
              </h2>
            </div>
            
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span style={{ color: isDark ? '#A0AEC0' : '#718096' }}>Date Completed:</span>
                <span className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.assessmentDetails.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: isDark ? '#A0AEC0' : '#718096' }}>Assessment Version:</span>
                <span className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.assessmentDetails.version}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: isDark ? '#A0AEC0' : '#718096' }}>Completion Rate:</span>
                <span className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.assessmentDetails.completionRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: isDark ? '#A0AEC0' : '#718096' }}>Reliability Score:</span>
                <span className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.assessmentDetails.reliability}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: isDark ? '#A0AEC0' : '#718096' }}>Questions Answered:</span>
                <span className="font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                  {profileData.assessmentDetails.questionCount}
                </span>
              </div>
            </div>
          </div>
          
          {/* Secondary Influences - Bottom Left */}
          <div className="border rounded-lg p-3 shadow-sm"
               style={{ 
                 backgroundColor: isDark ? '#2D3748' : 'white',
                 borderColor: isDark ? '#4A5568' : '#E2E8F0'
               }}>
            <h2 className="text-sm font-semibold mb-3" style={{ color: isDark ? 'white' : '#4A5568' }}>
              Secondary Influences
            </h2>
            <div className="space-y-3">
              {profileData.secondaryInfluences.map((influence, index) => (
                <div key={index} className="p-2 border rounded"
                     style={{ borderColor: isDark ? '#4A5568' : '#E2E8F0' }}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: influence.color }}
                      ></div>
                      <h3 className="text-sm font-medium" style={{ color: isDark ? 'white' : 'black' }}>
                        {influence.name}
                      </h3>
                    </div>
                    <div 
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: isDark ? `${influence.color}30` : `${influence.color}20`,
                        color: influence.color
                      }}
                    >
                      {influence.level}%
                    </div>
                  </div>
                  <div className="text-xs mt-1" style={{ color: isDark ? '#CBD5E0' : 'inherit' }}>
                    {influence.description}
                  </div>
                  <div className="mt-1.5">
                    <div className="h-1.5 rounded-full overflow-hidden"
                         style={{ backgroundColor: isDark ? '#4A5568' : '#EDF2F7' }}>
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${influence.level}%`, backgroundColor: influence.color }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Starsyn Fingerprint - Bottom Right */}
          <div className="border rounded-lg p-3 shadow-sm"
               style={{ 
                 backgroundColor: isDark ? '#2D3748' : 'white',
                 borderColor: isDark ? '#4A5568' : '#E2E8F0'
               }}>
            <h2 className="text-sm font-semibold mb-2" style={{ color: isDark ? 'white' : '#4A5568' }}>
              Starsyn for Candidate {profileData.candidateId}
            </h2>
            
            <div className="flex justify-center items-center" style={{ height: "220px" }}>
              <div className="relative w-full h-full">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Circular guides */}
                  {guides.map((guide, i) => (
                    <g key={`guide-${i}`}>
                      <circle 
                        cx="50" 
                        cy="50" 
                        r={guide.radius} 
                        fill="none" 
                        stroke={isDark ? '#4A5568' : '#E5E7EB'} 
                        strokeWidth="0.2" 
                        strokeDasharray="1,1"
                      />
                    </g>
                  ))}
                  
                  {/* Radial lines (spokes) grouped by category */}
                  {profileData.skillCategories.map((category) => {
                    // Filter skills in this category
                    const categorySkills = radialSkills.filter(skill => skill.categoryId === category.id);
                    
                    // Is this category highlighted in the accordion?
                    const isHighlighted = expandedCategory === category.id;
                    
                    return (
                      <g 
                        key={`category-${category.id}`}
                        className="transition-all duration-300"
                      >
                        {/* Category area highlight */}
                        {isHighlighted && (
                          <path
                            d={`M50,50 ${categorySkills.map(skill => `L${skill.x},${skill.y}`).join(' ')} Z`}
                            fill={isDark ? `${category.color}20` : `${category.color}10`}
                            stroke={category.color}
                            strokeWidth="0.2"
                            strokeDasharray="1,1"
                          />
                        )}
                        
                        {categorySkills.map((skill) => (
                          <g 
                            key={`spoke-${skill.id}`}
                            className="cursor-pointer"
                            onClick={() => handleSkillSelect(skill)}
                          >
                            <line 
                              x1="50" 
                              y1="50" 
                              x2={skill.x} 
                              y2={skill.y} 
                              stroke={category.color} 
                              strokeWidth={selectedSkill?.id === skill.id ? "1.2" : "0.5"} 
                              strokeLinecap="round"
                            />
                            
                            {/* Skill point */}
                            <circle 
                              cx={skill.x} 
                              cy={skill.y} 
                              r={selectedSkill?.id === skill.id ? "1.8" : "1.2"} 
                              fill={category.color}
                            />
                            
                            {/* Glow effect for selected skill */}
                            {selectedSkill?.id === skill.id && (
                              <circle 
                                cx={skill.x} 
                                cy={skill.y} 
                                r="2.5" 
                                fill="none"
                                stroke={category.color}
                                strokeWidth="0.3"
                                opacity="0.6"
                              />
                            )}
                            
                            {/* Selected skill tooltip (without percentage) */}
                            {selectedSkill?.id === skill.id && (
                              <g>
                                <rect
                                  x={skill.x - 10}
                                  y={skill.y - 8}
                                  width="20"
                                  height="6"
                                  rx="1"
                                  fill={isDark ? '#2D3748' : 'white'}
                                  stroke={category.color}
                                  strokeWidth="0.2"
                                />
                                <text
                                  x={skill.x}
                                  y={skill.y - 4.5}
                                  fontSize="2.5"
                                  fill={category.color}
                                  textAnchor="middle"
                                  fontWeight="bold"
                                >
                                  {skill.name.split(' ')[0]}
                                </text>
                              </g>
                            )}
                          </g>
                        ))}
                      </g>
                    );
                  })}
                  
                  {/* Center Circle with pulse animation */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="8" 
                    fill={`url(#centerGradient)`}
                  >
                    <animate 
                      attributeName="r" 
                      values="7.5;8.5;7.5" 
                      dur="3s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  
                  {/* Outer glow */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="10" 
                    fill="none"
                    stroke={profileData.primaryType.color}
                    strokeWidth="0.5"
                    opacity="0.4"
                  >
                    <animate 
                      attributeName="opacity" 
                      values="0.4;0.1;0.4" 
                      dur="2s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  
                  <text 
                    x="50" 
                    y="52" 
                    fontSize="4"
                    fontWeight="bold"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-center"
                  >
                    {profileData.primaryType.name.split(' ')[1][0]}
                  </text>
                  
                  <defs>
                    <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                      <stop offset="70%" stopColor={profileData.primaryType.color} stopOpacity="1" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Top Skills Section below the grid */}
      <div className="px-4 pb-4">
        <div className="flex justify-between items-center mb-2 mt-1">
          <h2 className="text-sm font-semibold" style={{ color: isDark ? 'white' : '#4A5568' }}>
            Top Skills
          </h2>
          <button 
            className="text-xs hover:text-blue-700 transition"
            style={{ color: '#3B82F6' }}
            onClick={() => setShowTopSkills(!showTopSkills)}
          >
            {showTopSkills ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showTopSkills && (
          <div className="grid grid-cols-5 gap-2">
            {topSkills.map((skill, index) => (
              <div 
                key={skill.id} 
                className="flex flex-col p-2 rounded border cursor-pointer transition-all"
                style={{ 
                  backgroundColor: isDark 
                    ? (selectedSkill?.id === skill.id ? '#2D3748' : '#1A202C') 
                    : (selectedSkill?.id === skill.id ? '#F7FAFC' : 'white'),
                  borderColor: isDark 
                    ? (selectedSkill?.id === skill.id ? '#4A5568' : '#2D3748') 
                    : (selectedSkill?.id === skill.id ? '#CBD5E0' : '#E2E8F0'),
                  boxShadow: selectedSkill?.id === skill.id ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none'
                }}
                onClick={() => handleSkillSelect(skill)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: skill.categoryColor }}
                  ></div>
                  <div className="text-xs font-bold" style={{ color: isDark ? 'white' : 'inherit' }}>
                    #{index + 1}
                  </div>
                </div>
                <div 
                  className="w-full h-1 rounded-full mb-1"
                  style={{ backgroundColor: skill.categoryColor }}
                ></div>
                <div className="text-xs text-center font-medium truncate w-full" 
                     style={{ color: isDark ? 'white' : 'inherit' }}>
                  {skill.name}
                </div>
                <div 
                  className="text-xs text-center px-1 py-0.5 mt-1 rounded-full mx-auto"
                  style={{ 
                    backgroundColor: isDark ? `${skill.categoryColor}25` : `${skill.categoryColor}15`,
                    color: skill.categoryColor 
                  }}
                >
                  {skill.score}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Skill Details Panel - when a skill is selected */}
      {selectedSkill && showDetailsPanel && (
        <div className="mx-4 mb-4 p-3 rounded-md border text-xs animate-fadeIn"
             style={{ 
               backgroundColor: isDark ? '#2D3748' : 'white',
               borderColor: isDark ? '#4A5568' : '#E2E8F0',
               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
             }}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: selectedSkill.categoryColor }}
              ></div>
              <span className="font-semibold" style={{ color: isDark ? 'white' : 'inherit' }}>
                {selectedSkill.name}
              </span>
            </div>
            <div 
              className="px-2 py-0.5 rounded-full font-medium"
              style={{ 
                backgroundColor: isDark ? `${selectedSkill.categoryColor}30` : `${selectedSkill.categoryColor}20`,
                color: selectedSkill.categoryColor 
              }}
            >
              {selectedSkill.score}%
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span style={{ color: isDark ? '#A0AEC0' : '#718096' }}>Proficiency</span>
              <span className="font-medium" style={{ color: isDark ? 'white' : 'inherit' }}>
                {selectedSkill.score >= 90 ? 'Expert' : 
                 selectedSkill.score >= 80 ? 'Advanced' : 
                 selectedSkill.score >= 70 ? 'Proficient' : 
                 selectedSkill.score >= 60 ? 'Intermediate' : 'Beginner'}
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden"
                 style={{ backgroundColor: isDark ? '#4A5568' : '#EDF2F7' }}>
              <div 
                className="h-full rounded-full" 
                style={{ width: `${selectedSkill.score}%`, backgroundColor: selectedSkill.categoryColor }}
              ></div>
            </div>
          </div>
          
          <div style={{ color: isDark ? '#CBD5E0' : '#4A5568' }}>
            <p>Part of {selectedSkill.categoryName} skill group, ranking {topSkills.findIndex(s => s.id === selectedSkill.id) > -1 ? 'among your top skills' : 'as a solid skill'}.</p>
          </div>
        </div>
      )}
      
      {/* Skill Categories Section - Accordion style */}
      <div className="px-4 pb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold" style={{ color: isDark ? 'white' : '#4A5568' }}>
            Skill Categories
          </h2>
          <button 
            className="text-xs hover:text-blue-700 transition"
            style={{ color: '#3B82F6' }}
            onClick={() => setShowCategories(!showCategories)}
          >
            {showCategories ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showCategories && (
          <div className="space-y-2">
            {profileData.skillCategories.map(category => (
              <div key={category.id} className="border rounded-md overflow-hidden"
                   style={{ borderColor: isDark ? '#4A5568' : '#E2E8F0' }}>
                <div 
                  className="flex justify-between items-center p-2 cursor-pointer"
                  style={{ 
                    backgroundColor: isDark ? '#2D3748' : 'white',
                    color: isDark ? 'white' : 'inherit'
                  }}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span 
                      className="text-xs font-medium px-2 py-0.5 rounded-full mr-2"
                      style={{ 
                        backgroundColor: isDark ? `${category.color}25` : `${category.color}20`,
                        color: category.color 
                      }}
                    >
                      {category.score}%
                    </span>
                    <span
                      className={`transition-transform ${
                        expandedCategory === category.id ? 'transform rotate-90' : ''
                      }`} 
                      style={{ color: isDark ? '#A0AEC0' : '#718096' }}
                    >
                      <ChevronRightIcon w={4} h={4} />
                    </span>
                  </div>
                </div>
                
                {/* Skills within category - collapsible */}
                {expandedCategory === category.id && (
                  <div className="p-2 pt-0 border-t"
                       style={{ 
                         backgroundColor: isDark ? '#1A202C' : '#F7FAFC',
                         borderColor: isDark ? '#4A5568' : '#E2E8F0'
                       }}>
                    <div className="text-xs italic p-1 mb-1"
                         style={{ color: isDark ? '#A0AEC0' : '#718096' }}>
                      {category.description}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {category.skills.map(skill => (
                        <div 
                          key={skill.id}
                          className="p-2 text-xs rounded border cursor-pointer"
                          style={{ 
                            backgroundColor: isDark ? '#2D3748' : 'white',
                            borderColor: isDark 
                              ? (selectedSkill?.id === skill.id ? '#4A5568' : '#2D3748') 
                              : (selectedSkill?.id === skill.id ? '#CBD5E0' : '#E2E8F0'),
                            boxShadow: selectedSkill?.id === skill.id ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
                            color: isDark ? 'white' : 'inherit'
                          }}
                          onClick={() => handleSkillSelect({
                            ...skill,
                            categoryColor: category.color,
                            categoryName: category.name
                          })}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="truncate">{skill.name}</span>
                            <span 
                              className="font-medium px-1 rounded"
                              style={{ 
                                backgroundColor: isDark ? `${category.color}25` : `${category.color}20`,
                                color: category.color 
                              }}
                            >
                              {skill.score}%
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden"
                               style={{ backgroundColor: isDark ? '#4A5568' : '#EDF2F7' }}>
                            <div 
                              className="h-full rounded-full" 
                              style={{ width: `${skill.score}%`, backgroundColor: category.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div 
        className="px-4 py-2 border-t flex justify-between items-center text-xs"
        style={{ 
          backgroundColor: isDark ? `${profileData.primaryType.color}15` : `${profileData.primaryType.color}05`, 
          color: profileData.primaryType.color,
          borderColor: isDark ? '#4A5568' : '#E2E8F0'
        }}
      >
        <div>Starsyn.ai</div>
        <div>{profileData.assessmentDetails.date}</div>
      </div>
    </div>
  );
};

export default StarsynProfileDemo;