import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type cardProp = {
    balance: number;
    income: number;
    expense: number;
};
const Card = ({ balance, income, expense }: cardProp) => {

    const currentDate = new Date();
    const monthIndex = String(currentDate.getMonth() + 1).padStart(2, '0');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[parseInt(monthIndex) - 1];

    return (
        <View style={styles.card}>
            <Text style={styles.balanceText}>Current Balance</Text>
            <Text style={styles.balanceAmount}>{balance}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <View
                    style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.inactive,
                        borderStyle: 'dashed',
                    }}
                />

                <Text style={{ fontSize: 16, color: colors.primaryText, marginHorizontal: 10 }}>
                    {month}
                </Text>

                <View
                    style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.inactive,
                        borderStyle: 'dashed',
                    }}
                />
            </View>

            <View style={styles.cashFlow}>
                {/* Income Block */}
                <View style={styles.cashFlowBlock}>
                    <MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={45} color={colors.income} />
                    <View>
                        <Text style={styles.incomeText}>Income</Text>
                        <Text style={styles.incomeAmount}>{income}</Text>
                    </View>

                </View>

                {/* Expense Block */}
                <View style={styles.cashFlowBlock}>
                    <MaterialCommunityIcons name="arrow-down-bold-hexagon-outline" size={45} color={colors.expense} />
                    <View>
                        <Text style={styles.expenseText}>Expense</Text>
                        <Text style={styles.expenseAmount}>{expense}</Text>
                    </View>

                </View>
            </View>

        </View >
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
        textAlign: 'center',
        color: colors.primaryText,
    },
    cashFlow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    cashFlowBlock: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
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
