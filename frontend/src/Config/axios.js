import axios from 'axios';


//TODO UPDATE BASE URL IN DEPLOYMENT

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/' : '/api';
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});