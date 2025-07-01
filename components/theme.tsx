import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme';

interface ThemeProps {
    visible: boolean;
    onClose: () => void;
}

const theme = ({ visible, onClose }: ThemeProps) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                        <Text style={styles.title}>Theme unavailable at the moment, stay tuned!!</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default theme

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(58, 62, 78, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
    },
    closeButton: {
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#007bff',
    }
})