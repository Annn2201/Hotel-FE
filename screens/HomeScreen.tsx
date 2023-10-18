
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, StatusBar, Button, SafeAreaView} from 'react-native';
import moment from 'moment';
import 'moment/locale/vi';
import Swiper from 'react-native-swiper';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {listRoomsApi} from "../services/room";
import {Room} from "../services/interfaces/room";
import axios from "axios/index";
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';


const HomeScreen = ({ navigation }) => {

    const [rooms, setRooms] = useState<Room[]>([])
    const [modalloc, setModalloc] = useState(false)
    const [selectedRoomRank, setSelectedRoomRank] = useState(null);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const roomRank = navigation.getParam("roomRank")
    const roomType = navigation.getParam("roomType")
    const loc = () => {
        setModalloc(true)
    }
    const dongloc = () => {
        setModalloc(false)
    }
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const images = [
        require('../assets/phongkhachsan.png'),
        require('../assets/phongkhachsan2.png'),
        require('../assets/phongkhachsan3.png'),
        require('../assets/phongkhachsan4.png'),
    ];
    const images2 = [
        {
            id: '1',
            source: require('../assets/phongkhachsan5.png'),
        },
        {
            id: '2',
            source: require('../assets/phongkhachsan6.png'),
        },
        {
            id: '3',
            source: require('../assets/phongkhachsan7.png'),
        },
        {
            id: '4',
            source: require('../assets/phongkhachsan2.png'),
        },
        {
            id: '5',
            source: require('../assets/phongkhachsan3.png'),
        },
        {
            id: '6',
            source: require('../assets/phongkhachsan4.png'),
        },
    ];
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [nights, setNights] = useState<number>(0);

    const [now, setNow] = useState(new Date())
    const showModeForStartDate = (currentMode) => {
        DateTimePickerAndroid.open({
            value: startDate,
            onChange: (event, selectedDate) => {
                // Kiểm tra nếu selectedDate lớn hơn hoặc bằng ngày hiện tại
                if (selectedDate >= now) {
                    // Ngày hợp lệ, thực hiện xử lý
                    setStartDate(selectedDate);
                } else {
                    // Ngày không hợp lệ, thông báo cho người dùng
                    // Ví dụ: hiển thị một thông báo lỗi
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

    const getByPopulation = () => {
        axios({
            method: "GET",
            url: "http://192.168.1.99:8080/api/v1/rooms",
            params: {
                sortBy: 'population'
            }
        })
            .then((response) => {
                const rooms = response.data;
                setRooms(rooms)
            })
            .catch((error) => {
                console.error('Lỗi trong quá trình GET request:', error);
            });
    };
    useEffect(() => {
        getByPopulation()
    }, [])
    const renderRoom = ({ item }: { item: Room }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetailRoomScreen", { roomCode: item.roomCode })
            }}>
                <View>

                    <Image style={styles.image} source={{uri: item.images[0]}}></Image>
                    <Text style={styles.textInside}>Tên phòng: {item.roomName}</Text>
                    <Text style={styles.textInside}>Giá phòng: {item.pricePerNight}</Text>
                </View>
            </TouchableOpacity>

        )}

    return (
        <View style={styles.container}>
            <StatusBar barStyle= 'default'/>
            <Image source={require('../assets/1000_F_225066596_oxfYvjQat3pPSFvrjplG8AUC3ZTmJxHy.jpg')} style={styles.logo} />
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
                    <View style={{ height: '650%', paddingBottom: 5, backgroundColor: 'white', width: '100%'}}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeee',
        alignItems: 'center',
        justifyContent: 'center',
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
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal1: {
        backgroundColor: 'white',
        marginTop: '50%',
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textheadermodal: {
        fontSize: 25,
        fontWeight: '600',
        marginLeft: '45%'
    },
    textheadermodal2: {
        fontSize: 30,
        fontWeight: '600'
    },
    textlocmodal:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        height:35,
        width:100,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
    },
    textInside: {
        marginLeft: 10
    },
    buttonmodalloc: {
        height: 50,
        width: 150,
        borderWidth: 2,
        borderColor: '#3399ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headermodal: {
        borderBottomWidth: 1,
        height: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,0.1)',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    date: {
        marginHorizontal: 10 , color: '#3399ff', fontWeight: 'bold'
    }
});

export default HomeScreen;
