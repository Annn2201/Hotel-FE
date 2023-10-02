import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { loginApi } from '../services/authentication';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Tên đăng nhập không được bỏ trống'),
  password: Yup.string().required('Mật khẩu không được bỏ trống'),
});

const AuthScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const loginResponse = await loginApi({
          username: values.username,
          password: values.password,
        });
        const { data } = loginResponse;
        alert('Đăng nhập thành công!');
        navigation.navigate('HomeScreen');
      } catch (err) {
        const { data } = err.response;
        alert(data.message);
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Đăng nhập</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            value={formik.values.username}
            placeholder="Nhập username"
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <Text style={styles.error}>{formik.errors.username}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            value={formik.values.password}
            placeholder="Nhập password"
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} />
          </TouchableOpacity>
        </View>
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.error}>{formik.errors.password}</Text>
        ) : null}

        <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={formik.handleSubmit}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <Text style={styles.separatorText}>hoặc đăng nhập với</Text>
        </View>

        <TouchableOpacity style={styles.loginButtongg}>
          <Image source={require('../assets/google.png')} style={{ width: 20, height: 20, margin: 3 }} />
          <Text style={styles.loginTextgg}>Đăng nhập bằng Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate('RegisterScreen')}>
          <Text>
            Chưa có tài khoản{' '}
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
    backgroundColor: '#003399',
  },
  formContainer: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#fff',
    opacity: 1,
    padding: 50,
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
    borderRadius: 10,
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
    backgroundColor: '#0066ff',
    color: 'white',
    fontSize: 18,
    padding: 12,
    borderRadius: 10,
  },
  loginButtongg: {
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  loginTextgg: {
    color: 'black',
    textAlign: 'center',
    padding: 16,
  },
});

export default AuthScreen;
