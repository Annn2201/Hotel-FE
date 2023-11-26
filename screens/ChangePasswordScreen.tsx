import React, {useState} from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Modal, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import {changePasswordApi} from "../services/user";
import {deleteAccessToken, logoutApi} from "../services/authentication";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required'),
  confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePasswordScreen = ({ navigation }) => {
  const updatePasswordDetail = async (values) => {
    try {
       const { data } = await changePasswordApi({
         oldPassword: values.oldPassword,
         newPassword: values.newPassword,
         confirmNewPassword: values.confirmNewPassword
       });
      alert('Cập nhật thông tin người dùng thành công');
    } catch (err) {
      alert('Cập nhật thông tin người dùng thất bại');
    }
  };
  const [showUserOptions, setShowUserOptions] = useState(false);

  const toggleUserOptionsModal = () => {
    setShowUserOptions(!showUserOptions);
  };
  const handleLogout = async () => {
    try {
      const accessToken = await deleteAccessToken()
      if (accessToken) {
        const logout = await logoutApi()
        navigation.navigate('LoginScreen');
      } else {
        alert("Lỗi")
      }
    } catch (error) {
      alert('Error');
    }
  }
  return (
      <KeyboardAvoidingView style={styles.container}>
        <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values) => {
              updatePasswordDetail(values);
            }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <View style={styles.header}>
                  <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => {
                                      navigation.goBack();
                                    }}>
                      <Image style={styles.img} source={require('../assets/PngItem_2022960.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.headerItem}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Thông tin cá nhân</Text>
                    <TouchableOpacity onPress={toggleUserOptionsModal}>
                      <Icon name={'user'} size={40} color={'white'} style={styles.userIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.userInfor}>
                  <Text style={styles.userTitle}>Mật khẩu cũ</Text>
                  <TextInput
                      style={styles.userDetail}
                      secureTextEntry
                      onChangeText={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      value={values.oldPassword}
                  />
                  {touched.oldPassword && errors.oldPassword && <Text style={{ color: 'red' }}>{errors.oldPassword}</Text>}
                </View>

                <View style={styles.userInfor}>
                  <Text style={styles.userTitle}>Mật khẩu mới</Text>
                  <TextInput
                      style={styles.userDetail}
                      secureTextEntry
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      value={values.newPassword}
                  />
                  {touched.newPassword && errors.newPassword && <Text style={{ color: 'red' }}>{errors.newPassword}</Text>}
                </View>

                <View style={styles.userInfor}>
                  <Text style={styles.userTitle}>Xác nhận mật khẩu mới</Text>
                  <TextInput
                      style={styles.userDetail}
                      secureTextEntry
                      onChangeText={handleChange('confirmNewPassword')}
                      onBlur={handleBlur('confirmNewPassword')}
                      value={values.confirmNewPassword}
                  />
                  {touched.confirmNewPassword && errors.confirmNewPassword && (
                      <Text style={{ color: 'red' }}>{errors.confirmNewPassword}</Text>
                  )}
                </View>
                <View style={styles.buttonArea}>
                  <TouchableOpacity>
                    <Text onPress={() => navigation.goBack()} style={styles.buttonCancel}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.buttonConfirm}>Xác nhận</Text>
                  </TouchableOpacity>
                </View>
              </View>
          )}
        </Formik>

        <Modal visible={showUserOptions} transparent animationType="fade" onRequestClose={toggleUserOptionsModal}>
          <TouchableWithoutFeedback onPress={toggleUserOptionsModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={toggleUserOptionsModal}>
                  <Icon name={'close'} style={styles.closeButton}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("UserDetailScreen");
                  toggleUserOptionsModal();
                }}>
                  <Text style={styles.modalOption}>Thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("ChangePasswordScreen");
                  toggleUserOptionsModal();
                }}>
                  <Text style={styles.modalOption}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.modalOption}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    backgroundColor:'#3399ff',
    height:60,
    flexDirection:'row',
  },
  headerItem:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    height:25
  },
  buttonCancel: {
    height: 40,
    width: 80,
    borderWidth: 1,
    borderColor: '#3399ff',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    paddingTop: 10,
  },
  buttonConfirm: {
    height: 40,
    width: 120,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#3399ff',
    backgroundColor: '#3399ff',
    textAlign: 'center',
    paddingTop: 10,
    marginHorizontal: 15,
    color: 'white'
  },
  buttonArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
    width: '100%',
  },
  img:{
    height:15,
    width:15,
    resizeMode:'contain',
    marginHorizontal:10
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '15%',
    backgroundColor: 'white'
  },
  userTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  userAvatar: {
    height:90,
    width:90,
    marginTop: 25,
    borderRadius: 20
  },
  userInfor: {
    margin: 15,
    borderBottomColor: '#3399ff',
    borderBottomWidth: 2,
  },
  userDetail: {
    fontSize: 18,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#3399ff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    fontSize: 18
  },
  userIcon: {
    marginRight: 20
  },
  listItem: {
    height: 180,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center"
  },
  room: {
    flexDirection: "row-reverse",
    justifyContent: 'flex-end',
  },
  roomDetail: {
    margin: 20
  },
  roomName: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 5
  },
  roomPrice: {
    color: '#3399ff',
    fontWeight: 'bold',
    fontSize: 30
  },
  listRoom: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 15,
    marginHorizontal: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  modalContent: {
    width: 200,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  modalOption: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: 'blue',
  },

  closeButton: {
    fontSize: 22,
    padding: 10,
    alignSelf: 'flex-end',
    color: 'red',
  },
})
export default ChangePasswordScreen;