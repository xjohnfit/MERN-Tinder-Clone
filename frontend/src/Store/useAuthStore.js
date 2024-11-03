import { create } from 'zustand';
import { axiosInstance } from '../Config/axios';
import toast from 'react-hot-toast';
import { initializeSocket, disconnectSocket} from '../socket/socketClient';

export const useAuthStore = create((set) => ({
    authUser: null,
    checkingAuth: true,
    loading: false,

    login: async (loginData) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post('/auth/login', loginData);
            set({ authUser: res.data.user });
            initializeSocket(res.data.user._id);
        } catch (error) {
            toast.error(
                error.response.data.message || 'An error occurred logging in'
            );
        } finally {
            set({ loading: false });
        }
    },

    signUp: async (signupData) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post('/auth/signup', signupData);
            set({ authUser: res.data.user });
            initializeSocket(res.data.user._id);
            toast.success('Account created successfully');
        } catch (error) {
            toast.error(
                error.response.data.message || 'An error occurred signing up'
            );
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
		try {
			const res = await axiosInstance.post("/auth/logout");
            disconnectSocket();
			if (res.status === 200) set({ authUser: null });
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		}
	},

    checkAuth: async () => {
        try {
			const res = await axiosInstance.get("/auth/me");
			initializeSocket(res.data.user._id);
			set({ authUser: res.data.user });
		} catch (error) {
			set({ authUser: null });
			console.log(error);
		} finally {
			set({ checkingAuth: false });
		}
    },

    setAuthUser: (user) => set({ authUser: user }),
}));
