"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
const call_uri = process.env.REACT_APP_SERVER_ENDPOINT + "/get";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const toast = useToast();

  const callData = async () => {
    const ini_data = sessionStorage.getItem("userData");
    const token = JSON.parse(ini_data)?.token;
    if (token) {
      try {
        const userData = await axios.get(call_uri, {
          headers: {
            "auth-token": token,
          },
        });
        setUser(userData);
        console.log(user);
      } catch {
        toast({
          description: "response.data.message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        description: "Cannot find auth-token.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    callData();
  }, []);
  return (
    <>
      <Navbar />
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        height={"100vh"}
      >
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Heading fontSize={"xl"} mb={4}>
            Dashboard
          </Heading>
          {/* <Box>
            <Text>Name: {user.data.data.name}</Text>)
            <Text>Email: {user.data.data.email}</Text>
            <Text>Web3 ID: {user.web3_id}</Text>
          </Box> */}
          <Stack mt={3} alignItems={"center"}>
            <Link to={"/register"}>
              <Button variant="outline">Registration Page</Button>
            </Link>
            <Link to={"/"}>
              <Button variant="outline">Login Page</Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
