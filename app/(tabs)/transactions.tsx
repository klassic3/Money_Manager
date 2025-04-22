import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getTransactions } from '@/services/transactionServices'
import { colors } from '@/constants/theme';
import Transactions from '@/components/transactions';

const transactions = () => {


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

useEffect(() => {
    getAllTransactions()
}, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background, paddingBottom: 40  }}>
            <Text>transactions</Text>
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

const styles = StyleSheet.create({})