import { StyleSheet, Text, Image, ScrollView, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { getUser } from '@/services/userServices'

const profile = () => {

    const router = useRouter()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

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
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: colors.background }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.title}>Profile</Text>
                <Image
                    resizeMode="contain"
                    source={require('../../assets/images/Profile.png')}
                    style={styles.logo}
                />
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.email}>{userData.email}</Text>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Privacy Policy</Text>
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
        </ScrollView>
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
        marginBottom: 24,
    },
    item: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: colors.inactive,
    },
    itemText: {
        fontSize: 16,
        color: colors.primaryText,
    },
});