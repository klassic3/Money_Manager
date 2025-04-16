import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type TransactionProps = {
    title: string;
    amount: number;
    category: string;
    date: string;
};



const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'food':
            return <MaterialCommunityIcons name="noodles" size={30} color={colors.secondary} />;
        case 'transportation':
            return <MaterialCommunityIcons name="car" size={30} color={colors.secondary} />;
        case 'entertainment':
            return <MaterialCommunityIcons name="gamepad-variant" size={30} color={colors.secondary} />;
        case 'utilities':
            return <MaterialCommunityIcons name="lightbulb-on-outline" size={30} color={colors.secondary} />;
        case 'health':
            return <MaterialCommunityIcons name="heart-pulse" size={30} color={colors.secondary} />;
        case 'education':
            return <MaterialIcons name="my-library-books" size={30} color={colors.secondary} />;
        case 'paycheck':
            return <MaterialCommunityIcons name="wallet-plus" size={30} color={colors.secondary} />;
        case 'otherIncome':
            return <MaterialCommunityIcons name="cash" size={30} color={colors.secondary} />;
        case 'otherExpense':
            return <MaterialCommunityIcons name="cash-minus" size={30} color={colors.secondary} />;
        default:
            return <MaterialCommunityIcons name="help-circle" size={30} color="gray" />;
    }
};


const Transactions = ({ title, amount, category, date }: TransactionProps) => {
    const isExpense = amount < 0;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <View style={styles.transaction}>
            <View style={styles.leftSection}>
                {getCategoryIcon(category)}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
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
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.inactive,
        width: '100%',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})