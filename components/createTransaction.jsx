import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { Toast } from 'react-native-toast-notifications';
import { createTransaction } from '../services/transactionServices';
import { colors } from '@/constants/theme';

const CreateTransaction = ({ visible, onClose, refreshTransactions }) => {

    const [transactionData, setTransactionData] = useState({
        title: '',
        description: '',
        category: '',
        amount: ''
    });

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Food', value: 'food' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Utilities', value: 'utilities' },
        { label: 'Health', value: 'health' },
        { label: 'Education', value: 'education' },
        { label: 'Paycheck', value: 'paycheck' },
        { label: 'Other Income', value: 'otherIncome' },
        { label: 'Other Expense', value: 'otherExpense' },
    ]);


    useEffect(() => {
        if (visible) {
            setTransactionData({
                title: '',
                description: '',
                category: '',
                amount: '',
            });
        }
    }, [visible]);

    const handleChange = (field, value) => {
        setTransactionData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleCreate = async () => {

        const { title, description, category, amount } = transactionData;

        if (!title || !description || category === 'Select Category' || !amount) {
            Toast('Please fill in all fields', {
                type: 'danger',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
            });
            return;
        }

        const transaction = {
            title,
            description,
            category,
            amount: category === 'otherIncome' || category === 'paycheck' ? parseFloat(amount) : -parseFloat(amount),
        };

        try {
            const res = await createTransaction(transaction);
        }
        catch (error) {
            console.error('Error creating transaction:', error);
            Toast('Error creating transaction', {
                type: 'danger',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
            });
            return;
        }
        console.log('Item created:', transactionData);
        onClose();
        refreshTransactions();
        Toast('Transaction created successfully', {
            type: 'success',
            placement: 'top',
            duration: 4000,
            animationType: 'slide-in',
        });
    };
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Add Transaction</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={transactionData.title}
                        onChangeText={(value) => handleChange('title', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={transactionData.description}
                        onChangeText={(value) => handleChange('description', value)}
                    />
                        <DropDownPicker
                            open={open}
                            value={transactionData.category}
                            items={items}
                            setOpen={setOpen}
                            setValue={(value) => handleChange('category', value())}
                            setItems={setItems}
                            placeholder="Select Category"
                            style={{
                                borderColor: colors.inactive,
                                borderWidth: 1,
                                borderRadius: 6,
                                marginBottom: 12,
                            }}
                            dropDownContainerStyle={{
                                borderColor: colors.inactive,
                            }}
                        />

                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={transactionData.amount}
                        onChangeText={(value) => handleChange('amount', value)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleCreate}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CreateTransaction

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
    },
})