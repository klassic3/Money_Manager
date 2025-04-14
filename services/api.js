// api.js (Axios Instance Configuration)
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'http://192.168.1.67:5000/api/v1'; // Your Node.js API base URL

export const SIGNUP = `/user/register`;
export const LOGIN = `/user/login`;
export const USER = `/user/user`;

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        console.log('config');
        const token = await AsyncStorage.getItem('authToken');
        console.log('token1',token);
        if (token) {
            console.log('token',token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
