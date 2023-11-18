import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../services/authentication';
import {date} from "yup";

const RegisterScreen = ({ navigation }) => {
  const firstName = navigation.getParam("firstName")
  const lastName = navigation.getParam("lastName")
  const [showPassword, setShowPassword] = useState(false);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
    identifyNumber: Yup.string().required('Số CCCD/Hộ chiếu không được bỏ trống'),
    username: Yup.string().required('Tên đăng nhập không được bỏ trống'),
    password: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Mật khẩu không được bỏ trống'),
    rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp').required('Nhập lại mật khẩu không được bỏ trống'),
  });

  const handleRegister = async (values) => {
    try {
      await registerSchema.validate(values, { abortEarly: false });
      const registerResponse = await registerApi({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        identifyNumber: values.identifyNumber,
        username: values.username,
        password: values.password,
      });

      const { data } = registerResponse;
      alert("Đã đăng kí thành công")
      navigation.navigate("LoginScreen")
    } catch (error) {
        alert("Ten dang nhap da ton tai");
    }
  };

  return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.mainText}>Đăng ký</Text>
          <Formik
              initialValues={{lastName, firstName, email: '',identifyNumber: '', username: '', password: '', rePassword: '' }}
              validationSchema={registerSchema}
              onSubmit={(values) => handleRegister(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                      value={values.email}
                      placeholder="Nhập email"
                      onChangeText={handleChange('email')}
                      style={styles.input}
                  />
                  {touched.email && errors.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                  ) : null}
                  <Text style={styles.label}>Số CCCD/Hộ chiếu</Text>
                  <TextInput
                      value={values.identifyNumber}
                      placeholder="Nhập CCCD/Hộ chiếu"
                      onChangeText={handleChange('identifyNumber')}
                      style={styles.input}
                  />
                  {touched.identifyNumber && errors.identifyNumber ? (
                      <Text style={styles.error}>{errors.identifyNumber}</Text>
                  ) : null}

                  <Text style={styles.label}>Tên đăng nhập</Text>
                  <TextInput
                      value={values.username}
                      placeholder="Nhập username"
                      onChangeText={handleChange('username')}
                      style={styles.input}
                  />
                  {touched.username && errors.username ? (
                      <Text style={styles.error}>{errors.username}</Text>
                  ) : null}

                  <Text style={styles.label}>Mật khẩu</Text>
                  <View style={[styles.input, { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }]}>
                    <TextInput
                        value={values.password}
                        placeholder='Nhập password'
                        onChangeText={handleChange('password')}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password ? (
                      <Text style={styles.error}>{errors.password}</Text>
                  ) : null}

                  <Text style={styles.label}>Nhập lại mật khẩu</Text>
                  <View style={[styles.input, { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }]}>
                    <TextInput
                        value={values.rePassword}
                        placeholder='Nhập password'
                        onChangeText={handleChange('rePassword')}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} />
                    </TouchableOpacity>
                  </View>
                  {touched.rePassword && errors.rePassword ? (
                      <Text style={styles.error}>{errors.rePassword}</Text>
                  ) : null}

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={{ fontWeight: '700', color: 'white', textAlign: 'center' }}>Đăng ký</Text>
                  </TouchableOpacity>
                </>
            )}
          </Formik>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={{ fontWeight: '700', color: 'white', textAlign: 'center' }}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
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

export default RegisterScreen;