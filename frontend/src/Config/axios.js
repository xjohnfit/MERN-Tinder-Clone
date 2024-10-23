import axios from 'axios';


//UPDATE BASE URL IN DEPLOYMENT
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    withCredentials: true,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});