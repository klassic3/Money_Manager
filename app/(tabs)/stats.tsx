import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Piechart from '@/components/piechart'
import { colors } from '@/constants/theme'
import Linegraph from '@/components/linegraph'

const stats = () => {

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 20, backgroundColor: colors.background, paddingBottom: 40 }}>
            <Text style={styles.title}>Analytics</Text>
            <Piechart />
            <Linegraph />
        </ScrollView>
    )
}

export default stats

const styles = StyleSheet.create({
    title:{
        width: '100%',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        marginBottom: 10,
        color: colors.primaryText,
    },
})