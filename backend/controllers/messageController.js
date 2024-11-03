import Message from '../models/MessageModel.js';
import { getConnectedUsers, getIO } from '../socket/socketServer.js';

export const sendMessage = async (req, res) => {
    try {
        const { content, receiverId } = req.body;

        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content,
        });

        //SEND THE MESSAGE IN REAL TIME TO THE RECEIVER VIA SOCKET.IO

        const io = getIO();
        const connectedUsers = getConnectedUsers();
        const receiverSocketId = connectedUsers.get(receiverId);

        if(receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', {
                message: newMessage,
            });
        }


        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            message: newMessage,
        });
    } catch (error) {
        console.log('Error in sendMessage controller: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export const getConversation = async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id },
            ],
        }).sort('createdAt');
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.log('Error in getConversation controller: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};