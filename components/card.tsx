import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Card = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.balanceText}>Current Balance</Text>
            <Text style={styles.balanceAmount}>$1000</Text>

            <View style={styles.cashFlow}>
                <View >
                    <Text style={styles.incomeText}>Income</Text>
                    <Text style={styles.incomeAmount}>+$5000</Text>
                </View>

                <View style={[styles.alignEnd]}>
                    <Text style={styles.expenseText}>Expenses</Text>
                    <Text style={styles.expenseAmount}>-$4000</Text>
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
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center',
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
        color: '#4CAF50',
    },
    incomeAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 5,
    },
    expenseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F44336',
    },
    expenseAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F44336',
        marginTop: 5,
    },
});
