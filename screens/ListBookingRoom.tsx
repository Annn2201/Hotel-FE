import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    Modal,
    FlatList, TouchableWithoutFeedback
} from 'react-native';
import {Room} from "../services/interfaces/room";
import {deleteBookingRoomByRoomUserId, deleteBookingRoomWhenCheckout, getBookingRoomApi} from "../services/room";
import {User} from "../services/interfaces/user";
import {getDetailUserApi} from "../services/user";
import Icon from "react-native-vector-icons/FontAwesome";
import {deleteAccessToken, logoutApi} from "../services/authentication";

const ListBookingRoomScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [rooms, setRooms] = useState<Room[]>([])
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
    const getRoomData = async () => {
        setIsLoading(true)
        try {
            const listRoomsResponse = await getBookingRoomApi()
            const { data } = listRoomsResponse
            setRooms(data)
        } catch(err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setIsLoading(false)
    }

    const deleteRoomByRoomUserId = async (roomUserId: string) => {
        try {
            const deleteRoom = await deleteBookingRoomByRoomUserId(roomUserId)
            alert("Đã hủy phòng thành công")
        } catch (err) {
            const error = err.response
            alert(error)
        }
    }

    useEffect(() => {
        getRoomData()
    }, [])
    const renderRoom = ({ item }: { item: Room }) => {
        if (item.isCheckOut) {
            setTimeout(() => {
                deleteBookingRoomWhenCheckout();
            }, 2000);
        }
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => {
                navigation.navigate("DetailRoomScreen", { roomCode: item.roomCode, startDate: item.startDate, endDate: item.endDate })
            }}>
                <View style={styles.room}>
                    <View style={styles.roomDetail}>
                        <Text style={styles.roomName}>{item.roomName}</Text>
                        <Text style={styles.roomPrice}>Ngày đến: {item.startDate}</Text>
                        <Text style={styles.roomPrice}>Ngày đi: {item.endDate}</Text>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            {item.isCheckOut ? (
                                <TouchableOpacity style={styles.buttonCheckout}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }}>Check-out</Text>
                                </TouchableOpacity>
                            ) : item.isCheckIn ? (
                                <TouchableOpacity style={styles.buttonCheckin}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'green' }}>Check-in</Text>
                                </TouchableOpacity>
                            ) : <View style={styles.pendingView}>
                                <TouchableOpacity style={styles.buttonPending}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Pending</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonPending}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }} onPress={() => deleteRoomByRoomUserId(item.roomUserId)}>Xóa</Text>
                                </TouchableOpacity>
                                </View>}
                        </View>
                    </View>
                    <Image style={styles.image} source={{uri: item.images[0]}}></Image>
                </View>
            </TouchableOpacity>

        )
    }
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
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Image style={styles.img} source={require('../assets/PngItem_2022960.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Phòng đã đặt</Text>
                    <TouchableOpacity onPress={toggleUserOptionsModal}>
                        <Icon name={'user'} size={40} color={'white'} style={styles.userIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.user}>
                <Image source={require('../assets/facebook.png')} style={styles.userAvatar} />
                <View>
                    <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.userBooking}>Số phòng đã đặt: {rooms.length}</Text>
                </View>
            </View>
            <FlatList
                onRefresh={getRoomData}
                refreshing={isLoading}
                style={styles.listRoom}
                data={rooms}
                renderItem={(item) => renderRoom(item)}
            />
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
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column'
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
        height:30
    },
    img:{
        height:15,
        width:15,
        resizeMode:'contain',
        marginHorizontal:10
    },
    pendingView: {
      flex: 1,
      flexDirection: 'row',
    },
    buttonCheckin: {
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 5,
        width: 75,
        marginRight: 10,
        height: 40,
        justifyContent: "center"
    },
    buttonCheckout: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
        width: 75,
        marginRight: 10,
        height: 40,
        justifyContent: "center"
    },
    buttonPending: {
        borderWidth: 2,
        borderRadius: 5,
        width: 75,
        marginRight: 10,
        height: 40,
        justifyContent: "center"
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        height: '25%',
        backgroundColor: '#3399ff'
    },
    userName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 110,
        marginLeft: 10
    },
    userAvatar: {
        height:90,
        width:90,
        marginLeft: 20,
        marginTop: 100
    },
    userBooking: {
        marginLeft: 10,
        fontSize: 20,
        color: 'white'
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
        fontSize: 14
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

export default ListBookingRoomScreen;