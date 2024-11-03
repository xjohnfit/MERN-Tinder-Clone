# MERN Real-Time Matches & Messaging App

This is a full-stack web application built with the **MERN** stack (MongoDB, ExpressJS, ReactJS, NodeJS). It enables users to connect in real-time for matches and chat using **Socket.IO** and features a modern UI with **React**.

## Features

- **User Authentication**: Secure registration and login
- **Real-Time Chat**: Instant messaging with **Socket.IO**
- **Match-Making**: Swipe-based matching feature
- **Emoji Support**: Use emojis in messages
- **Toast Notifications**: Interactive UI notifications
- **State Management**: Powered by **Zustand**

## Technologies

- **Frontend**: ReactJS, Axios, Zustand
- **Backend**: NodeJS, ExpressJS, MongoDB
- **Real-Time**: Socket.IO
- **Authentication**: JSON Web Tokens (JWT)
- **Media Management**: Cloudinary

## Project Structure

```
├── backend                 # ExpressJS backend
│   ├── config             # Database and Cloudinary configurations
│   ├── controllers        # API controllers and business logic
│   ├── middleware         # Middleware for protected routes
│   ├── models             # Mongoose models for MongoDB
│   ├── routes             # API routes
│   └── seeds              # Seed file to seed database with random users
│   └── socket             # Socket.io server config file
.
├── frontend                 # ReactJS frontend
│   ├── public
│   └── src
├── .env                   # Environment variables
├── .gitignore
├── README.md
└── package.json
```

## Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** (local or MongoDB Atlas)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/xjohnfit/MERN-Tinder-Clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd MERN-Tinder-Clone
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   npm install
   cd frontend && npm install
   ```

4. Set up the environment variables in the `.env` file in the root of the **server** folder:

   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development or production
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   CLIENT_URL=your localhost:PORT
   ```

5. Run the app in development mode (both server and client):

   ```bash
   npm run dev
   ```

   The app should now be running on `http://localhost:5173` (client/frontend) and `http://localhost:5000` (server/backend).

## Backend Dependencies

- **bcryptjs**: Password hashing
- **cloudinary**: Cloud-based image storage
- **cookie-parser**: Parse cookies
- **cors**: Handle cross-origin requests
- **dotenv**: Manage environment variables
- **express**: Backend framework
- **jsonwebtoken**: JWT-based authentication
- **mongoose**: MongoDB modeling
- **socket.io**: Real-time communication
- **concurrently**: Run client and server simultaneously in development

## Frontend Dependencies

- **axios**: For HTTP requests
- **emoji-picker-react**: Emoji picker for messaging
- **lucide-react**: Icon library
- **react-dom**: DOM-specific methods for React
- **react-router-dom**: Routing for React
- **react-hot-toast**: Toast notifications
- **react-tinder-card**: Swipe card animations
- **socket.io-client**: Client-side socket for real-time communication
- **zustand**: Lightweight state management

## Scripts

- **`npm run dev`**: Start server and client in development mode
- **`npm run backend`**: Start only the server
- **`npm run frontend`**: Start only the client

## Usage

1. Register or log in to start connecting with other users.
2. Swipe through user profiles to find matches.
3. Use real-time messaging to communicate with matches.
4. Enjoy interactive features like emoji support and notifications.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.

---