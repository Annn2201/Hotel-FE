import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../services/authentication';
import {date} from "yup";

const UpdateUserDetailScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.mainText}>Đăng ký</Text>
                    <Text style={styles.label}>Họ</Text>
                    <TextInput
                        placeholder="Nhập họ"
                        onChangeText={(value) => {
                            setLastName(value)}}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Tên</Text>
                    <TextInput
                        placeholder="Nhập tên"
                        onChangeText={(value) => {
                            setFirstName(value)}}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RegisterScreen", {firstName: firstName, lastName: lastName})}>
                        <Text style={{ fontWeight: '700', color: 'white', textAlign: 'center' }}>Tiếp theo</Text>
                    </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#003399',
    },
    formContainer: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#fff',
        opacity: 1,
        padding: 40
    },
    mainText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    label: {
        marginVertical: 12,
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttons: {
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },
    button: {
        backgroundColor: '#0066ff',
        color: 'white',
        fontSize: 18,
        borderRadius: 4,
        padding: 12,
        marginTop: 10
    },
    error: {
        color: 'red',
        fontSize: 14,
    },
});

export default UpdateUserDetailScreen;