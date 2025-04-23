import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFilteredTransactions, getTransactions } from '@/services/transactionServices'
import { colors } from '@/constants/theme';
import Transactions from '@/components/transactions';
import { useTransactionContext } from '@/hooks/transactionContext';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Filter from '@/components/filter';


const transactions = () => {

    const { refreshFlag } = useTransactionContext()

    const [modalVisible, setModalVisible] = useState(false)

    interface Transaction {
        _id: string;
        amount: number;
        category: string;
        date: string;
        description: string;
        title: string;
        userId: {
            _id: string;
            email: string;
            name: string;
        };
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);


    const getAllTransactions = async () => {
        const res = await getTransactions()
        setTransactions(res)
    }

    const handleFilter = async (selectedCategories: string[]) => {
        const res = await getFilteredTransactions(selectedCategories)
        setTransactions(res.transactions)
    }

    useEffect(() => {
        getAllTransactions()
    }, [refreshFlag])

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background, paddingBottom: 40 }}>
            <View style={styles.titleView}>
                <Text style={styles.title}>All Transactions</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="filter-list" size={24} color={colors.secondary} />
                </TouchableOpacity>
            </View>
            <Filter
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                filter={handleFilter}
            />
            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id}  // Unique key for each item in the list
                renderItem={({ item }) => (
                    <Transactions title={item.title} date={item.date} amount={item.amount} category={item.category} />
                )}
            />
        </View>
    )
}

export default transactions

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.inactive
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primaryText,
        alignSelf: 'flex-start',
    },
})