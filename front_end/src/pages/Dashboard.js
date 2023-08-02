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
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
const call_uri = process.env.REACT_APP_SERVER_ENDPOINT + "/get";
const update_uri = process.env.REACT_APP_SERVER_ENDPOINT + "/alter";
const call_MM = process.env.REACT_APP_SERVER_ENDPOINT + "/getMM";
const update_MM = process.env.REACT_APP_SERVER_ENDPOINT + "/alterMM";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [web3_id, setWeb3_id] = useState("");
  const type = sessionStorage.getItem("type");

  const handleUpdate = () => {
    if (type === "login") {
      const result = axios.post(update_uri, {
        name: name,
        pass: password,
        email: email,
        web3_id: web3_id
      });
      if (result) {
        
      }
    }
  };

  const callData = async () => {
    const ini_data = sessionStorage.getItem("userData");
    const token = JSON.parse(ini_data)?.token;
    console.log(token);
    if (token) {
      try {
        if (type === "login") {
          const userData = await axios.get(call_uri, {
            headers: {
              "auth-token": token,
            },
          });
          setUser(userData);
          setName(userData.data.data.name);
          setWeb3_id(userData.data.data.web3_id);
          setPassword(userData.data.data.pass);
          setEmail(userData.data.data.email);
          console.log(userData);
        } else if (type === "metamask") {
          const userData = await axios.get(call_MM, {
            headers: {
              "auth-token": token,
            },
          });
          setUser(userData);
          setUser(userData);
          setName(userData.data.data.name);
          setWeb3_id(userData.data.data.web3_id);
          setPassword(userData.data.data.pass);
          setEmail(userData.data.data.email);
          console.log(userData);
        }
      } catch {
        toast({
          description: user.data.message,
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
          width={"60%"}
        >
          <Heading fontSize={"xl"} mb={4}>
            Dashboard
          </Heading>
          <Stack spacing={4}>
            <Text>Name</Text>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Text>Email</Text>
            <Input
              value={email}
              disabled={type === "login"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {password.length === 0 && (
              <>
                {" "}
                <Text>Password</Text>
                <Input value={newPassword} onChange={(e) => {
                setNewPassword(e.target.value);
              }}/>
              </>
            )}
            <Text>Meta Mask Address</Text>
            <Input
              value={web3_id}
              disabled={type === "metamask"}
              onChange={(e) => {
                setWeb3_id(e.target.value);
              }}
            />
          </Stack>
          <Stack mt={3} alignItems={"center"} w="100%">
            <Link to={"/register"}>
              <Button variant="outline" w="250px">
                Registration Page
              </Button>
            </Link>
            <Link to={"/"}>
              <Button variant="outline" w="250px">
                Login Page
              </Button>
            </Link>
            <Button onClick={handleUpdate} variant="outline" w="250px">
              Update Info
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
