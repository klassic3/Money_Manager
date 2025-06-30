import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { getUser } from '@/services/userServices'

import Password from '@/components/password'

const profile = () => {

    const router = useRouter()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await getUser()
                setUserData({
                    name: res.name,
                    email: res.email,
                })
            }
            catch (error) {
                const err = error as Error;
                console.log(err.message)
            }
        }
        getProfile()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background, paddingBottom: 40 }}>
            <Text style={styles.title}>Profile</Text>
            <Image
                resizeMode="contain"
                source={require('../../assets/images/Profile.png')}
                style={styles.logo}
            />
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>

            <View style={styles.section}>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Theme</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => setPasswordVisible(true)}>
                    <Text style={styles.itemText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        AsyncStorage.removeItem('authToken');
                        router.replace('/login');
                    }}
                >
                    <Text style={styles.itemText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <Password
                    visible={passwordVisible}
                    onClose={() => setPasswordVisible(false)}
                />
        </View>
    );
};

export default profile;

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        borderRadius: 50,
    },
    title: {
        width: '100%',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        marginBottom: 10,
        color: colors.primaryText,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        width: '100%',
        marginTop: 20,
        marginBottom: 24,
        borderTopWidth: 1,
        borderColor: colors.inactive,
    },
    item: {
        paddingLeft: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: colors.inactive,
    },
    itemText: {
        fontSize: 16,
        color: colors.primaryText,
    },
});