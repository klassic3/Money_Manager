import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Platform, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


import { useToast } from 'react-native-toast-notifications';
import { createTransaction } from '../services/transactionServices';
import { colors } from '@/constants/theme';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTransactionContext } from '@/hooks/transactionContext';

type CreateTransactionProps = {
    visible: boolean;
    onClose: () => void;
};

const CreateTransaction = ({ visible, onClose }: CreateTransactionProps) => {

    const { triggerRefresh } = useTransactionContext()
    const Toast = useToast();

    const [transactionData, setTransactionData] = useState({
        title: '',
        description: '',
        category: '',
        amount: '',
        date: '',
    });

    const [categoryValue, setCategoryValue] = useState('');
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {
            label: 'Food',
            value: 'food',
            icon: () => <MaterialCommunityIcons name="noodles" size={30} color={colors.secondary} />
        },
        {
            label: 'Transportation',
            value: 'transportation',
            icon: () => <MaterialCommunityIcons name="car" size={30} color={colors.secondary} />
        },
        {
            label: 'Entertainment',
            value: 'entertainment',
            icon: () => <MaterialCommunityIcons name="gamepad-variant" size={30} color={colors.secondary} />
        },
        {
            label: 'Utilities',
            value: 'utilities',
            icon: () => <MaterialCommunityIcons name="lightbulb-on-outline" size={30} color={colors.secondary} />
        },
        {
            label: 'Health',
            value: 'health',
            icon: () => <MaterialCommunityIcons name="heart-pulse" size={30} color={colors.secondary} />
        },
        {
            label: 'Education',
            value: 'education',
            icon: () => <MaterialIcons name="my-library-books" size={30} color={colors.secondary} />
        },
        {
            label: 'Paycheck',
            value: 'paycheck',
            icon: () => <MaterialCommunityIcons name="wallet-plus" size={30} color={colors.secondary} />
        },
        {
            label: 'Other Income',
            value: 'otherIncome',
            icon: () => <MaterialCommunityIcons name="cash" size={30} color={colors.secondary} />
        },
        {
            label: 'Other Expense',
            value: 'otherExpense',
            icon: () => <MaterialCommunityIcons name="cash-minus" size={30} color={colors.secondary} />
        },
    ]);


    useEffect(() => {
        if (visible) {
            setTransactionData({
                title: '',
                description: '',
                category: 'Select Category',
                amount: '',
                date: new Date().toISOString(),
            });
        }
    }, [visible]);

    useEffect(() => {
        handleChange('category', categoryValue);
    }, [categoryValue]);


    const handleChange = (field: string, value: any) => {
        setTransactionData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleCreate = async () => {

        const { title, description, category, amount, date } = transactionData;

        if (!title || !description || category === 'Select Category' || !amount) {
            Toast.show('Please fill in all fields', {
                type: 'danger',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
            });
            return;
        }
        console.log('Transaction Data:', transactionData);
        const transaction = {
            title,
            description,
            category,
            amount: category === 'otherIncome' || category === 'paycheck' ? parseFloat(amount) : -parseFloat(amount),
            date: new Date(date) || '',
        };

        console.log('Transaction:', transaction);
        try {
            const res = await createTransaction(transaction);
        }
        catch (error) {
            console.error('Error creating transaction:', error);
            Toast.show('Error creating transaction', {
                type: 'danger',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
            });
            return;
        }
        console.log('Item created:', transactionData);
        onClose();
        triggerRefresh();
        Toast.show('Transaction created successfully', {
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
                        setValue={setCategoryValue}
                        setItems={setItems}
                        placeholder="Select Category"
                        placeholderStyle={{
                            color: colors.inactive,
                        }}
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
                        keyboardType="decimal-pad"
                        inputMode="decimal"
                        onChangeText={(value) => {
                            const sanitized = value.replace(/[^0-9.]/g, '');
                            handleChange('amount', sanitized);
                        }}
                    />

                    <TouchableOpacity onPress={() => setShow(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select Date"
                            value={new Date(transactionData.date).toLocaleDateString()}
                            editable={false}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            value={transactionData.date ? new Date(transactionData.date) : new Date()}
                            mode="date"
                            display="default" // 'calendar' | 'spinner' | 'default'
                            onTouchCancel={() => setShow(false)}
                            maximumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                setShow(Platform.OS === 'ios');
                                if (selectedDate) {
                                    handleChange('date', selectedDate.toISOString());
                                }
                            }}

                        />
                    )}

                    <TouchableOpacity style={styles.button} onPress={handleCreate}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
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