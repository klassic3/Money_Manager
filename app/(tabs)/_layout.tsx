import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router'
import { colors } from '@/constants/theme';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TransactionProvider, useTransactionContext } from '@/hooks/transactionContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CreateTransaction from '@/components/createTransaction';

export default function TabLayout() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <TransactionProvider>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
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
                        name="spacer"
                        options={{
                            tabBarButton: () => null, // Hides it completely
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
                <CreateTransaction
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                />
                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: 0, // Place it just above the tab bar
                    left: '50%', // Center it horizontally
                    marginLeft: -25, // Half of the FAB size to center it perfectly
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    zIndex: 10,
                }} onPress={() => setModalVisible(true)} >
                    <FontAwesome6 name="circle-plus" size={50} color={colors.secondary} />
                </TouchableOpacity>
            </View>
        </TransactionProvider >
    )
}