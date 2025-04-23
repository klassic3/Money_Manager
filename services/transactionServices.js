import { CREATETRANSACTION, GETTRANSACTION, MONTHLYDATA, MONTHLYCATEGORIES, MONTHLYTREND, FILTEREDTRANSACTIONS } from "./api";
import api from "./api";

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

const getFilteredTransactions = async (category, startDate, endDate) => {
    try {
        const response = await api.get(FILTEREDTRANSACTIONS,
            {
                params: { category: category.join(','), startDate, endDate }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
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

const getMonthlyCategories = async (month, year) => {
    try {
        const response = await api.get(MONTHLYCATEGORIES,
            {
                params: { month, year }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const getMonthlyTrends = async () => {
    try {
        const response = await api.get(MONTHLYTREND);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export {
    createTransaction,
    getTransactions,
    getFilteredTransactions,
    getMonthlyData,
    getMonthlyCategories,
    getMonthlyTrends,
}
