import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/theme'
import Card from '@/components/card'
import CreateTransaction from '@/components/createTransaction'
import Transactions from '@/components/transactions'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const home = () => {
    
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background }}>
            <Card balance={1200} income={1000} expense={2000} />
            <Text style={
                {
                    textAlign: 'left',
                    fontSize: 16,
                    fontWeight: 'bold',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.inactive,
                    paddingBottom: 10,
                    marginTop: 20,
                    paddingLeft: 20,
                }
            }>Recent Transactions</Text>
            <Transactions title={"Transaction1"} date={"2025"} amount={5000} />
            <Transactions title={"Transaction2"} date={"2025"} amount={-5000} />
            <Transactions title={"Transaction3"} date={"2025"} amount={5000} />
            <Transactions title={"Transaction4"} date={"2025"} amount={-5000} />
            <CreateTransaction
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)} >
                <FontAwesome6 name="circle-plus" size={60} color={colors.secondary} />
            </TouchableOpacity>
        </ScrollView>
    )
}

export default home

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 55,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
})