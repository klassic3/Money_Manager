import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/theme';
import { Link, Redirect, useRouter } from 'expo-router';

import { loginUser, registerUser } from '../services/userServices'; // Adjust the import according to your project structure
import { useToast } from 'react-native-toast-notifications';

const signup = () => {

    const toast = useToast()
    const router = useRouter()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSignUp = async  () => {

        if (!name || !email || !password || !confirmPassword) {
            toast.show('Please fill all fields!',{
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            return
        }

        if (password !== confirmPassword) {
            toast.show('Passwords do not match!',{
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            return
        }

        const user = {
            name: name,
            email: email,
            password: password,
        }

        const user2 = {
            email: email,
            password: password,
        }
        try {
            const res = await registerUser(user)
            const res2 = await loginUser(user2)
            toast.show(`Welcome ${res2.user.name}`, {
                type: 'success',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            router.replace('/(tabs)/home')
        }
        catch (error) {
            const err = error as Error;
            toast.show(err.message,{
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
        }
    }

    return (
        <View style={styles.background}>

                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                />

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

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

            <Text>Already have an account? <Link href="/login" style={{ color: colors.secondary }}>Log In</Link></Text> 
        </View>
    )
}

export default signup

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
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
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