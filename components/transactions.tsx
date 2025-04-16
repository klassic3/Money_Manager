import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme';

type TransactionProps = {
    title: string;
    amount: number;
    date: string;
};

const Transactions = ({ title, amount, date }: TransactionProps) => {
    const isExpense = amount < 0;
    return (
        <View style={styles.transaction}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={[styles.amount, { color: isExpense ? '#F44336' : '#4CAF50' }]}>
                {isExpense ? `-$${Math.abs(amount).toFixed(2)}` : `+$${amount.toFixed(2)}`}
            </Text>
        </View>
    )
}

export default Transactions

const styles = StyleSheet.create({
    transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.inactive,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
})