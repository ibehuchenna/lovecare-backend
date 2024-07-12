# LoveCare Backend

This repository contains the backend code for the LoveCare project. It is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment Server](#deployment-server)
- [About Render](#about-render)

## Features

- Real-time messaging with Socket.IO
- User authentication with tokens
- User profiles for caretakers and care receivers
- Request management for care services
- Integration with Video SDK

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)
- npm (v6 or above)

## Installation

Follow these steps to set up the application:

### Clone the Repository

```bash
git clone https://github.com/ibehuchenna/lovecare-backend.git
cd lovecare-backend
```

### Install Dependencies
```bash
Copy code
npm install --legacy-peer-deps
```

### Running the Project
To start the server, run:

```bash
Copy code
npm start
``` 
For development, use nodemon to automatically restart the server on changes:

```bash
Copy code
npm run dev
```
### Environment Variables
Create a .env file in the root directory and add the following variables:

- PORT=4000
- MONGO_URI=<your_mongo_uri>
- JWT_SECRET=<your_jwt_secret>
- VIDEO_SDK_API_KEY=<your_video_sdk_api_key>
- VIDEO_SDK_API_SECRET=<your_video_sdk_api_secret>
## API Endpoints
### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
#### Caretaker Profiles
- GET /api/caretaker-profiles - Get all caretaker profiles
- POST /api/caretaker-profiles - Create a new caretaker profile
- GET /api/caretaker-profiles/:id - Get a caretaker profile by ID
- PUT /api/caretaker-profiles/:id - Update a caretaker profile by ID
- DELETE /api/caretaker-profiles/:id - Delete a caretaker profile by ID
#### Care Receiver
- GET /api/care-receiver - Get all care receivers
- POST /api/care-receiver - Create a new care receiver
- GET /api/care-receiver/:id - Get a care receiver by ID
- PUT /api/care-receiver/:id - Update a care receiver by ID
- DELETE /api/care-receiver/:id - Delete a care receiver by ID
#### Requests
- GET /api/requests - Get all requests
- POST /api/requests - Create a new request
- GET /api/requests/:id - Get a request by ID
- PUT /api/requests/:id - Update a request by ID
- DELETE /api/requests/:id - Delete a request by ID
#### Messages
- GET /api/messages - Get all messages
- POST /api/messages - Create a new message
- GET /api/messages/:id - Get a message by ID
- PUT /api/messages/:id - Update a message by ID
- DELETE /api/messages/:id - Delete a message by ID
### Deployment Server
This backend is hosted on [Render](https://render.com/).

### About Render
Render is a cloud platform that provides a streamlined way to deploy and manage applications and services. It is not based on AWS but is an independent platform that offers similar functionality. Render abstracts away much of the complexity involved in deploying applications, making it easier for developers to get their projects online quickly.