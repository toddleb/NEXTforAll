// pages/login.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'student', // Default value
  });
  
  // Colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Handle login form change
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle register form change
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Redirect based on simulated user type
      // In a real app, this would come from your authentication response
      let userType = 'student';
      
      if (loginData.email.includes('program')) {
        userType = 'program';
      } else if (loginData.email.includes('military')) {
        userType = 'military';
      } else if (loginData.email.includes('agency')) {
        userType = 'agency';
      }
      
      toast({
        title: "Login successful!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      // Redirect to appropriate dashboard
      router.push(`/${userType}/dashboard`);
    }, 1500);
  };
  
  // Handle registration submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created. Welcome to NEXT!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Redirect to appropriate dashboard
      router.push(`/${registerData.userType}/dashboard`);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <Box bg={bgColor} py={12} minH="calc(100vh - 160px)">
        <Container maxW="container.md">
          <Flex direction="column" align="center">
            {/* Logo */}
            <Box mb={8}>
              <Image 
                src="/images/next-logo.png" 
                alt="NEXT"
                height="80px"
                fallbackSrc="https://via.placeholder.com/200x80?text=NEXT"
              />
            </Box>
            
            {/* Main Card */}
            <Box 
              w="full" 
              bg={cardBg} 
              borderRadius="lg" 
              overflow="hidden"
              boxShadow="xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              {/* Tabs */}
              <Tabs 
                index={tabIndex} 
                onChange={setTabIndex} 
                colorScheme="purple" 
                isFitted
              >
                <TabList>
                  <Tab fontWeight="medium" py={4}>Login</Tab>
                  <Tab fontWeight="medium" py={4}>Register</Tab>
                </TabList>
                
                <TabPanels>
                  {/* Login Panel */}
                  <TabPanel p={8}>
                    <VStack spacing={6} align="stretch">
                      <Heading size="lg" textAlign="center">Welcome Back</Heading>
                      
                      <form onSubmit={handleLogin}>
                        <VStack spacing={4}>
                          <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input 
                              name="email"
                              type="email"
                              value={loginData.email}
                              onChange={handleLoginChange}
                              placeholder="you@example.com"
                            />
                          </FormControl>
                          
                          <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                              <Input 
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={loginData.password}
                                onChange={handleLoginChange}
                                placeholder="Enter your password"
                              />
                              <InputRightElement>
                                <IconButton
                                  aria-label={showPassword ? "Hide password" : "Show password"}
                                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                          
                          <Text 
                            alignSelf="flex-end" 
                            fontSize="sm" 
                            color="purple.500"
                            _hover={{ textDecoration: 'underline' }}
                            cursor="pointer"
                          >
                            Forgot Password?
                          </Text>
                          
                          <Button 
                            type="submit"
                            colorScheme="purple"
                            size="lg"
                            width="full"
                            mt={6}
                            isLoading={isLoading}
                            loadingText="Logging in..."
                          >
                            Log In
                          </Button>
                        </VStack>
                      </form>
                      
                      <Flex align="center" my={4}>
                        <Divider flex="1" />
                        <Text px={3} color="gray.500">or continue with</Text>
                        <Divider flex="1" />
                      </Flex>
                      
                      <HStack spacing={4}>
                        <Button 
                          leftIcon={<FaGoogle />} 
                          width="full" 
                          colorScheme="red" 
                          variant="outline"
                        >
                          Google
                        </Button>
                        <Button 
                          leftIcon={<FaLinkedin />} 
                          width="full" 
                          colorScheme="linkedin" 
                          variant="outline"
                        >
                          LinkedIn
                        </Button>
                      </HStack>
                    </VStack>
                  </TabPanel>
                  
                  {/* Register Panel */}
                  <TabPanel p={8}>
                    <VStack spacing={6} align="stretch">
                      <Heading size="lg" textAlign="center">Create Your Account</Heading>
                      
                      <form onSubmit={handleRegister}>
                        <VStack spacing={4}>
                          <FormControl isRequired>
                            <FormLabel>Full Name</FormLabel>
                            <Input 
                              name="name"
                              value={registerData.name}
                              onChange={handleRegisterChange}
                              placeholder="John Doe"
                            />
                          </FormControl>
                          
                          <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input 
                              name="email"
                              type="email"
                              value={registerData.email}
                              onChange={handleRegisterChange}
                              placeholder="you@example.com"
                            />
                          </FormControl>
                          
                          <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                              <Input 
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                placeholder="Create a password"
                              />
                              <InputRightElement>
                                <IconButton
                                  aria-label={showPassword ? "Hide password" : "Show password"}
                                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                          
                          <FormControl isRequired>
                            <FormLabel>I am a...</FormLabel>
                            <HStack spacing={4}>
                              {['student', 'program', 'military', 'agency'].map((type) => (
                                <Button
                                  key={type}
                                  flex="1"
                                  variant={registerData.userType === type ? "solid" : "outline"}
                                  colorScheme={registerData.userType === type ? "purple" : "gray"}
                                  onClick={() => setRegisterData(prev => ({ ...prev, userType: type }))}
                                >
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </Button>
                              ))}
                            </HStack>
                          </FormControl>
                          
                          <Button 
                            type="submit"
                            colorScheme="purple"
                            size="lg"
                            width="full"
                            mt={6}
                            isLoading={isLoading}
                            loadingText="Creating Account..."
                          >
                            Create Account
                          </Button>
                        </VStack>
                      </form>
                      
                      <Flex align="center" my={4}>
                        <Divider flex="1" />
                        <Text px={3} color="gray.500">or register with</Text>
                        <Divider flex="1" />
                      </Flex>
                      
                      <HStack spacing={4}>
                        <Button 
                          leftIcon={<FaGoogle />} 
                          width="full" 
                          colorScheme="red" 
                          variant="outline"
                        >
                          Google
                        </Button>
                        <Button 
                          leftIcon={<FaLinkedin />} 
                          width="full" 
                          colorScheme="linkedin" 
                          variant="outline"
                        >
                          LinkedIn
                        </Button>
                      </HStack>
                      
                      <Text fontSize="sm" textAlign="center" mt={4} color="gray.500">
                        By creating an account, you agree to our{" "}
                        <NextLink href="/terms" passHref>
                          <Text as="span" color="purple.500" cursor="pointer">
                            Terms of Service
                          </Text>
                        </NextLink>{" "}
                        and{" "}
                        <NextLink href="/privacy" passHref>
                          <Text as="span" color="purple.500" cursor="pointer">
                            Privacy Policy
                          </Text>
                        </NextLink>
                      </Text>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            
            {/* Link to switch between login/register */}
            <Box mt={4} textAlign="center">
              <Text>
                {tabIndex === 0 ? (
                  <>
                    Don't have an account?{" "}
                    <Text 
                      as="span" 
                      color="purple.500" 
                      fontWeight="bold" 
                      cursor="pointer"
                      onClick={() => setTabIndex(1)}
                    >
                      Register
                    </Text>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Text 
                      as="span" 
                      color="purple.500" 
                      fontWeight="bold" 
                      cursor="pointer"
                      onClick={() => setTabIndex(0)}
                    >
                      Login
                    </Text>
                  </>
                )}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;