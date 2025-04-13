import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {

    const router = useRouter();
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken')
            setTimeout(() => {
                if (token) {
                    router.replace('/(tabs)/home') // go to your main app
                } else {
                    router.replace('/login')
                }
            }, 2000)
        }

        checkAuth()

    }, [])
    return (
        <View style={styles.container}>
            <Image
                resizeMode='contain'
                source={require('../assets/images/GGEZ5.png')}
                style={styles.logo}
            />

        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 50,
    },
})