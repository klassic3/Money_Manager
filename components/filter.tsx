import { FlatList, Platform, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState } from 'react'
import { colors } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type FilterProps = {
    visible: boolean;
    onClose: () => void;
    filter: (selectedCategories: string[], startDate: string, endDate: string) => void;
};


const Filter = ({ visible, onClose, filter }: FilterProps) => {

    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string[]>([]);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [subCategoryOpen, setSubCategoryOpen] = useState(false);
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);

    const [startDate, setStartDate] = useState<string>(new Date('1900-01-01').toISOString());
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());


    const incomeCategories = ["paycheck", "otherIncome"];
    const expenseCategories = ["food", "transportation", "entertainment", "utilities", "health", "education", "otherExpense"];

    const categorySections = [
        {
            title: "Income",
            data: ["paycheck", "otherIncome"]
        },
        {
            title: "Expense",
            data: ["food", "transportation", "entertainment", "utilities", "health", "education", "otherExpense"]
        }
    ];


    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const clearFilters = async () => {
        setSelectedCategory([]),
            setSelectedType([]),
            setEndDate(new Date().toISOString()),
            setStartDate(new Date('1900-01-01').toISOString())
    }

    const handleCategory = (item: string) => {

        setSelectedCategory((prevCategories) => {
            let updatedCategories;

            if (prevCategories.includes(item)) {
                // Remove item
                updatedCategories = prevCategories.filter((category) => category !== item);
            } else {
                // Add item
                updatedCategories = [...prevCategories, item];
            }
            setSelectedType((prevType) => {
                const newType = [...prevType];

                const hasAllIncome = incomeCategories.every((cat) => updatedCategories.includes(cat));
                const hasAllExpense = expenseCategories.every((cat) => updatedCategories.includes(cat));

                // Remove "income" if not all income categories are selected
                if (!hasAllIncome && newType.includes("Income")) {
                    newType.splice(newType.indexOf("Income"), 1);
                }

                // Remove "expense" if not all expense categories are selected
                if (!hasAllExpense && newType.includes("Expense")) {
                    newType.splice(newType.indexOf("Expense"), 1);
                }

                return newType;
            });

            return updatedCategories;
        });
    };;

    const handleType = (item: string) => {
        setSelectedType((prevType) => {
            let updatedType;
            if (prevType.includes(item)) {
                updatedType = prevType.filter((type) => type !== item);
            } else {
                updatedType = [...prevType, item];
            }

            if (updatedType.includes("Income") && updatedType.includes("Expense")) {
                setSelectedCategory([...incomeCategories, ...expenseCategories]);
            } else if (updatedType.includes("Income")) {
                setSelectedCategory(incomeCategories);
            } else if (updatedType.includes("Expense")) {
                setSelectedCategory(expenseCategories);
            } else {
                setSelectedCategory([]); // No types selected, clear categories
            }

            return updatedType;
        });

    };;

    const handleApplyFilter = () => {
        filter(selectedCategory, startDate, endDate);
        onClose();
    }

    return (
        <Modal
            isVisible={visible}
            animationIn='slideInRight'
            animationOut='slideOutRight'
            onBackdropPress={onClose}
        >
            <View style={styles.modelContainer}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.optionTitle}>Filter</Text>
                        <TouchableOpacity onPress={clearFilters}>
                            <Text style={styles.optionTitle} >Clear</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optionGroup}>
                        <TouchableOpacity style={styles.option} onPress={() => setCategoryOpen(prev => !prev)}>
                            <Text style={styles.optionTitle}>Category</Text>
                        </TouchableOpacity>

                        {categoryOpen &&
                            <SectionList
                                sections={categorySections}
                                style={styles.optionContainer}
                                keyExtractor={(item) => item}
                                renderSectionHeader={({ section: { title } }) => {
                                    const isSelected = selectedType.includes(title);
                                    return (

                                        <View style={[styles.optionItem, { paddingHorizontal: 5 }]}>
                                            <TouchableOpacity onPress={() => handleType(title)} >
                                                <MaterialIcons name="hexagon" size={16} color={isSelected ? colors.secondary : colors.inactive} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setSubCategoryOpen(prev => !prev)}>
                                                <Text>{title}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                                renderItem={({ item }) => {
                                    const isSelected = selectedCategory.includes(item);
                                    return subCategoryOpen ? (

                                        <TouchableOpacity onPress={() => handleCategory(item)} >
                                            <View style={styles.optionItem}>
                                                <MaterialIcons name="hexagon" size={16} color={isSelected ? colors.secondary : colors.inactive} />
                                                <Text style={styles.optionText}>{capitalizeFirst(item)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : null;
                                }}
                            />
                        }
                        <TouchableOpacity style={styles.option} onPress={() => setStartDateOpen(prev => !prev)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.optionTitle}>Start Date</Text>
                                <Text>{new Date(startDate).toLocaleDateString()}</Text>
                            </View>
                        </TouchableOpacity>
                        {startDateOpen && (
                            <DateTimePicker
                                value={startDate ? new Date(startDate) : new Date()}
                                mode="date"
                                display="default" // 'calendar' | 'spinner' | 'default'
                                onTouchCancel={() => setStartDateOpen(false)}
                                maximumDate={new Date()}
                                onChange={(event, selectedDate) => {
                                    setStartDateOpen(Platform.OS === 'ios');
                                    if (selectedDate) {
                                        setStartDate(selectedDate.toISOString());
                                    }
                                }}

                            />
                        )}
                        <TouchableOpacity style={styles.option} onPress={() => setEndDateOpen(prev => !prev)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.optionTitle}>End Date</Text>
                                <Text>{new Date(endDate).toLocaleDateString()}</Text>
                            </View>
                        </TouchableOpacity>
                        {endDateOpen && (
                            <DateTimePicker
                                value={endDate ? new Date(endDate) : new Date()}
                                mode="date"
                                display="default" // 'calendar' | 'spinner' | 'default'
                                onTouchCancel={() => setEndDateOpen(false)}
                                maximumDate={new Date()}
                                onChange={(event, selectedDate) => {
                                    setEndDateOpen(Platform.OS === 'ios');
                                    if (selectedDate) {
                                        setEndDate(selectedDate.toISOString());
                                    }
                                }}

                            />
                        )}
                    </View>
                    <TouchableOpacity style={[styles.apply, { backgroundColor: colors.secondary }]} onPress={handleApplyFilter}>
                        <Text style={[styles.optionTitle, { color: '#fff' }]} >Apply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.apply, { borderColor: colors.secondary, borderWidth: 1 }]} onPress={onClose}>
                        <Text style={styles.optionTitle} >Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default Filter

const styles = StyleSheet.create({
    modelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 40,
    },
    container: {
        width: '60%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        borderCurve: 'circular',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    optionGroup: {
        marginVertical: 10,
    },
    option: {
        marginVertical: 7.5,
        padding: 7.5,
        backgroundColor: '#ffffff',
        borderCurve: 'circular',
        borderRadius: 10,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primaryText,
    },
    optionText: {
        fontSize: 14,
        color: colors.primaryText,
    },
    optionContainer: {
        backgroundColor: '#ffffff',
        borderCurve: 'circular',
        borderRadius: 10
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 6,
        marginBottom: 8,
    },
    optionItemSelected: {
        backgroundColor: '#d0e8ff',
    },
    apply: {
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
    }
})