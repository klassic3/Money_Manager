import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'


const index = () => {


    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.replace('/login')
        }, 2000)
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