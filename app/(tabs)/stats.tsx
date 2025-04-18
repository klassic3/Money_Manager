import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Piechart from '@/components/piechart'
import { colors } from '@/constants/theme'

const stats = () => {

    return (
        <View  style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background }}>
            <Text>stats</Text>
            <Piechart/>
        </View>
    )
}

export default stats

const styles = StyleSheet.create({})