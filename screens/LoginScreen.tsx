import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as yup from 'yup'; 
import { useFormik } from 'formik';
import { loginApi } from '../services/authentication';

const AuthScreen = ({navigation}) => {
    const [ username, setUsername ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const validationSchema = yup.object({
      username: yup.string().required('Tên đăng nhập không được bỏ trống').trim(),
    //   password: yup.string().required('Mật khẩu không được bỏ trống').min(6).trim(),
    });

    const login = async () => {
        try {
            const loginResponse = await loginApi({
                username,
                password
            })
            const {data} = loginResponse
            alert("Đăng nhập thành công!")
            navigation.navigate("HomeScreen")
        } catch(err) {
            const {data} = err.response
            alert(data.message)
        }
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Đăng nhập</Text>
  
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tên đăng nhập</Text>
            <TextInput
              style={styles.input}
              value={username}
              placeholder="Nhâp username"
              onChangeText={(value) => {
                setUsername(value)}}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder='Nhập password'
              onChangeText={(value) => {
                setPassword(value)
              }}
            />
          </View>
  
          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text>Đăng nhập</Text>
          </TouchableOpacity>
          {/* <Button
            title="Đăng nhập"
            onPress={formik.handleSubmit}
            style={styles.loginButton}
          /> */}

  
          <View style={styles.separator}>
            <Text style={styles.separatorText}>hoặc đăng nhập với</Text>
          </View>
  
  
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate("RegisterScreen")}>
            <Text>
              Chưa có tài khoản bấm{' '}v 
              <Text style={styles.signupLinkText}>đăng ký</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    formContainer: {
      width: '100%',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      fontSize: 16,
    },
    error: {
      color: 'red',
      fontSize: 14,
    },
    forgotPasswordLink: {
      alignItems: 'flex-end',
      marginBottom: 16,
    },
    forgotPasswordText: {
      color: 'blue',
    },
    loginButton: {
      backgroundColor: 'blue',
      color: 'white',
      fontSize: 18,
      borderRadius: 4,
      padding: 12,
      textAlign: 'center',
    },
    separator: {
      alignItems: 'center',
      marginBottom: 16,
    },
    separatorText: {
      fontSize: 14,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    socialIcon: {
      width: 20,
      height: 20,
      marginRight: 8,
    },
    socialButtonText: {
      fontSize: 14,
    },
    signupLink: {
      alignItems: 'center',
      marginTop: 16,
    },
    signupLinkText: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });

export default AuthScreen;