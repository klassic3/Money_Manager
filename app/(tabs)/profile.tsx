import { StyleSheet, Text, Image, ScrollView, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const profile = () => {


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: colors.background }}>

            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>Profile</Text>
                <Image
                    resizeMode='contain'
                    source={require('../../assets/images/Profile.png')}
                    style={styles.logo}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#000' }}>Name</Text>
                <Text style={{ fontSize: 16, color: '#666' }}>John Doe</Text>
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
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default profile

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        borderRadius: 50,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    item: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },

})

