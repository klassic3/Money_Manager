import api from "./api";
import {CREATETRANSACTION, GETTRANSACTION} from "./api";

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
export {
    createTransaction,
    getTransactions,
}
