import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { colors } from '@/constants/theme';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TransactionProvider } from '@/hooks/transactionContext';

export default function TabLayout() {
    return (
        <TransactionProvider>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: colors.secondary,
                    tabBarInactiveTintColor: colors.inactive,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 40,
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <FontAwesome name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='stats'
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Ionicons name="stats-chart-sharp" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='transactions'
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <MaterialCommunityIcons name="notebook-multiple" size={size} color={color} />),
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <MaterialIcons name="account-circle" size={size} color={color} />),
                    }}
                />
            </Tabs>
        </TransactionProvider>
    )
}