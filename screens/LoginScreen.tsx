import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import * as yup from 'yup'; 
import { useFormik } from 'formik';
import { loginApi } from '../services/authentication';
import Icon from 'react-native-vector-icons/FontAwesome';

const AuthScreen = ({navigation}) => {
    const [ username, setUsername ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ showpassword, setShowPassword ] = useState(false)
    const img = { uri : "https://i.pinimg.com/736x/3a/ea/10/3aea107afa94a7cb6c2afd313c3bd173--a-hotel-hotel-offers.jpg"};

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
      <ImageBackground source={img} resizeMode="cover" style = {{flex : 1, width : '100%'}} >
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
          <Text style={styles.label} >Mật khẩu</Text>
          <View style={[styles.inputContainer, {flexDirection: 'row'}, styles.input]}>
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
  
          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginText}>Đăng nhập</Text>
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
              Chưa có tài khoản bấm{' '} 
              <Text style={styles.signupLinkText}>đăng ký</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
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
      borderRadius: 10,
      width: '100%',
      backgroundColor: '#fff',
      opacity: 0.85,
      padding: 50
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
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    
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
    loginText: {
      color: 'white',
      textAlign: 'center'
    }
  });

export default AuthScreen;