import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

function ForgotPasswordScreen({ navigation }) {
    const validateEmail = (valueToValidate: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(valueToValidate);
    };
    const [email, setEmail] = useState("");
    const handleResetPassword = () => {
        // Thực hiện xử lý đặt lại mật khẩu ở đây, ví dụ gửi yêu cầu đặt lại mật khẩu đến email
        if (email === "") {
            return alert("Không bỏ trống email");
        }
        if (!validateEmail(email)) {
            return alert("Email không hợp lệ");
        }
        console.log("Gửi yêu cầu đặt lại mật khẩu cho email:", email);
    };

    return (
        <View style={styles.container}>
            <View style={styles.formcontainer}>
                <Text style={styles.title}>Quên mật khẩu?</Text>
                <Text style={styles.subtitle}>
                    Nhập email của bạn để đặt lại mật khẩu.
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backLink}>Quay lại đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#003399",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    formcontainer: {
        borderRadius: 10,
        width: "100%",
        backgroundColor: "#fff",
        opacity: 1,
        padding: 40,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#0066ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    backLink: {
        marginTop: 20,
        color: "blue",
        textDecorationLine: "underline",
    },
});

export default ForgotPasswordScreen;
