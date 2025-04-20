import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '@/constants/theme';
import AntDesign from '@expo/vector-icons/AntDesign';

type cardProp = {
    balance: number;
    income: number;
    expense: number;
};
const Card = ({ balance, income, expense }: cardProp) => {
    return (
        <View style={styles.card}>
            <Text style={styles.balanceText}>Current Balance</Text>
            <Text style={styles.balanceAmount}>{balance}</Text>

            <View style={styles.cashFlow}>
                <View >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <AntDesign name="arrowup" size={20} color={colors.income} />
                        <Text style={styles.incomeText}>Income</Text>
                    </View>
                    <Text style={styles.incomeAmount}>{income}</Text>
                </View>

                <View style={[styles.alignEnd]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="arrowdown" size={20} color={colors.expense} />
                        <Text style={styles.expenseText}>Expense</Text>
                    </View>
                    <Text style={styles.expenseAmount}>{expense}</Text>
                </View>
            </View>
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        justifyContent: 'center',
    },
    balanceText: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.primaryText,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center',
        color: colors.primaryText,
    },
    cashFlow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    incomeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.income,
    },
    incomeAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.income,
        marginTop: 5,
        alignSelf: 'center',
    },
    expenseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.expense,
    },
    expenseAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.expense,
        marginTop: 5,
        alignSelf: 'center',
    },
});
