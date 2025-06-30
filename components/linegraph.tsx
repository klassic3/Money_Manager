import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '@/constants/theme'; // Assuming you have a theme
import { getMonthlyTrends } from '@/services/transactionServices';

const Linegraph = () => {
    const screenWidth = Dimensions.get('window').width;

    const [data, setData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0],
                color: (opacity = 1) => colors.secondary,
                strokeWidth: 2,
            },
        ],
        legend: ["Monthly Trends"],
    });

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 0,
        color: (opacity = 1) => colors.primary,
        labelColor: (opacity = 1) => colors.primaryText,
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#2980b9",
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMonthlyTrends()
            const chartData = {
                labels: res.map((item: { month: string; totalSpent: number }) => item.month.slice(0, 3)), 
                datasets: [
                    {
                        data: res.map((item: { month: string; totalSpent: number }) => Math.abs(item.totalSpent)),
                        color: (opacity = 1) => colors.secondary,
                        strokeWidth: 2,
                    },
                ],
                legend: ["Monthly Trends"],
            };
            setData(chartData)
        };

        fetchData()
    }
        , []);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Spending Over Time</Text>
            <LineChart
                data={data}
                width={screenWidth - 48}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chartStyle}
            />
        </View>
    );
};

export default Linegraph;

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
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.primaryText,
        alignSelf: 'flex-start',
        borderBottomColor: colors.inactive,
        borderBottomWidth: 0.9,
        paddingBottom: 8,
        width: '100%',
    },
    chartStyle: {
        borderRadius: 10,
    },
});
