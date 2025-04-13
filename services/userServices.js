import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "./api";

import { SIGNUP, LOGIN } from "./api";

const registerUser = async (userData) => {
    try {
        const response = await api.post(SIGNUP, userData);
        console.log("User registered successfully:", response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const loginUser = async (userData) => {
    try {
        const response = await api.post(LOGIN, userData);
        console.log("User logged in successfully:", response.data);

        const token = response.data.token;

        // Save token
        await AsyncStorage.setItem('authToken', token);

        return response.data;

    } catch (error) {
        throw error.response.data;
    }
}

export {
    registerUser,
    loginUser,
}