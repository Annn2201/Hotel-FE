import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    Modal,
    ScrollView,
    Animated,
    SafeAreaView,
    FlatList, TextInput, KeyboardAvoidingView, Button
} from 'react-native';
import {Room} from "../services/interfaces/room";
import {getBookingRoomApi} from "../services/room";
import {bookRoomByUserApi} from "../services/room";
import {listRoomsApi} from "../services/room";
import {User} from "../services/interfaces/user";
import {getDetailUserApi} from "../services/user";
import Icon from "react-native-vector-icons/FontAwesome";
import {addTokenToAxios} from "../services/authentication";
import {StackActions} from "react-navigation";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserDetailScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [rooms, setRooms] = useState<Room[]>([])
    const validationSchema = Yup.object().shape({
        lastName: Yup.string().required('Họ là trường bắt buộc'),
        firstName: Yup.string().required('Tên là trường bắt buộc'),
        phone: Yup.string().required('Số điện thoại là trường bắt buộc'),
        email: Yup.string().email('Email không hợp lệ').required('Email là trường bắt buộc'),
        identifyNumber: Yup.string().required('Số CCCD/Hộ chiếu là trường bắt buộc'),
    });
    const getUserByUsername = async() => {
        try {
            const { data } = await getDetailUserApi()
            setUser(data)
        } catch (err) {
            alert(err.response)
        }
    }
    useEffect(() => {
        getUserByUsername()
    }, [])

    const [showUserOptions, setShowUserOptions] = useState(false);
    const toggleUserOptionsModal = () => {
        setShowUserOptions(!showUserOptions);
    };
    const handleLogout = () => {
        navigation.navigate("LoginScreen")
        addTokenToAxios("")
    };
    return (
        <KeyboardAvoidingView style={styles.container}>
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
            <View style={styles.user}>
                <Image source={require('../assets/facebook.png')} style={styles.userAvatar} />
            </View>
            <View>
                <View style={styles.userInfor}>
                    <Text style={styles.userTitle}>Họ</Text>
                    <TextInput value={user?.lastName} onChangeText={(value) => {
                        setUser({
                            ...user,
                            lastName: value
                        })
                    }} style={styles.userDetail} />
                </View>
                <View style={styles.userInfor}>
                    <Text style={styles.userTitle}>Tên</Text>
                    <TextInput value={user?.firstName} onChangeText={(value) => {
                        setUser({
                            ...user,
                            firstName: value
                        })
                    }} style={styles.userDetail} />
                </View>
                <View style={styles.userInfor}>
                    <Text style={styles.userTitle}>Số điện thoại</Text>
                    <TextInput value={user?.phone} onChangeText={(value) => {
                        setUser({
                            ...user,
                            phone: value
                        })
                    }} style={styles.userDetail} />
                </View>
                <View style={styles.userInfor}>
                    <Text style={styles.userTitle}>Email</Text>
                    <TextInput value={user?.email} onChangeText={(value) => {
                        setUser({
                            ...user,
                            email: value
                        })
                    }} style={styles.userDetail}/>
                </View>
                <View style={styles.userInfor}>
                    <Text style={styles.userTitle}>Số CCCD/Hộ chiếu</Text>
                    <TextInput value={user?.identifyNumber} onChangeText={(value) => {
                        setUser({
                            ...user,
                            identifyNumber: value
                        })
                    }} style={styles.userDetail} />
                </View>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity>
                    <Text onPress={() => navigation.goBack()} style={styles.buttonCancel}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonConfirm}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showUserOptions} transparent animationType={"fade"}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={toggleUserOptionsModal}>
                            <Icon name={'close'} style={styles.closeButton}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("UserProfile");
                            toggleUserOptionsModal();
                        }}>
                            <Text style={styles.modalOption}>Thông tin cá nhân</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("ChangePassword");
                            toggleUserOptionsModal();
                        }}>
                            <Text style={styles.modalOption}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.modalOption}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        marginHorizontal: 15
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
        justifyContent: 'space-between',
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
        fontSize: 18,
        padding: 10,
        alignSelf: 'flex-end',
        color: 'red',
    },
})

export default UserDetailScreen;