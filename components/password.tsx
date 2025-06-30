import { Modal, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/theme';

import { useToast } from 'react-native-toast-notifications';
import { changePassword } from '@/services/userServices';

type passwordProps = {
    visible: boolean;
    onClose: () => void;
};


const password = ({ visible, onClose }: passwordProps) => {

    const toast = useToast();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handlePasswordChange = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.show("Please fill all fields!", {
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.show("Passwords do not match!", {
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            return;
        }
        try {
            const response = changePassword({
                currentPassword: currentPassword,
                newPassword: newPassword
            })
            toast.show("Passwords changed successfully!", {
                type: 'success',
                placement: 'top',
                duration: 2000,
                animationType: 'slide-in',
            })
            onClose();
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
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Current Password"
                        secureTextEntry={true}
                        onChangeText={setCurrentPassword} />
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry={true}
                        onChangeText={setNewPassword} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        secureTextEntry={true}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        handlePasswordChange();
                    }}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default password

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
    input: {
        borderColor: colors.inactive,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        marginBottom: 12,
    },
    button: {
        backgroundColor: colors.secondary,
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    closeButton: {
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#007bff',
    }
})