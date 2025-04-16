import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Toast } from 'react-native-toast-notifications';
import { createTransaction } from '../services/transactionServices';

const CreateTransaction = ({ visible, onClose }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionData, setTransactionData] = useState({
        title: '',
        description: '',
        category: '',
        amount: ''
    });
    const handleCreate = async () => {

        if (!title || !description || category === 'Select Category' || !amount) {
            Toast('Please fill in all fields', {
                type: 'danger',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
            });
            return;
        }


        if (category !== 'otherIncome' || category !== 'paycheck') {
            setTransactionData({
                title,
                description,
                category,
                amount: -parseFloat(amount),
            });
        }
        else {
            setTransactionData({
                title,
                description,
                category,
                amount: parseFloat(amount),
            });
        }
        
        try{
            const res = await createTransaction(transactionData);
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
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Category" value="" enabled={false} />
                        <Picker.Item label="Food" value="food" />
                        <Picker.Item label="Transportation" value="transportation" />
                        <Picker.Item label="Entertainment" value="entertainment" />
                        <Picker.Item label="Utilities" value="utilities" />
                        <Picker.Item label="Health" value="health" />
                        <Picker.Item label="Education" value="education" />
                        <Picker.Item label="Paycheck" value="paycheck" />
                        <Picker.Item label="Other Income" value="otherIncome" />
                        <Picker.Item label="Other Expense" value="otherExpense" />
                    </Picker>

                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={amount}
                        onChangeText={setAmount}
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
        backgroundColor: 'rgba(0,0,0,0.5)',
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
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007bff',
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