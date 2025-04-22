import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import React, { useEffect, useState } from 'react'
import { getMonthlyCategories } from '@/services/transactionServices'
import { colors } from '@/constants/theme'
import { useTransactionContext } from '@/hooks/transactionContext'

import FontAwesome from '@expo/vector-icons/FontAwesome';

const Piechart = () => {

    const { refreshFlag } = useTransactionContext()
    const { triggerRefresh } = useTransactionContext()


    const [backendData, setBackendData] = useState([
        { category: "food", totalSpent: 0 },
        { category: "transportation", totalSpent: 0 },
        { category: "health", totalSpent: 0 },
        { category: "entertainment", totalSpent: 0 },
        { category: "utilities", totalSpent: 0 },
        { category: "otherExpenses", totalSpent: 0 },
    ])



    const [pieChartData, setPieChartData] = useState([
        { name: "food", population: 0, color: "#FF6384", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "transportation", population: 0, color: "#36A2EB", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "health", population: 0, color: "#FFCE56", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "entertainment", population: 0, color: "#4BC0C0", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "utilities", population: 0, color: "#9966FF", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "otherExpense", population: 0, color: "#FF9F40", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    ])

    const [income, setIncome] = useState(0)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [nodata, setNodata] = useState(false)

    // Colors for categories (assign as needed or dynamically)
    const categoryColors: { [key: string]: string } = {
        food: "#E1F0FF",
        transportation: "#2C3E91",
        health: "#9EE6DA",
        entertainment: "#BFA2FF",
        education: "#5578D8",
        utilities: "#A7D0F2",
        otherExpense: "#CBD6E2",
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const screenWidth = Dimensions.get("window").width;

    const monthIndex = String(currentDate.getMonth() + 1).padStart(2, '0');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const year = currentDate.getFullYear().toString();
    const month = monthNames[parseInt(monthIndex) - 1];

    const getMonthlyCategoriesData = async () => {
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        const data = await getMonthlyCategories(month, year)
        console.log(data)
        if (data.length === 0) {
            setNodata(true);
        }
        else{
            setNodata(false);
        }
        const incomeCategories = ['paycheck', 'otherIncome'];

        const incomeData = data.filter((item: { category: string; totalSpent: number }) =>
            incomeCategories.includes(item.category)
        );

        const expenseData = data.filter((item: { category: string; totalSpent: number }) =>
            !incomeCategories.includes(item.category)
        );

        const totalIncome = incomeData.reduce(
            (acc: number, item: { totalSpent: number }) => acc + Math.abs(item.totalSpent),
            0
        );

        setIncome(totalIncome)

        setBackendData(expenseData)
    }

    useEffect(() => {
        getMonthlyCategoriesData()
    }, [refreshFlag])


    useEffect(() => {
        const data = backendData.map((item) => ({
            name: item.category,
            population: Math.abs(item.totalSpent),
            color: categoryColors[item.category] || getRandomColor(),
            legendFontColor: colors.inactive,
            legendFontSize: 15
        }));
        setPieChartData(data);
    }, [backendData]);

    const handleMonthChange = (direction: 'next' | 'prev') => {
        const today = new Date();
        const date = new Date(currentDate);

        if (direction === 'next') {
            const nextMonth = new Date(date);
            nextMonth.setMonth(date.getMonth() + 1);

            // Prevent going beyond the current month
            if (nextMonth.getMonth() > today.getMonth() && nextMonth.getFullYear() >= today.getFullYear()) {
                return;
            }

            setCurrentDate(nextMonth);
        } else {
            // Go to previous month
            const prevMonth = new Date(date);
            prevMonth.setMonth(date.getMonth() - 1);
            setCurrentDate(prevMonth);
        }
        triggerRefresh();
    };



    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Category Breakdown</Text>
                <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', marginBottom: 16 }}>
                    <TouchableOpacity onPress={() => handleMonthChange('prev')}>
                        <FontAwesome name="chevron-left" size={16} color={colors.secondary} />
                    </TouchableOpacity>
                    <Text style={styles.month}> {month}, {year} </Text>
                    <TouchableOpacity onPress={() => handleMonthChange('next')}>
                        <FontAwesome name="chevron-right" size={16} color={colors.secondary} />
                    </TouchableOpacity>
                </View>

            </View>

            {nodata ?
                (
                    <Text>No data</Text>
                ) : (
                    <>
                        <PieChart
                            data={pieChartData}
                            width={screenWidth - 32}
                            height={220}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[75, 0]}
                            absolute
                            hasLegend={false}
                        />

                        <View style={styles.legendContainer}>
                            <View style={[styles.legendRow, {
                                borderBottomColor: colors.inactive,
                                borderBottomWidth: 0.9,
                                paddingBottom: 8,
                            }]}>
                                <Text style={styles.legendText}>Income</Text>
                                <Text style={[styles.legendAmount, { color: colors.income }]}>{income}</Text>
                            </View>

                            {pieChartData.map((item, index) => (
                                <View key={item.name || index}>
                                    <View style={styles.legendRow}>
                                        <Text style={styles.legendText}>{capitalizeFirst(item.name)}</Text>
                                        <Text style={styles.legendAmount}>{item.population}</Text>
                                    </View>
                                    <View style={styles.progressBarBackground}>
                                        <View
                                            style={[
                                                styles.progressBarFill,
                                                {
                                                    backgroundColor: item.color,
                                                    width: `${(item.population / income) * 100}%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>
                            ))}

                        </View>
                    </>
                )
            }

        </View>
    )
}

export default Piechart

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.inactive,
        borderBottomWidth: 0.9,
        paddingBottom: 8,
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.primaryText,
        alignSelf: 'flex-start',
    },
    month: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primaryText,
    },
    legendContainer: {
        marginTop: 16,
        width: '100%',
    },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
        paddingBottom: 4,
    },
    legendText: {
        fontSize: 16,
        color: colors.primaryText,
    },
    legendAmount: {
        fontSize: 16,
        color: colors.expense,
    },
    progressBarBackground: {
        width: '100%',
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
        marginTop: 4,
    },

    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
})