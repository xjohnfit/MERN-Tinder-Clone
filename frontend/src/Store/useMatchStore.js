import { create } from 'zustand';
import { axiosInstance } from '../Config/axios';
import toast from 'react-hot-toast';

export const useMatchStore = create((set) => ({
    matches: [],
    userProfiles: [],
    isLoadingMatches: false,
    isLoadingUserProfiles: false,
    swipeFeedback: null,

    getMyMatches: async () => {
        try {
            set({ isLoadingMatches: true });
            const res = await axiosInstance.get('/matches');
            set({ matches: res.data.matches });
        } catch (error) {
            set({ matches: [] });
            toast.error(error.response.data.message || 'Failed to fetch matches');
        } finally {
            set({ isLoadingMatches: false });
        }
    },

    getUserProfiles: async () => {
        try {
            set({ isLoadingUserProfiles: true });
            const res = await axiosInstance.get('/matches/user-profiles');
            set({ userProfiles: res.data.users });
        } catch (error) {
            set({ userProfiles: [] });
            toast.error(error.response.data.message || 'Failed to fetch matches');
        } finally {
            set({ isLoadingUserProfiles: false });
        }
    },

    swipeLeft: async (user) => {
        try {
			set({ swipeFeedback: "passed" });
			await axiosInstance.post("/matches/swipe-right/" + user._id);
		} catch (error) {
			console.log(error);
			toast.error("Failed to swipe right");
		} finally {
			setTimeout(() => set({ swipeFeedback: null }), 1500);
		}
    },

    swipeRight: async (user) => {
        try {
            set({ swipeFeedback: 'liked' });
            await axiosInstance.post(`/matches/swipe-right/${user._id}`);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || 'Failed to swipe right');
        } finally {
            setTimeout(() => set({ swipeFeedback: null }), 1500);
        }
    },
}));