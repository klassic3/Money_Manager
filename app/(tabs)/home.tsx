import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/theme'
import Card from '@/components/card'
import CreateTransaction from '@/components/createTransaction'
import Transactions from '@/components/transactions'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getUser } from '@/services/userServices'
import { getTransactions } from '@/services/transactionServices'

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

const home = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    const getAllTransactions = async () => {
        const res = await getTransactions()
        setTransactions(res)
    }

    const getBalance = async () => {
        const res = await getUser()
        setBalance(res.balance)
    }

    useEffect(() => {  
        getAllTransactions()
        getBalance()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background }}>
            <Card balance={balance} income={1000} expense={2000} />
            <Text style={
                {
                    textAlign: 'left',
                    fontSize: 16,
                    fontWeight: 'bold',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.inactive,
                    paddingBottom: 10,
                    marginTop: 20,
                    paddingLeft: 20,
                }
            }>Recent Transactions</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id}  // Unique key for each item in the list
                renderItem={({ item }) => (
                    <Transactions title={item.title} date={item.date} amount={item.amount} />
                )}
            />
            <CreateTransaction
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                refreshTransactions={() => {
                    getAllTransactions();
                    getBalance();} }// Pass the function to refresh transactions
            />
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)} >
                <FontAwesome6 name="circle-plus" size={60} color={colors.secondary} />
            </TouchableOpacity>
        </View>
    )
}

export default home

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 55,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
})