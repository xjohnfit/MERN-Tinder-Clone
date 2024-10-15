import Message from "../models/MessageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { content, receiverId } = req.body;

        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content
        });
    } catch (error) {
        
    }
};

export const getConversation =  async (req, res) => {};