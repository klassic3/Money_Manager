import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/theme'
import { Link, useRouter } from 'expo-router'
import { loginUser } from '@/services/userServices'
import { useToast } from 'react-native-toast-notifications'

const login = () => {

    const toast = useToast()

    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {

        if (!email || !password) {
            toast.show('Please fill all fields!', {
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            return
        }

        const user = {
            email: email,
            password: password,
        }

        try {
            const res = await loginUser(user)
            toast.show('Login successful!', {
                type: 'success',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            router.replace('/(tabs)/home')
        }
        catch (error) {
            const err = error as Error;
            toast.show(err.message, {
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
        }
    }

    return (
        <View style={styles.background}>

            <Image
                resizeMode='contain'
                source={require('../assets/images/money.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Welcome to MoneyManager</Text>

            <Text style={styles.subtitle}>Login to start tracking your expenses!</Text>

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text>Don't have an account? <Link href="/signup" style={{ color: colors.secondary }}>Sign Up</Link></Text> 
        </View>
    )
}

export default login

const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 24,
        backgroundColor: colors.background,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 16,
        textAlign: 'center',
        color: '#666',
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
})