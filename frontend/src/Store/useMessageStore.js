import { create } from 'zustand';
import { axiosInstance } from '../Config/axios';
import toast from "react-hot-toast";
import { getSocket } from '../socket/socketClient';
import { useAuthStore } from '../Store/useAuthStore';

export const useMessageStore = create((set) => ({
    messages: [],
    loading: true,

    sendMessage: async (receiverId, content) => {
        try {
            //show message in the chat immediately
            set(state => ({ 
                messages: [...state.messages, { _id: Date.now(), sender: useAuthStore.getState().authUser._id, content }],
            }));
            const res = await axiosInstance.post('/messages/send/', { receiverId, content });
        } catch (error) {
            toast.error(error.response.data.message || "Failed to send message");
        }
    },
    
    getMessages: async (userId) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.get(`/messages/conversation/${userId}`);
            set(({ 
                messages: res.data.messages,
            }));
		} catch (error) {
			console.log(error);
			set({ messages: [] });
		} finally {
			set({ loading: false });
		}
	},

    subscribeToMessages: () => {
        const socket = getSocket();
        socket.on('newMessage', ({message}) => {
            set((state) => ({ messages: [...state.messages, message] }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = getSocket();
        socket.off('newMessage');
    }

}));