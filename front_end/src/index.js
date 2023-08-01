import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
            <ChakraProvider>
                <RouterProvider router={router} />
            </ChakraProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
