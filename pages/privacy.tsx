// pages/privacy.tsx
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
} from '@chakra-ui/react';

const privacySections = [
  {
    title: "Information We Collect",
    content: (
      <>
        <Text mb={4}>
          We collect several types of information from and about users of our website and platform, including:
        </Text>
        <UnorderedList spacing={2} pl={4} mb={4}>
          <ListItem>Personal information such as name, email address, and contact details when you register.</ListItem>
          <ListItem>Assessment data from your NEXT eXpress Assessment™ responses.</ListItem>
          <ListItem>Educational and professional background information you provide.</ListItem>
          <ListItem>Usage information about how you interact with our platform.</ListItem>
          <ListItem>Device and browser information for system optimization.</ListItem>
        </UnorderedList>
      </>
    )
  },
  {
    title: "How We Use Your Information",
    content: (
      <>
        <Text mb={4}>
          We use the information we collect for various purposes, including:
        </Text>
        <UnorderedList spacing={2} pl={4} mb={4}>
          <ListItem>Creating and managing your NEXT account.</ListItem>
          <ListItem>Generating your NEXT eXpress Profile™ based on assessment data.</ListItem>
          <ListItem>Matching you with relevant educational programs or candidates.</ListItem>
          <ListItem>Improving our platform and user experience.</ListItem>
          <ListItem>Communicating with you about our services, updates, and relevant opportunities.</ListItem>
          <ListItem>Analyzing usage patterns to enhance our features and services.</ListItem>
        </UnorderedList>
      </>
    )
  },
  {
    title: "Data Sharing and Disclosure",
    content: (
      <>
        <Text mb={4}>
          We may share your information in the following circumstances:
        </Text>
        <UnorderedList spacing={2} pl={4} mb={4}>
          <ListItem>With educational programs or employers when you express interest or give consent.</ListItem>
          <ListItem>With service providers who perform services on our behalf.</ListItem>
          <ListItem>When required by law or to protect our rights.</ListItem>
          <ListItem>In connection with a business transaction such as a merger or acquisition.</ListItem>
        </UnorderedList>
        <Text>
          We do not sell your personal information to third parties for marketing purposes.
        </Text>
      </>
    )
  },
  {
    title: "Data Security",
    content: (
      <>
        <Text mb={4}>
          We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </Text>
        <Text>
          We regularly review and update our security practices to enhance protection of your data.
        </Text>
      </>
    )
  },
  {
    title: "Your Privacy Rights",
    content: (
      <>
        <Text mb={4}>
          Depending on your location, you may have certain rights regarding your personal information, including:
        </Text>
        <UnorderedList spacing={2} pl={4} mb={4}>
          <ListItem>Right to access and receive a copy of your personal information.</ListItem>
          <ListItem>Right to correct inaccurate or incomplete information.</ListItem>
          <ListItem>Right to delete your personal information under certain circumstances.</ListItem>
          <ListItem>Right to restrict or object to processing of your personal information.</ListItem>
          <ListItem>Right to data portability.</ListItem>
        </UnorderedList>
        <Text>
          To exercise these rights, please contact us using the information provided at the end of this policy.
        </Text>
      </>
    )
  },
  {
    title: "Cookies and Similar Technologies",
    content: (
      <>
        <Text mb={4}>
          We use cookies and similar technologies to enhance your experience on our platform, understand usage patterns, and improve our services. You can control cookies through your browser settings, although disabling certain cookies may limit functionality.
        </Text>
      </>
    )
  },
  {
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <Text mb={4}>
          We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page with a new effective date.
        </Text>
      </>
    )
  },
  {
    title: "Contact Us",
    content: (
      <>
        <Text mb={4}>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
        </Text>
        <Text fontWeight="bold">Email: privacy@nextforall.com</Text>
        <Text fontWeight="bold">Address: 123 Innovation Way, San Francisco, CA 94103</Text>
      </>
    )
  }
];

const PrivacyPage: React.FC = () => {
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
              <Heading size="2xl" mb={4}>Privacy Policy</Heading>
              <Text color="gray.500">Last Updated: April 13, 2025</Text>
              
              <Text mt={6} fontSize="lg">
                At NEXT, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services. Please read this policy carefully to understand our practices regarding your personal information.
              </Text>
            </Box>
            
            {/* Privacy Sections */}
            <Accordion allowMultiple defaultIndex={[0]}>
              {privacySections.map((section, idx) => (
                <AccordionItem key={idx} border="none" mb={4}>
                  <AccordionButton 
                    p={4} 
                    bg={useColorModeValue('purple.50', 'purple.900')}
                    borderRadius="md"
                    _hover={{ bg: useColorModeValue('purple.100', 'purple.800') }}
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
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPage;