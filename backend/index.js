import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { createServer } from 'http';
import { initializeSocket } from './socket/socketServer.js';

//routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import messagesRoutes from './routes/messageRoutes.js';

//config
dotenv.config();
const app = express();
app.use(express.json({
     limit: '50mb'
}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const httpServer = createServer(app);


initializeSocket(httpServer);

app.use('/api/auth', authRoutes);    
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messagesRoutes);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});