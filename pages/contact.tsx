// pages/contact.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  Icon,
  HStack,
  Select,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaPaperPlane } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const toast = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        userType: '',
        subject: '',
        message: ''
      });
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }, 1500);
  };

  return (
    <Box bg={bgColor} py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading size="2xl" mb={4}>Contact Us</Heading>
            <Text fontSize="xl" maxW="800px" mx="auto" color="gray.500">
              Have questions about NEXT? We're here to help! Reach out to our team.
            </Text>
          </Box>
          
          {/* Contact Info and Form */}
          <Flex 
            direction={{ base: 'column', lg: 'row' }}
            gap={8}
          >
            {/* Contact Information */}
            <Box 
              flex="1" 
              bg={boxBg} 
              p={8} 
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              shadow="md"
            >
              <Heading size="lg" mb={6}>Get in Touch</Heading>
              
              <VStack align="stretch" spacing={6}>
                <HStack>
                  <Icon as={MdEmail} boxSize={6} color="purple.500" />
                  <Box>
                    <Text fontWeight="bold">Email</Text>
                    <Text>info@nextforall.com</Text>
                  </Box>
                </HStack>
                
                <HStack>
                  <Icon as={MdPhone} boxSize={6} color="purple.500" />
                  <Box>
                    <Text fontWeight="bold">Phone</Text>
                    <Text>(555) 123-4567</Text>
                  </Box>
                </HStack>
                
                <HStack>
                  <Icon as={MdLocationOn} boxSize={6} color="purple.500" />
                  <Box>
                    <Text fontWeight="bold">Office</Text>
                    <Text>123 Innovation Way</Text>
                    <Text>San Francisco, CA 94103</Text>
                  </Box>
                </HStack>
              </VStack>
              
              <Box mt={8} p={6} bg={useColorModeValue('purple.50', 'purple.900')} borderRadius="md">
                <Text fontWeight="bold" mb={2}>Support Hours</Text>
                <Text>Monday - Friday: 9AM - 6PM PST</Text>
                <Text>We strive to respond to all inquiries within 24 hours.</Text>
              </Box>
            </Box>
            
            {/* Contact Form */}
            <Box 
              flex="2" 
              bg={boxBg} 
              p={8} 
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              shadow="md"
            >
              <Heading size="lg" mb={6}>Send Us a Message</Heading>
              
              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                  <FormControl isRequired>
                    <FormLabel>Your Name</FormLabel>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </FormControl>
                </SimpleGrid>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                  <FormControl isRequired>
                    <FormLabel>I am a...</FormLabel>
                    <Select 
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      placeholder="Select an option"
                    >
                      <option value="student">Student</option>
                      <option value="program">Educational Program</option>
                      <option value="military">Military Personnel/Veteran</option>
                      <option value="agency">Agency/Organization</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Subject</FormLabel>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                    />
                  </FormControl>
                </SimpleGrid>
                
                <FormControl isRequired mb={6}>
                  <FormLabel>Message</FormLabel>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    rows={6}
                  />
                </FormControl>
                
                <Button 
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  width="full"
                  leftIcon={<FaPaperPlane />}
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                >
                  Send Message
                </Button>
              </form>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactPage;