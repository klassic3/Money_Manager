import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState } from 'react'
import { colors } from '@/constants/theme';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type FilterProps = {
    visible: boolean;
    onClose: () => void;
    filter: (selectedCategories: string[]) => void;
};


const Filter = ({ visible, onClose, filter }: FilterProps) => {

    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [categoryOpen, setCategoryOpen] = useState(false)

    const categories = [
        "food",
        "transportation",
        "entertainment",
        "utilities",
        "health",
        "education",
        "paycheck",
        "otherIncome",
        "otherExpense",
    ]

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const toggleCategory = () => {
        setCategoryOpen(prev => !prev)
    };

    const handleCategory = (item: string) => {
        setSelectedCategory((prevCategories) => {

            if (prevCategories.includes(item)) {
                // If item exists, remove it
                return prevCategories.filter((category) => category !== item);
            } else {
                // Else, add it to the list
                return [...prevCategories, item];
            }
        });
    };;

    const handleApplyFilter =() => {
        filter(selectedCategory);
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
                    <Text style={styles.optionTitle}>Filter</Text>
                    <View style={styles.optionGroup}>
                        <TouchableOpacity onPress={toggleCategory}>
                            <Text style={styles.optionTitle}>Category</Text>
                        </TouchableOpacity>

                        {categoryOpen &&
                            <FlatList
                                data={categories}
                                style={styles.optionContainer}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => {
                                    const isSelected = selectedCategory.includes(item);
                                    return (
                                        <TouchableOpacity onPress={() => handleCategory(item)} >
                                            <View style={styles.optionItem}>
                                                <MaterialIcons name="hexagon" size={16} color={isSelected? colors.secondary:colors.inactive} />
                                                <Text style={styles.optionText}>{capitalizeFirst(item)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        }

                    </View>
                    <TouchableOpacity onPress={handleApplyFilter}>
                        <Text style={styles.optionTitle} >Apply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
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
        width: '55%',
        height: '100%',
        backgroundColor: '#fff',
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
    optionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: colors.primaryText,
    },
    optionText: {
        fontSize: 14,
        color: colors.primaryText,
    },
    optionContainer:{
        backgroundColor:'#f0f0f0',
        borderCurve:'circular',
        borderRadius: 10
    },
    optionItem: {
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 6,
        marginBottom: 8,
    },

    optionItemSelected: {
        backgroundColor: '#d0e8ff',
    },
})