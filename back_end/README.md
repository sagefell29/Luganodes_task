# User Management Dashboard with Multi-Authentication

This web application provides a flexible authentication system, allowing users to sign up and log in using either email/password or Web3 authentication with their Ethereum wallets. JWT (JSON Web Tokens) are used for secure session management in both cases.

## Technologies Used

- Front-end: React.js
- Back-end: Node.js, Express.js
- Database: MongoDB

## Features

- User Registration and Login:
  - Implemented user registration and login functionality with email/password authentication.
  - Users can sign up with an email and password and log in using their credentials.
- Web3 Authentication Integration:
  - Integrated Web3 authentication to allow users to log in using their Ethereum wallets (MetaMask).
  - Users can securely connect their Ethereum wallets to authenticate themselves.
- JWT-Based Session Management:
  - Implement a JWT-based session management system for both email/password <!-- and Web3 --> authentication methods.
  - Users maintain their sessions securely using the JWT tokens.
- Secure Storage of Credentials:
  - Safely store user credentials and authentication-related information in the database.
  - Use proper encryption and security measures to protect sensitive data using crypto and bcryptjs modules.
- Authentication Portability:
  - Allow users to switch between email/password and Web3 authentication methods seamlessly.
- User Dashboard:
  - Create a user dashboard that displays relevant information and allows users to manage their account settings.
- Account Recovery Mechanism:
  - Add an email-based account recovery mechanism for the email/password authentication.

## Backend

### API Endpoints for Backend

1. 'POST /api/users/add': Creates a new user account with email/password authentication.
2. 'POST /api/users/login': Authenticate a user using email/password.
3. 'GET /api/users/get': Get user details by email.

### Middleware

- getUser: Middleware to authenticate the user's credibility based on the provided JWT token. It is used to authenticate and retrieve the user's credibility before being able to access the protected route (getUser).

<!-- Bonus Points (Optional): -->
<!-- Add Google OAuth option as well. -->