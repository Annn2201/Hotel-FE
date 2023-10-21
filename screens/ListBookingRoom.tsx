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
    FlatList
} from 'react-native';
import {Room} from "../services/interfaces/room";
import {getBookingRoomApi} from "../services/room";
import {bookRoomByUserApi} from "../services/room";
import {listRoomsApi} from "../services/room";
import {User} from "../services/interfaces/user";
import {getDetailUserApi} from "../services/user";
import Icon from "react-native-vector-icons/FontAwesome";
import {addTokenToAxios} from "../services/authentication";

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
            console.log(data)
        } catch(err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        getRoomData()
    }, [])
    const renderRoom = ({ item }: { item: Room }) => {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => {
                navigation.navigate("DetailRoomScreen", { roomCode: item.roomCode, startDate: item.startDate, endDate: item.endDate })
            }}>
                <View style={styles.room}>
                    <View style={styles.roomDetail}>
                        <Text style={styles.roomName}>{item.roomName}</Text>
                        <Text>Hạng phòng: {item.roomRank}</Text>
                        <Text>Loại phòng: {item.roomType}</Text>
                        <Text style={styles.roomPrice}>{item.pricePerNight}</Text>
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
    const handleLogout = () => {
        navigation.navigate("LoginScreen")
        addTokenToAxios("")
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('HomeScreen');
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
            <Modal visible={showUserOptions} transparent animationType={"fade"}>
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
                            // Điều hướng đến trang đổi mật khẩu
                            navigation.navigate("ChangePassword");
                            toggleUserOptionsModal(); // Đóng modal sau khi điều hướng
                        }}>
                            <Text style={styles.modalOption}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.modalOption}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

export default ListBookingRoomScreen;