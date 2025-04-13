// pages/cookies.tsx
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  Link,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const cookieTypes = [
  {
    type: "Essential",
    description: "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.",
    examples: ["session", "authentication", "security_tokens"]
  },
  {
    type: "Functionality",
    description: "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.",
    examples: ["language", "theme_preferences", "recently_viewed"]
  },
  {
    type: "Analytics",
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
    examples: ["google_analytics", "page_views", "clicks"]
  },
  {
    type: "Marketing",
    description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
    examples: ["visitor_id", "tracking_pixel", "social_media_sharing"]
  },
];

const CookiesPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const tableHeaderBg = useColorModeValue('gray.100', 'gray.700');

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
              <Heading size="2xl" mb={4}>Cookie Policy</Heading>
              <Text color="gray.500">Last Updated: April 13, 2025</Text>
              
              <Text mt={6} fontSize="lg">
                This Cookie Policy explains how NEXT uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </Text>
            </Box>
            
            {/* What are cookies */}
            <Box>
              <Heading size="lg" mb={4}>What Are Cookies?</Heading>
              <Text>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </Text>
              <Text mt={3}>
                Cookies set by the website owner (in this case, NEXT) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
              </Text>
            </Box>
            
            {/* Why we use cookies */}
            <Box>
              <Heading size="lg" mb={4}>Why Do We Use Cookies?</Heading>
              <Text>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our platform. Third parties serve cookies through our website for advertising, analytics, and other purposes.
              </Text>
            </Box>
            
            {/* Types of cookies we use */}
            <Box>
              <Heading size="lg" mb={4}>Types of Cookies We Use</Heading>
              <Table variant="simple" border="1px" borderColor={borderColor} mt={4}>
                <Thead bg={tableHeaderBg}>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Description</Th>
                    <Th>Examples</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cookieTypes.map((cookie, index) => (
                    <Tr key={index}>
                      <Td fontWeight="medium">{cookie.type}</Td>
                      <Td>{cookie.description}</Td>
                      <Td>
                        <List spacing={1}>
                          {cookie.examples.map((example, i) => (
                            <ListItem key={i}>• {example}</ListItem>
                          ))}
                        </List>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {/* How to control cookies */}
            <Box>
              <Heading size="lg" mb={4}>How to Control Cookies</Heading>
              <Text mb={3}>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in the following ways:
              </Text>
              <List spacing={3} ml={6} mb={4}>
                <ListItem>
                  <Text fontWeight="medium">Browser Controls:</Text> 
                  <Text>You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="medium">Cookie Preference Center:</Text> 
                  <Text>You can manage your cookie preferences on our platform by accessing our Cookie Preference Center. You can access this tool by clicking on the "Cookie Preferences" link in the footer of our website.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="medium">Third-Party Opt-Outs:</Text> 
                  <Text>Certain third-party advertising networks, including Google, permit users to opt out of or customize preferences associated with your internet browsing. For more information on the practices of ad networks and how to opt out, visit <Link href="http://www.aboutads.info/choices" isExternal color="purple.500">www.aboutads.info/choices</Link> or <Link href="http://www.youronlinechoices.eu/" isExternal color="purple.500">www.youronlinechoices.eu</Link>.</Text>
                </ListItem>
              </List>
              
              <Box textAlign="center" mt={6}>
                <Button size="lg" colorScheme="purple" mb={4}>
                  Manage Cookie Preferences
                </Button>
                <Text fontSize="sm" color="gray.500">
                  This button will open our Cookie Preference Center where you can customize your cookie settings.
                </Text>
              </Box>
            </Box>
            
            {/* Updates to policy */}
            <Box>
              <Heading size="lg" mb={4}>Updates to This Cookie Policy</Heading>
              <Text>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </Text>
              <Text mt={3}>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </Text>
            </Box>
            
            {/* Contact */}
            <Box>
              <Heading size="lg" mb={4}>Contact Us</Heading>
              <Text>
                If you have any questions about our use of cookies or other technologies, please email us at{' '}
                <Link href="mailto:privacy@nextforall.com" color="purple.500">
                  privacy@nextforall.com
                </Link>{' '}
                or by using the contact details below:
              </Text>
              <Text mt={2} fontWeight="medium">
                NEXT, Inc.<br />
                123 Innovation Way<br />
                San Francisco, CA 94103<br />
                United States
              </Text>
            </Box>
            
            <Box textAlign="center" mt={4}>
              <Link as={NextLink} href="/privacy" color="purple.500">
                Back to Privacy Policy
              </Link>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default CookiesPage;