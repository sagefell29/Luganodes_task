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
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MetaMaskIcon from "../components/MetaMaskIcon";
import { Link } from "react-router-dom";
import axios from "axios";
const login_uri = process.env.REACT_APP_SERVER_ENDPOINT + "/login";
const login_mm = process.env.REACT_APP_SERVER_ENDPOINT + "/loginMM";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const response = await axios.post(login_uri, {
        email: email,
        pass: password,
      });
      // console.log(response);

      if (response.data.success) {
        toast({
          //   title: "Account created.",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        sessionStorage.setItem("type","login");
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/dashboard");
      } else {
        toast({
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

  const handleMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        const response = await axios.post(login_mm, {
          web3_id: accounts[0],
        });
        if (response.data.success) {
          toast({
            //   title: "Account created.",
            description: "Logged in Successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          sessionStorage.setItem("type","metamask");
          sessionStorage.setItem("userData", JSON.stringify(response.data));
          console.log(response)
          navigate("/dashboard");
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
    } else {
      toast({
        //   title: "Account created.",
        description:
          "MetaMask not detected. Please install the MetaMask extension.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
              Sign in
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
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </Stack>
              <HStack
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button w="full" variant={"outline"} leftIcon={<FcGoogle />}>
                  Google
                </Button>
                <Button
                  w="full"
                  variant={"outline"}
                  leftIcon={<MetaMaskIcon />}
                  onClick={handleMetamask}
                >
                  MetaMask
                </Button>
              </HStack>
              <Stack>
                <Text align={"center"}>
                  Not a user?{" "}
                  <Link to={"/register"}>
                    <ChakraLink color={"blue.500"}>Register</ChakraLink>
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
