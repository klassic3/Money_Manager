import api from "./api";
import {CREATETRANSACTION, GETTRANSACTION, MONTHLYDATA} from "./api";

const createTransaction = async (transactionData) => {
    try {
        const response = await api.post(CREATETRANSACTION, transactionData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getTransactions = async () => {
    try {
        const response = await api.get(GETTRANSACTION);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const getMonthlyData = async () => {
    try {
        const response = await api.get(MONTHLYDATA);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


export {
    createTransaction,
    getTransactions,
    getMonthlyData,
}
