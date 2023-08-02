

<p align="center">
  ·
  <a href="https://github.com/sagefell29/Luganodes_task/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBug%5D%3A+">Report a bug</a> 
  ·
  <a href="https://github.com/sagefell29/Luganodes_task/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeat%5D%3A+">Request a feature</a>
  ·
  </p>
</p>


<p align="center">
  <a href="https://github.com/sagefell29/Luganodes_task/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/sagefell29/Luganodes_task.svg?style=flat">
  </a>
  <a href="https://github.com/sagefell29/Luganodes_task/network/members">
    <img src="https://img.shields.io/github/forks/sagefell29/Luganodes_task?style=flat">
  </a>  
  <a href="https://github.com/sagefell29/Luganodes_task/stargazers">
    <img src="https://img.shields.io/github/stars/sagefell29/Luganodes_task?style=flat">
  </a>
  <a href="https://github.com/sagefell29/Luganodes_task/issues">
    <img src="https://img.shields.io/github/issues/sagefell29/Luganodes_task?style=flat">
  </a>
</p>

<details open="open">
  <summary><h3 style="display: inline-block">Table of Contents</h3></summary>
  <ol>
    <li><a href="#-about-the-project">About The Project</a>
      <ul>
        <li><a href="#-tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#-contributing">Contributing</a></li>
  </ol>
</details>

## <img src="https://openclipart.org/download/307315/1538154643.svg" width="32" height="32"> About the project

This web application provides a flexible authentication system, allowing users to sign up and log in using either email/password or Web3 authentication with their Ethereum wallets. JWT (JSON Web Tokens) are used for secure session management in both cases.

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

## ⚒⚙ Tech Stack

<ul>
<li>React.js</li>
<li>ChakraUI</li>
<li>Node.js</li>
<li>Express.js</li>
<li>MongoDB</li>
<li>MetaMask</li>

</ul>

## <img src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" width="32" height="32"> Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

In order to get a copy of the project you will require you to have Node.js (v14+) and the NPM package manager installed. If you don't have it, you can download the latest version of Node.js from the [official website](https://nodejs.org/en/download/) which also installs the NPM package manager by default.

### Installation

Open the terminal in the folder in which you wish to clone the repository and enter the following command:

```bash
git clone https://github.com/sagefell29/Luganodes_task.git
```
```bash
cd Luganodes_task
```
For Frontend
```bash
cd front_end
```
For Backend
```bash
cd back_end
```

Install all the NPM packages:
```bash
npm i
```
In order to run the frontend
```bash
npm run start
```
In order to run the backend
```bash
nodemon index
```
> Frontend is available at = http://localhost:3000

> Backend is available at = http://localhost:8000

#### 1. Using Docker

In order to test our service we first need to build and run docker-compose. Docker-compose will automate the build and the run of our two Dockerfile.
To run this commands you must be in the repository’s root.
1. Build the Image
```bash
docker-compose build
```

2. Start the service
```bash
docker-compose up -d
```


> *Note that you will have to add your own `.env` file at the root directory and add your own environment variables for the project to build.*
> Following are the environment variables used:

For Frontend

`REACT_APP_SERVER_ENDPOINT`=http://localhost:8000/user

`REACT_APP_GOOGLE_OAUTH_CLIENT_ID`=
`REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET`=
`REACT_APP_GOOGLE_OAUTH_REDIRECT`=

For Backend 

`MONGO_URI` = your mongo uri

`PORT` = 8000

`SECRET_KEY` = your secret key



## <img src="https://hpe-developer-portal.s3.amazonaws.com/uploads/media/2020/3/git-icon-1788c-1590702885345.png" width=32 height=32> Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are *greatly appreciated*.

1. Fork the Project. [(Refer the get started instructions)](#-getting-started)
2. Create your Feature Branch. (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes. (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch. (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.
