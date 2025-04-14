import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

import { SIGNUP, LOGIN, USER } from "./api";

const registerUser = async (userData) => {
    try {
        const response = await api.post(SIGNUP, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const loginUser = async (userData) => {
    try {
        const response = await api.post(LOGIN, userData);

        const token = response.data.token;

        AsyncStorage.setItem("authToken", token); // Store the token in AsyncStorage

        return response.data;

    } catch (error) {
        throw error.response.data;
    }
}

const getUser = async () => {
    try {
        const response = await api.get(USER);
        return response.data;
    } catch (error) {
        throw error.response.data; // This will throw the error for further handling
    }
}

export {
    registerUser,
    loginUser,
    getUser,
}