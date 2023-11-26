
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    FlatList,
    StatusBar,
    Button,
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native';
import 'moment/locale/vi';
import Swiper from 'react-native-swiper';
import {Room} from "../services/interfaces/room";
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {listRoomsApi} from "../services/room";
import {deleteAccessToken, getAccessToken, logoutApi, removeTokenFromAxios} from "../services/authentication";


const HomeScreen = ({ navigation }) => {

    const [rooms, setRooms] = useState<Room[]>([])

    const images = [
        require('../assets/popup_room-2-653x400.png'),
        require('../assets/thang-hoi-vien-pearl-club_1655714114.jpg'),
        require('../assets/nha-trang-1_1655872422.jpg'),
        require('../assets/gia-phong-the-mira-3-653x409.jpg'),
    ];
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [nights, setNights] = useState<number>(0);

    const [now, setNow] = useState(new Date())
    const showModeForStartDate = (currentMode) => {
        DateTimePickerAndroid.open({
            value: startDate,
            onChange: (event, selectedDate) => {
                if (selectedDate >= now) {
                    setStartDate(selectedDate);
                } else {
                    alert('Không thể chọn ngày ở quá khứ');
                }
            },
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showModeForEndDate = (currentMode) => {
        DateTimePickerAndroid.open({
            value: endDate,
            onChange: (event, selectedDate) => {
                if (selectedDate >= startDate) {
                    setEndDate(selectedDate);
                    setNights(selectedDate?.getDate() - startDate.getDate())
                } else {
                    alert('Lỗi khi chọn ngày về');
                }
            },
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showStartDatepicker = () => {
        showModeForStartDate('date');
    };
    const showEndDatepicker = () => {
        showModeForEndDate('date');
    };

    const getByPopulation = async () => {
        try {
            const listRoomsResponse = await listRoomsApi(null, null, 'population')
            const { data } = listRoomsResponse
            setRooms(data)
        } catch(err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    };
    useEffect(() => {
        getByPopulation()
    }, [])
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

    const renderRoom = ({ item }: { item: Room }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetailRoomScreen", { roomCode: item.roomCode, startDate: startDate.toDateString(), endDate: endDate.toDateString()  })
            }}>
                <View>

                    <Image style={styles.image} source={{uri: item.images[0]}}></Image>
                    <Text style={styles.textInside}>Tên phòng: {item.roomName}</Text>
                    <Text style={styles.textInside}>Giá phòng: {item.pricePerNight}$</Text>
                </View>
            </TouchableOpacity>
        )}

    return (
        <View style={styles.container}>
            <StatusBar barStyle= 'default'/>
            <View style={styles.header}>
                <Image source={require('../assets/1000_F_225066596_oxfYvjQat3pPSFvrjplG8AUC3ZTmJxHy.jpg')} style={styles.logo} />
                <TouchableOpacity style={styles.headerItem} >
                    <Icon name={'home'} size={40} color={'white'} onPress={() => navigation.navigate("ListBookingRoomScreen")}></Icon>
                    <Icon name={'user'} size={40} color={'white'} onPress={toggleUserOptionsModal}></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.dateHeader}>
                    <Text style={{textAlign: 'center', fontSize: 20, margin:10, fontWeight: 'bold'}}>Chọn ngày đến và đi</Text>
                    <View style={styles.dateHeaderLeft}>
                        <Icon name="calendar" size={20} />
                        <TouchableOpacity  onPress={() => {
                            showStartDatepicker()
                        }}>
                            {startDate ? (
                                <Text style={styles.date}>{startDate.toDateString()}</Text>
                            ) : (
                                <Text style={{ marginHorizontal: 10 }}>Ngày nhận phòng</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {showEndDatepicker()}} style={{ flexDirection: 'row', }}>
                            <Icon name="arrow-right" size={20} />
                            {endDate ? (
                                <Text style={styles.date}>{endDate.toDateString()}</Text>
                            ) : (
                                <Text style={{marginLeft: 10 }}>Ngày nhận phòng</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dateRightItem}>
                        <Icon name={'star'} size={20} style={{marginRight: 10}}/>
                        <Text style={{fontWeight: 'bold', justifyContent: 'center', fontSize: 15}}>Số đêm nghỉ: </Text>
                        <Text style={{
                            marginLeft: 10, fontSize: 16,
                            fontWeight: 'bold', color: '#3399ff'
                        }}>{nights} đêm</Text>
                    </View>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('RoomScreen', {startDate: startDate.toDateString(), endDate: endDate.toDateString(), nights: nights})}>
                    <Text style={styles.buttonText}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
                <View style={{ width: '100%', height: '20%', padding: 10, backgroundColor: '#ffffff'}}>
                    <Text style={styles.label}>Ưu đãi</Text>
                    <Swiper loop={true}
                            autoplay={true}
                            autoplayTimeout={5}>
                        {images.map((image, index) => (
                            <View key={index} style={styles.slide}>
                                <Image source={image} style={styles.image1} />
                            </View>
                        ))}
                    </Swiper>
                </View>
            <View style={styles.bot}>
                <View style={{ width: '100%', height: '18%', margin: 5}}>
                    <Text style={{fontWeight: 'bold',
                        fontSize: 18,
                        marginBottom: 5,
                        marginHorizontal: 10}}>Phòng phổ biến</Text>
                    <View style={{ height: '750%', paddingBottom: 5, backgroundColor: 'white', width: '100%'}}>
                        <FlatList
                            horizontal
                            style={styles.img2}
                            data={rooms.slice(0, 5)}
                            renderItem={(item) => renderRoom(item)}/>
                        <TouchableOpacity style={{flexDirection:'row-reverse'}} onPress={() => navigation.navigate('RoomScreen', {startDate: startDate.toDateString(), endDate: endDate.toDateString(), nights: nights})}>
                            <View>
                                <Text style={{fontSize: 20, color: '#3399ff', margin: 10}}>Tất cả phòng</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#3399ff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userIcon: {
        paddingHorizontal: 320
    },
    imageContainer: {
        margin: 3,
        alignItems: 'center',
    },
    card: {
        width: 150,
        height: 200,
        borderRadius: 10,
        marginHorizontal: 10
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginHorizontal: 10
    },
    customCaption: {
        fontSize: 18,
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
    },
    img2: {
        flexDirection: 'row',
        borderRadius: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,

    },
    bot: {
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        height: '25%',
    },
    slide: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    slide2: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image2: {
        width: '90%',
        borderRadius: 10,
    },
    image1: {
        width: '90%',
        borderRadius: 10,
        height: '100%',
    },
    dateHeader: {
        flexDirection: 'column',
        marginBottom: 20,

    },
    searchsmall1: {
        marginLeft: 20,
        height: 32,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateRightItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10

    },
    fromdate: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    iconText: {
        marginLeft: 10,
    },
    formContainer: {
        borderRadius: 20,
        width: '92%',
        backgroundColor: '#ffff',
        opacity: 1,
        padding: 40,
        marginBottom: 15,
    },
    logo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 500,
        height: 100,
    },
    line: {
        height: 10,
        borderBottomWidth: 1,
        borderColor: '#7777',
        width: '100%',
    },
    button: {
        backgroundColor: '#0099ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',

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
    textInside: {
        marginLeft: 10
    },
    datetime: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    bookButton: {
        backgroundColor: '#0099ff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText2: {
        color: 'white',
        fontWeight: 'bold',
    },
    date: {
        marginHorizontal: 10 ,
        color: '#3399ff',
        fontWeight: 'bold'
    },
    room: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingBottom: 750,
        paddingLeft: 10,
        position: 'absolute',
    },
    header: {
        height:60,
        flexDirection:'row',
    },
    headerItem:{
        flex: 1,
        marginHorizontal: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        height:30
    },
});

export default HomeScreen;
