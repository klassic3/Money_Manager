import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

import { SIGNUP, LOGIN, USER , CHANGEPASSWORD } from "./api";

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

        AsyncStorage.setItem("authToken", token);

        return response.data;

    } catch (error) {
        throw error.response.data;
    }
}

const changePassword = async (passwordData) => {
    try {
        const response = await api.post(CHANGEPASSWORD, passwordData);
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
        throw error.response.data;
    }
}

export {
    registerUser,
    loginUser,
    changePassword,
    getUser,
}