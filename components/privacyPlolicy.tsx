import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme';

type policyProps = {
    visible: boolean;
    onClose: () => void;
};


const privacyPlolicy = ({ visible, onClose }: policyProps) => {

    const policy = [
        "Effective Date: 1st July 2025\nApp Name: Money Manager\nDeveloper: Chris Maharjan\nContact: chrismaharjan.0812@gmail.com",
    ];
    const information = [
        "We collect the following user-provided information:",
        "- Sign-in credentials (email and password) for authentication",
        "- Personal finance data entered by the user, including income and expenses",
        "This information is used solely for the purpose of providing core app functionality.",
    ];
    const use = [
        "Your information is used to:",
        "- Authenticate users and allow secure login",
        "- Store and manage your income and expense data",
        "- Improve and maintain app performance and reliability",
        "We do not use your data for advertising or analytics purposes.",
    ];
    const data = [
        "- All personal and financial data is stored securely on our backend server using MongoDB and managed through a Node.js + Express.js API.",
        "- Your data is not shared with third parties.",
        "- We do not store sensitive data like passwords in plain text.",
    ];
    const local = [
        "- The app may store minimal data (e.g. login token) locally on your device using secure storage or AsyncStorage to maintain login state.",
        "- No sensitive financial data is stored locally.",
    ];
    const thirdParty = [
        "This app does not use any third-party SDKs, analytics tools, or ad networks.",
    ];
    const children = [
        "Money Manager is not intended for children under the age of 13. We do not knowingly collect or store data from anyone under this age.",
    ];
    const rights = [
        "You may request to delete your account or data at any time by contacting the developer. We will process such requests within a reasonable timeframe.",
    ];
    const changes = [
        "We may update this privacy policy from time to time. Users will be notified of significant changes via the app or email (if provided).",
    ];
    const contact = [
        "If you have any questions or concerns about this Privacy Policy, please contact us at:\n📧 chrismaharjan.0812@gmail.com",
    ];

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                <ScrollView >
                    <Text style={styles.title}>Privacy Policy</Text>
                    {policy.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>1. Information We Collect</Text>
                    {information.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>2. How We Use Your Information</Text>
                    {use.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>3. Data Storage</Text>
                    {data.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>4. Local Storage</Text>
                    {local.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>5. Third-Party Services</Text>
                    {thirdParty.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>6. Children's Privacy</Text>
                    {children.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>7. Your Rights</Text>
                    {rights.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>8. Changes to This Policy</Text>
                    {changes.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                    <Text style={styles.title}>9. Contact Us</Text>
                    {contact.map((text, index) => (
                        <Text key={index} style={styles.text}>
                            {text}
                        </Text>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default privacyPlolicy

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(58, 62, 78, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: colors.primaryText,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
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