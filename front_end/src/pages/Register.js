"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import MetaMaskIcon from "../components/MetaMaskIcon";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
const register_ui = process.env.REACT_APP_SERVER_ENDPOINT + "/add";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const toast = useToast();

  const handleRegistraion = async () => {
    try {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const response = await axios.post(register_ui, {
        name: `${firstName} ${lastName}`,
        email: email,
        pass: password,
      });
      console.log(response);
      if (response.data.success) {
        toast({
          //   title: "Account created.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          //   title: "Account created.",
          description: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        //   title: "Account created.",
        description: "Some error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setWalletAddress(accounts[0]);
      console.log(walletAddress);
    } else {
      alert("Please Install MetaMask!!");
    }
  };
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
      console.log(user);
      console.log(profile);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  loadingText="Submitting"
                  colorScheme="blue"
                  onClick={handleRegistraion}
                >
                  Sign up
                </Button>
              </Stack>
              <HStack
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  w="full"
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  onClick={login}
                >
                  Google
                </Button>
                <Button
                  w="full"
                  variant={"outline"}
                  leftIcon={<MetaMaskIcon />}
                  onClick={connectWallet}
                >
                  MetaMask
                </Button>
              </HStack>
              <Stack>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to={"/"}>
                    <ChakraLink color={"blue.500"}>Login</ChakraLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
