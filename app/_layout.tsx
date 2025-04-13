import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/theme'
import { ToastProvider } from 'react-native-toast-notifications'

const _layout = () => {
    return (
        <ToastProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: colors.background,
                }}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <Stack.Screen
                            name="index"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="signup"
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Stack>
                </SafeAreaView>
            </SafeAreaProvider>
        </ToastProvider>
    )
}

export default _layout

const styles = StyleSheet.create({})