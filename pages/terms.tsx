// pages/terms.tsx
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';

const termsSection = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <Text>
        By accessing or using the NEXT platform and services ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services. These terms constitute a legally binding agreement between you and NEXT.
      </Text>
    )
  },
  {
    title: "2. Description of Services",
    content: (
      <>
        <Text mb={4}>
          NEXT provides a career assessment and matching platform that connects students, educational programs, military personnel, and agencies. Our Services include but are not limited to:
        </Text>
        <UnorderedList spacing={2} pl={4}>
          <ListItem>NEXT eXpress Assessment™ for identifying individual working styles and strengths</ListItem>
          <ListItem>Matching algorithms to connect users with compatible opportunities</ListItem>
          <ListItem>Communication tools for engagement between users</ListItem>
          <ListItem>Analytics and insight tools for program administrators</ListItem>
        </UnorderedList>
      </>
    )
  },
  {
    title: "3. User Accounts",
    content: (
      <>
        <Text mb={4}>
          To access certain features of our Services, you may need to create an account. When you create an account, you agree to:
        </Text>
        <OrderedList spacing={2} pl={4}>
          <ListItem>Provide accurate, current, and complete information</ListItem>
          <ListItem>Maintain the security of your account credentials</ListItem>
          <ListItem>Accept responsibility for all activities that occur under your account</ListItem>
          <ListItem>Notify us immediately of any unauthorized use of your account</ListItem>
        </OrderedList>
      </>
    )
  },
  {
    title: "4. User Responsibilities",
    content: (
      <>
        <Text mb={4}>
          As a user of our Services, you agree not to:
        </Text>
        <UnorderedList spacing={2} pl={4}>
          <ListItem>Violate any applicable laws or regulations</ListItem>
          <ListItem>Infringe on the rights of others</ListItem>
          <ListItem>Submit false or misleading information</ListItem>
          <ListItem>Use the Services to distribute unsolicited communications</ListItem>
          <ListItem>Attempt to interfere with or disrupt the integrity of our platform</ListItem>
          <ListItem>Use automated systems or software to extract data from our Services</ListItem>
        </UnorderedList>
      </>
    )
  },
  {
    title: "5. Intellectual Property",
    content: (
      <Text>
        All content on the NEXT platform, including but not limited to text, graphics, logos, icons, images, audio clips, and software, is the property of NEXT or its licensors and is protected by copyright and other intellectual property laws. The NEXT eXpress Assessment™, NEXT eXpress Profile™, and all related methodologies are proprietary to NEXT. You may not use, reproduce, distribute, or create derivative works based on our content without express written permission.
      </Text>
    )
  },
  {
    title: "6. Data Privacy",
    content: (
      <Text>
        Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand how we collect, use, and protect your information.
      </Text>
    )
  },
  {
    title: "7. Third-Party Links and Services",
    content: (
      <Text>
        Our Services may contain links to third-party websites or services that are not owned or controlled by NEXT. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that NEXT shall not be responsible or liable for any damage or loss caused by the use of such third-party websites or services.
      </Text>
    )
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <Text>
        To the maximum extent permitted by law, NEXT shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Services. In no event shall our total liability to you for all damages exceed the amount paid by you, if any, for using our Services during the twelve (12) months prior to the cause of action.
      </Text>
    )
  },
  {
    title: "9. Warranty Disclaimer",
    content: (
      <Text>
        THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEXT DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
      </Text>
    )
  },
  {
    title: "10. Indemnification",
    content: (
      <Text>
        You agree to indemnify, defend, and hold harmless NEXT and its officers, directors, employees, agents, and affiliates from and against any claims, disputes, demands, liabilities, damages, losses, and expenses, including reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.
      </Text>
    )
  },
  {
    title: "11. Modifications to Terms",
    content: (
      <Text>
        We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our platform and updating the "Last Updated" date. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
      </Text>
    )
  },
  {
    title: "12. Termination",
    content: (
      <Text>
        We may terminate or suspend your account and access to the Services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason. Upon termination, your right to use the Services will immediately cease.
      </Text>
    )
  },
  {
    title: "13. Governing Law",
    content: (
      <Text>
        These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the federal or state courts located in San Francisco, California.
      </Text>
    )
  },
  {
    title: "14. Contact Information",
    content: (
      <Text>
        If you have any questions about these Terms, please contact us at legal@nextforall.com or 123 Innovation Way, San Francisco, CA 94103.
      </Text>
    )
  }
];

const TermsPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} py={12}>
      <Container maxW="container.xl">
        <Box 
          bg={boxBg} 
          p={8} 
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="md"
        >
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Box>
              <Heading size="2xl" mb={4}>Terms of Service</Heading>
              <Text color="gray.500">Last Updated: April 13, 2025</Text>
              
              <Text mt={6} fontSize="lg">
                Welcome to NEXT. Please read these Terms of Service carefully before using our platform and services.
              </Text>
            </Box>
            
            {/* Terms Sections */}
            <Accordion allowMultiple defaultIndex={[0]}>
              {termsSection.map((section, idx) => (
                <AccordionItem key={idx} border="none" mb={4}>
                  <AccordionButton 
                    p={4} 
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    borderRadius="md"
                    _hover={{ bg: useColorModeValue('blue.100', 'blue.800') }}
                  >
                    <Box flex="1" textAlign="left">
                      <Heading size="md">{section.title}</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} pt={4} px={4}>
                    {section.content}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Box p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="md">
              <Text textAlign="center">
                By using NEXT, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsPage;