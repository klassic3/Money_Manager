import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { deleteTransaction } from '@/services/transactionServices';
import { useTransactionContext } from '@/hooks/transactionContext';


import { useToast } from 'react-native-toast-notifications';


type TransactionProps = {
    _id: string;
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


const Transactions = ({ _id, title, amount, category, date }: TransactionProps) => {

    const toast = useToast();
    const { triggerRefresh } = useTransactionContext()

    const isExpense = amount < 0;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleDeleteTransaction = async (id: string) => {
        try {
            const response = await deleteTransaction(id);
            toast.show(response.message, {
                type: 'success',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            });
            triggerRefresh();
        } catch (error) {
            const err = error as Error;
            toast.show(err.message, {
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            });
        }
    };

    return (
        <View style={styles.transaction}>
            <View style={styles.leftSection}>
                {getCategoryIcon(category)}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
            <View>
                <Text style={[styles.amount, { color: isExpense ? colors.expense : colors.income }]}>
                    {isExpense ? `-$${Math.abs(amount).toFixed(2)}` : `+$${amount.toFixed(2)}`}
                </Text>
                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => handleDeleteTransaction(_id)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.secondary} />
                </TouchableOpacity>
            </View>
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
        color: colors.primaryText,
    },
    date: {
        fontSize: 12,
        color: colors.secondaryText,
        marginTop: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})