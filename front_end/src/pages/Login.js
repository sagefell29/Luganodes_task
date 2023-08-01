'use client'

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
    Link as ChakraLink
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { FcGoogle } from "react-icons/fc"
import Navbar from '../components/Navbar'
import MetaMaskIcon from '../components/MetaMaskIcon'
import { Link } from 'react-router-dom'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <Navbar />
            <Flex
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign in
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    loadingText="Submitting"
                                    colorScheme='blue'
                                >
                                    Sign in
                                </Button>
                            </Stack>
                            <HStack display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Button w="full" variant={"outline"} leftIcon={<FcGoogle />}>Google</Button>
                                <Button w="full" variant={"outline"} leftIcon={<MetaMaskIcon />}>MetaMask</Button>
                            </HStack>
                            <Stack>
                                <Text align={'center'}>
                                    Not a user?  <Link to={"/register"}><ChakraLink color={"blue.500"}>Register</ChakraLink></Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}