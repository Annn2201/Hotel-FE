import { useState } from "react"
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { RegisterData } from "../services/interfaces/registerData"
import { registerApi } from '../services/authentication'
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react"

const RegisterScreen = ({ navigation }) => {

    const img = { uri: "https://i.pinimg.com/736x/3a/ea/10/3aea107afa94a7cb6c2afd313c3bd173--a-hotel-hotel-offers.jpg" };
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showpassword, setShowPassword] = useState(false)
    const [rePassword, setRePassword] = useState<string>("")

    const validateEmail = (valueToValidate: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(valueToValidate);
    }
    const register = async () => {

        if (email === "") {
            return alert("Không bỏ trống email");
        }
        if (username === "") {
            return alert("Không bỏ trống username");
        }
        if (password === "") {
            return alert("Không bỏ trống password");
        }
        if (password.length < 8) {
            return alert("Mật khẩu phải trên 8 kí tự")
        }
        // Validate email
        if (!validateEmail(email)) {
            return alert("Email không hợp lệ");
        }
        try {
            const registerResponse = await registerApi({
                email,
                username,
                password,
            })
            const { data } = registerResponse
            console.log('Kết quả từ server:', registerResponse.data);
            navigation.navigate('LoginScreen')
        } catch (err) {
            alert(err);
        }

        if (password !== rePassword) {
            return alert("Mật khẩu không khớp");
        }
    };
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.formContainer}>
                {/* <ImageBackground source={img} resizeMode="cover" style = {{flex : 1, width : '100%'}} > */}
                <Text style={styles.mainText}>Đăng ký</Text>
                <KeyboardAvoidingView style={styles.content} behavior="position">
                    <Text style={styles.label}>Email</Text>
                    <TextInput value={email} placeholder="Nhập email" onChangeText={(value) => {
                        setEmail(value)
                    }} style={styles.input} />
                    <Text style={styles.label}>Tên đăng nhập</Text>
                    <TextInput value={username} placeholder="Nhập username" onChangeText={(value) => {
                        setUsername(value)
                    }} style={styles.input} />
                    <Text style={styles.label}>Mật khẩu</Text>
                    <View style={[styles.input, { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }]}>
                        <TextInput
                            value={password}
                            placeholder='Nhập password'
                            onChangeText={(value) => {
                                setPassword(value)
                            }}
                            secureTextEntry={!showpassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showpassword)}>
                            <Icon name={password ? 'eye-slash' : 'eye'} size={20} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Nhập lại mật khẩu</Text>
                    <View style={[styles.input, { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }]}>
                        <TextInput
                            value={rePassword}
                            placeholder='Nhập password'
                            onChangeText={(value) => {
                                setRePassword(value)
                            }}
                            secureTextEntry={!showpassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showpassword)}>
                            <Icon name={rePassword ? 'eye-slash' : 'eye'} size={20} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={register}>
                        <Text style={{ fontWeight: '700', color: 'white', textAlign: 'center' }}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate("LoginScreen")
                    }}>
                        <Text style={{ fontWeight: '700', color: 'white', textAlign: 'center' }}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </ImageBackground> */}
        </KeyboardAvoidingView>)
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
        padding:40
    },
    mainText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,

    },
    content: {
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
        marginTop: 20,
    },
    button: {
        backgroundColor: '#0066ff',
        color: 'white',
        fontSize: 18,
        borderRadius: 4,
        padding: 12,
    }
})
export default RegisterScreen