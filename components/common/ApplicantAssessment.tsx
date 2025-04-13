// components/common/ApplicantAssessment.tsx
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Badge,
  Icon,
  Progress,
  SimpleGrid,
  useColorModeValue,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon, StarIcon } from '@chakra-ui/icons';
import { ChevronRight } from 'lucide-react';

interface SkillType {
  id: string;
  name: string;
  score: number;
  categoryId?: string;
  categoryColor?: string;
  categoryName?: string;
}

interface CategoryType {
  id: string;
  name: string;
  color: string;
  description: string;
  score: number;
  skills: SkillType[];
}

interface InfluenceType {
  name: string;
  level: number;
  color: string;
  description: string;
}

interface AssessmentDetailsType {
  date: string;
  version: string;
  completionRate: number;
  reliability: string;
  questionCount: number;
}

interface PrimaryTypeType {
  name: string;
  description: string;
  color: string;
  strengths: string;
  learningStyle: string;
  careerPaths: string;
}

interface ProfileDataType {
  candidateId: string;
  assessmentDetails: AssessmentDetailsType;
  primaryType: PrimaryTypeType;
  secondaryInfluences: InfluenceType[];
  skillCategories: CategoryType[];
}

interface ApplicantAssessmentProps {
  candidate: any;
}

// This component adapts the StarsynProfileDemo to a Chakra UI version for the NEXT app
export default function ApplicantAssessment({ candidate }: ApplicantAssessmentProps) {
  // State declarations
  const [isConnected, setIsConnected] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState('technical');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  
  // Section visibility toggles
  const [showTopGrid, setShowTopGrid] = useState(true);
  const [showTopSkills, setShowTopSkills] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  // Sample assessment data for a person (we'll replace this with API data eventually)
  const profileData: ProfileDataType = {
    candidateId: candidate?.id || "20250101", // Use actual ID if available

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
      }
    ]
  };

  // Calculate top 5 skills for quick view
  const allSkills = profileData.skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      categoryId: category.id,
      categoryColor: category.color,
      categoryName: category.name
    }))
  );
  
  const topSkills = [...allSkills].sort((a, b) => b.score - a.score).slice(0, 5);
  
  // Handle skill selection
  const handleSkillSelect = (skill: SkillType) => {
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
    setShowDetailsPanel(selectedSkill?.id !== skill.id);
  };
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Component for radar/skill chart
  const SkillRadarChart = () => {
    // Generate circular guides
    const generateGuides = (count = 3) => {
      return Array.from({ length: count }).map((_, i) => {
        const percentage = ((i + 1) * 33); // 33%, 66%, 100%
        const radius = (percentage / 100) * 45; // Map to 0-45% of container radius
        return { percentage, radius };
      });
    };
    
    const guides = generateGuides();
    
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
    
    return (
      <Box width="100%" height="100%">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          {/* Circular guides */}
          {guides.map((guide, i) => (
            <g key={`guide-${i}`}>
              <circle 
                cx="50" 
                cy="50" 
                r={guide.radius} 
                fill="none" 
                stroke="#e5e7eb" 
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
                    fill={`${category.color}10`}
                    stroke={category.color}
                    strokeWidth="0.2"
                    strokeDasharray="1,1"
                  />
                )}
                
                {categorySkills.map((skill) => (
                  <g 
                    key={`spoke-${skill.id}`}
                    onClick={() => handleSkillSelect(skill)}
                    cursor="pointer"
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
                    
                    {/* Selected skill tooltip */}
                    {selectedSkill?.id === skill.id && (
                      <g>
                        <rect
                          x={skill.x - 10}
                          y={skill.y - 8}
                          width="20"
                          height="6"
                          rx="1"
                          fill="white"
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
      </Box>
    );
  };

  return (
    <Box bg={bgColor} borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor={borderColor}>
      {/* Header with primary type */}
      <Box 
        p={3} 
        color="white"
        bgGradient={`linear(to-r, ${profileData.primaryType.color}, ${profileData.primaryType.color})`}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Box bg="whiteAlpha.300" p={1} borderRadius="full" mr={2}>
              <StarIcon color="yellow.300" boxSize={5} />
            </Box>
            <Box>
              <Heading size="md">{profileData.primaryType.name.replace('The ', '')}</Heading>
              <Text fontSize="xs" opacity={0.9}>{profileData.primaryType.description}</Text>
            </Box>
          </Flex>
          <Box textAlign="right">
            <Text fontSize="xs" textTransform="uppercase" letterSpacing="wider" opacity={0.8}>PROFILE</Text>
            <Text fontWeight="bold" cursor="pointer" onClick={() => setIsConnected(!isConnected)}>
              {isConnected ? candidate?.name || "Alex J." : "Blind Mode"}
            </Text>
          </Box>
        </Flex>
      </Box>
      
      {/* Secondary Influences - Mini version */}
      <Flex 
        px={3} 
        py={2}
        alignItems="center" 
        fontSize="xs"
        bg={`${profileData.primaryType.color}10`}
      >
        <Text fontWeight="medium" color={profileData.primaryType.color} mr={2}>
          Influences:
        </Text>
        {profileData.secondaryInfluences.map((influence, index) => (
          <Flex key={index} alignItems="center" mr={3}>
            <Box 
              w="2px" 
              h="2px" 
              borderRadius="full" 
              mr={1} 
              bg={influence.color}
            ></Box>
            <Text>{influence.name} {influence.level}%</Text>
          </Flex>
        ))}
      </Flex>
      
      {/* Section header for the top grid */}
      <Flex px={4} pt={4} justifyContent="space-between" alignItems="center">
        <Heading size="sm" color="gray.700">Current Assessment</Heading>
        <Button 
          size="xs" 
          colorScheme="blue" 
          variant="ghost"
          onClick={() => setShowTopGrid(!showTopGrid)}
        >
          {showTopGrid ? 'Hide' : 'Show'}
        </Button>
      </Flex>
      
      {/* Main Grid */}
      {showTopGrid && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
          {/* Main Type Details */}
          <Box borderWidth="1px" borderRadius="lg" p={3} shadow="sm">
            <Flex alignItems="center" mb={2}>
              <Box 
                w="3px" 
                h="3px" 
                borderRadius="full" 
                mr={1} 
                bg={profileData.primaryType.color}
              ></Box>
              <Heading size="sm" color={profileData.primaryType.color}>
                {profileData.primaryType.name.replace('The ', '')}
              </Heading>
            </Flex>
            
            <Box fontSize="xs">
              <Box mb={2}>
                <Text color="gray.500" mb={1}>Key Strengths:</Text>
                <Text fontWeight="medium">{profileData.primaryType.strengths}</Text>
              </Box>
              <Box mb={2}>
                <Text color="gray.500" mb={1}>Learning Style:</Text>
                <Text fontWeight="medium">{profileData.primaryType.learningStyle}</Text>
              </Box>
              <Box>
                <Text color="gray.500" mb={1}>Potential Career Paths:</Text>
                <Text fontWeight="medium">{profileData.primaryType.careerPaths}</Text>
              </Box>
            </Box>
          </Box>
          
          {/* Assessment Details */}
          <Box borderWidth="1px" borderRadius="lg" p={3} shadow="sm">
            <Flex alignItems="center" mb={2}>
              <InfoIcon mr={1} color="indigo.600" />
              <Heading size="sm" color="gray.700">Assessment Details</Heading>
            </Flex>
            
            <Box fontSize="xs">
              <Flex justify="space-between" mb={1}>
                <Text color="gray.500">Date Completed:</Text>
                <Text fontWeight="medium">{profileData.assessmentDetails.date}</Text>
              </Flex>
              <Flex justify="space-between" mb={1}>
                <Text color="gray.500">Assessment Version:</Text>
                <Text fontWeight="medium">{profileData.assessmentDetails.version}</Text>
              </Flex>
              <Flex justify="space-between" mb={1}>
                <Text color="gray.500">Completion Rate:</Text>
                <Text fontWeight="medium">{profileData.assessmentDetails.completionRate}%</Text>
              </Flex>
              <Flex justify="space-between" mb={1}>
                <Text color="gray.500">Reliability Score:</Text>
                <Text fontWeight="medium">{profileData.assessmentDetails.reliability}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.500">Questions Answered:</Text>
                <Text fontWeight="medium">{profileData.assessmentDetails.questionCount}</Text>
              </Flex>
            </Box>
          </Box>
          
          {/* Secondary Influences */}
          <Box borderWidth="1px" borderRadius="lg" p={3} shadow="sm">
            <Heading size="sm" mb={3} color="gray.700">Secondary Influences</Heading>
            <Box>
              {profileData.secondaryInfluences.map((influence, index) => (
                <Box key={index} p={2} borderWidth="1px" borderRadius="md" mb={2}>
                  <Flex justify="space-between" alignItems="center" mb={1}>
                    <Flex alignItems="center">
                      <Box 
                        w="3px" 
                        h="3px" 
                        borderRadius="full" 
                        mr={2} 
                        bg={influence.color}
                      ></Box>
                      <Heading size="xs">{influence.name}</Heading>
                    </Flex>
                    <Badge
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="semibold"
                      bg={`${influence.color}20`}
                      color={influence.color}
                    >
                      {influence.level}%
                    </Badge>
                  </Flex>
                  <Text fontSize="xs" mt={1}>{influence.description}</Text>
                  <Box mt={1.5}>
                    <Progress 
                      value={influence.level} 
                      size="sm" 
                      colorScheme="purple"
                      borderRadius="full"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          
          {/* Skill Radar Chart */}
          <Box borderWidth="1px" borderRadius="lg" p={3} shadow="sm">
            <Heading size="sm" mb={2} color="gray.700">Starsyn for Candidate {profileData.candidateId}</Heading>
            
            <Box height="220px" display="flex" justifyContent="center" alignItems="center">
              <SkillRadarChart />
            </Box>
          </Box>
        </SimpleGrid>
      )}
      
      {/* Top Skills Section */}
      <Box px={4} pb={4}>
        <Flex justify="space-between" alignItems="center" mb={2} mt={1}>
          <Heading size="sm" color="gray.700">Top Skills</Heading>
          <Button 
            size="xs" 
            colorScheme="blue" 
            variant="ghost"
            onClick={() => setShowTopSkills(!showTopSkills)}
          >
            {showTopSkills ? 'Hide' : 'Show'}
          </Button>
        </Flex>
        
        {showTopSkills && (
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={2}>
            {topSkills.map((skill, index) => (
              <Box 
                key={skill.id} 
                p={2} 
                borderRadius="md" 
                borderWidth="1px"
                borderColor={selectedSkill?.id === skill.id ? 'gray.300' : 'gray.200'}
                bg={selectedSkill?.id === skill.id ? 'gray.50' : 'white'}
                boxShadow={selectedSkill?.id === skill.id ? 'sm' : 'none'}
                cursor="pointer"
                transition="all 0.2s"
                onClick={() => handleSkillSelect(skill)}
                display="flex"
                flexDirection="column"
              >
                <Flex alignItems="center" justify="space-between" mb={1}>
                  <Box 
                    w="2px" 
                    h="2px" 
                    borderRadius="full"
                    bg={skill.categoryColor}
                  ></Box>
                  <Text fontSize="xs" fontWeight="bold">#{index + 1}</Text>
                </Flex>
                <Box 
                  w="100%" 
                  h="1px" 
                  borderRadius="full" 
                  mb={1}
                  bg={skill.categoryColor}
                ></Box>
                <Text fontSize="xs" textAlign="center" fontWeight="medium" isTruncated width="100%">
                  {skill.name}
                </Text>
                <Badge 
                  fontSize="xs" 
                  textAlign="center" 
                  px={1} 
                  py={0.5} 
                  mt={1} 
                  borderRadius="full" 
                  mx="auto"
                  bg={`${skill.categoryColor}15`}
                  color={skill.categoryColor}
                >
                  {skill.score}%
                </Badge>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
      
      {/* Skill Details Panel */}
      {selectedSkill && showDetailsPanel && (
        <Box mx={4} mb={4} p={3} bg="white" borderRadius="md" borderWidth="1px" borderColor="gray.200" shadow="sm" fontSize="xs">
          <Flex justify="space-between" alignItems="center" mb={2}>
            <Flex alignItems="center">
              <Box 
                w="3px" 
                h="3px" 
                borderRadius="full" 
                mr={2} 
                bg={selectedSkill.categoryColor}
              ></Box>
              <Text fontWeight="semibold">{selectedSkill.name}</Text>
            </Flex>
            <Badge 
              px={2} 
              py={0.5} 
              borderRadius="full" 
              fontWeight="medium"
              bg={`${selectedSkill.categoryColor}20`}
              color={selectedSkill.categoryColor}
            >
              {selectedSkill.score}%
            </Badge>
          </Flex>
          
          <Box mb={2}>
            <Flex justify="space-between" mb={1}>
              <Text color="gray.500">Proficiency</Text>
              <Text fontWeight="medium">
                {selectedSkill.score >= 90 ? 'Expert' : 
                 selectedSkill.score >= 80 ? 'Advanced' : 
                 selectedSkill.score >= 70 ? 'Proficient' : 
                 selectedSkill.score >= 60 ? 'Intermediate' : 'Beginner'}
              </Text>
            </Flex>
            <Progress 
              value={selectedSkill.score} 
              size="sm" 
              colorScheme="purple"
              borderRadius="full"
            />
          </Box>
          
          <Text color="gray.600">
            Part of {selectedSkill.categoryName} skill group, ranking {topSkills.findIndex(s => s.id === selectedSkill.id) > -1 ? 'among top skills' : 'as a solid skill'}.
          </Text>
        </Box>
      )}
      
      {/* Skill Categories */}
      <Box px={4} pb={4}>
        <Flex justify="space-between" alignItems="center" mb={2}>
          <Heading size="sm" color="gray.700">Skill Categories</Heading>
          <Button 
            size="xs" 
            colorScheme="blue" 
            variant="ghost"
            onClick={() => setShowCategories(!showCategories)}
          >
            {showCategories ? 'Hide' : 'Show'}
          </Button>
        </Flex>
        
        {showCategories && (
          <Accordion allowToggle defaultIndex={[0]}>
            {profileData.skillCategories.map(category => (
              <AccordionItem key={category.id} borderWidth="1px" borderRadius="md" mb={2} overflow="hidden" border="none">
                <AccordionButton 
                  p={2} 
                  _hover={{ bg: 'gray.50' }}
                  onClick={() => toggleCategory(category.id)}
                >
                  <Flex alignItems="center" flex="1">
                    <Box 
                      w="3px" 
                      h="3px" 
                      borderRadius="full" 
                      mr={2} 
                      bg={category.color}
                    ></Box>
                    <Text fontSize="sm" fontWeight="medium">{category.name}</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Badge 
                      fontSize="xs" 
                      fontWeight="medium" 
                      px={2} 
                      py={0.5} 
                      borderRadius="full" 
                      mr={2}
                      bg={`${category.color}20`}
                      color={category.color}
                    >
                      {category.score}%
                    </Badge>
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>
                
                <AccordionPanel pb={2} pt={0} bg="gray.50" borderTopWidth="1px">
                  <Text fontSize="xs" color="gray.500" fontStyle="italic" p={1} mb={1}>
                    {category.description}
                  </Text>
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={2}>
                    {category.skills.map(skill => (
                      <Box 
                        key={skill.id}
                        p={2} 
                        fontSize="xs" 
                        bg="white" 
                        borderRadius="md" 
                        borderWidth="1px"
                        borderColor={selectedSkill?.id === skill.id ? 'gray.300' : 'gray.200'}
                        boxShadow={selectedSkill?.id === skill.id ? 'sm' : 'none'}
                        cursor="pointer"
                        onClick={() => handleSkillSelect({
                          ...skill,
                          categoryColor: category.color,
                          categoryName: category.name
                        })}
                      >
                        <Flex justify="space-between" mb={1}>
                          <Text isTruncated>{skill.name}</Text>
                          <Badge 
                            fontWeight="medium" 
                            px={1} 
                            borderRadius="md"
                            bg={`${category.color}20`}
                            color={category.color}
                          >
                            {skill.score}%
                          </Badge>
                        </Flex>
                        <Progress 
                          value={skill.score} 
                          size="xs" 
                          colorScheme="purple"
                          borderRadius="full"
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Box>
      
      {/* Footer */}
      <Box 
        px={4} 
        py={2} 
        borderTopWidth="1px" 
        borderColor="gray.200" 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        fontSize="xs"
        bg={`${profileData.primaryType.color}05`}
        color={profileData.primaryType.color}
      >
        <Text>NEXT Assessment</Text>
        <Text>{profileData.assessmentDetails.date}</Text>
      </Box>
    </Box>
  );
}