import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/theme'
import Card from '@/components/card'
import CreateTransaction from '@/components/createTransaction'
import Transactions from '@/components/transactions'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getUser } from '@/services/userServices'
import { getMonthlyData, getTransactions } from '@/services/transactionServices'
import { useTransactionContext } from '@/hooks/transactionContext'
import { useRouter } from 'expo-router'

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
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

    const { triggerRefresh } = useTransactionContext()
    const { refreshFlag } = useTransactionContext()
    const router = useRouter()

    const getAllTransactions = async () => {
        const res = await getTransactions()
        setTransactions(res)
    }

    const getBalance = async () => {
        const res = await getUser()
        setBalance(res.balance)
    }

    const getMonthly = async () => {
        const res = await getMonthlyData()
        setIncome(res.monthlyIncome)
        setExpense(res.monthlyExpense)
    }

    const getProfile = async () => {
        try {
            const res = await getUser()
            setUserData({
                name: res.name,
                email: res.email,
            })
        }
        catch (error) {
            const err = error as Error;
            console.log(err.message)
        }
    }

    useEffect(() => {
        getAllTransactions()
        getBalance()
        getMonthly()
        getProfile()
    }, [refreshFlag])

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hello, {userData?.name}</Text>

            <Card balance={balance} income={income} expense={expense} />

            <View style={styles.transactionHeader}>
                <Text style={styles.transactionTitle}>Recent Transactions</Text>
                <TouchableOpacity onPress={() => router.push('/transactions')}>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={transactions.slice(0, 7)}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Transactions
                        _id={item._id}
                        title={item.title}
                        date={item.date}
                        amount={item.amount}
                        category={item.category}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: colors.background,
    },
    greeting: {
        width: '100%',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        marginBottom: 10,
        color: colors.primaryText,
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.inactive,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primaryText,
    },
    viewAll: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secondary,
    },
})