// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, TextInput, TouchableOpacity, Button, FlatList } from "react-native";
// import { Task } from "../services/interfaces/task";
// import {listTaskApi} from "../services/task";

// const HomeScreen = ({ navigation }) => {
//     const [ tasks, setTasks ] = useState<Task[]>([])
//     const [isLoading, setIsLoading] = useState<boolean>(false)
//     const getTaskData = async () => {
//         setIsLoading(true)
//         try {
//             const listTaskResponse = await listTaskApi()
//             const { data } = listTaskResponse
//             setTasks(data)
//         } catch (err) {
//             const errorMessage = err.response
//             alert(errorMessage)
//         }
//         setIsLoading(false)
//     }

//     useEffect(() => {
//         getTaskData()}
//         , [])

//     const renderTask = ({ item }: {item : Task}) => {
//         return(
//             <TouchableOpacity style={styles.listItem} onPress={() => {
//                 navigation.navigate("DetailTaskScreen", {taskId: item.id})
//             }}>
//                 <Text style={styles.taskTitle}>{item.title}</Text>
//                 <Text style={styles.taskContent}>{item.content}</Text>
//             </TouchableOpacity>
//         )
//     }
//     return (
//         <View style={styles.container}>
//             <Text style={styles.screenTitle}>Danh sách công việc</Text>
//             <Button onPress={() => {
//                 navigation.navigate('AddTaskScreen')
//             }
//             } title={'Thêm công việc'}></Button>
//             <FlatList 
//                 onRefresh={getTaskData} 
//                 refreshing={isLoading}
//                 style={styles.listTask} 
//                 data={tasks} 
//                 renderItem={(item) => renderTask(item)} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     screenTitle: {
//         fontSize: 22,
//         padding: 10
//     },
//     listTask: {
//         flex: 1,
//     },
//     listItem: {
//         height: 100,
//         width: "100%",
//         marginBottom: 1,
//         backgroundColor: "#fff",
//         padding: 10,
//         justifyContent: "center"
//     },
//     taskTitle: {
//         fontWeight: "600",
//         fontSize: 18,
//         marginBottom: 5
//     },
//     taskContent: {
//         flex: 1, 
//     }
// })

// export default HomeScreen
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import moment from 'moment';
import 'moment/locale/vi';
import Swiper from 'react-native-swiper';

const HomeScreen = ({ navigation }) => {


    const [modalloc, setModalloc] = useState(false)
    const loc = () => {
        setModalloc(true)
    }
    const dongloc = () => {
        setModalloc(false)
    }

    const [phobien, setPhobien] = useState(false)
    const sapxep = () => {
        setPhobien(true)
    }
    const dongsapxep = () => {
        setPhobien(false)
    }

    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const [isPressed1, setIsPressed1] = useState(false);

    const handlePressIn1 = () => {
        setIsPressed1(true);
    };

    const handlePressOut1 = () => {
        setIsPressed1(false);
    };

    const [chonsapxep, setChonsapxep] = useState(1)
    const thaydoisapxep = (id) => {
        setChonsapxep(id)
    }
    const images = [
        require('../assets/phongkhachsan.png'),
        require('../assets/phongkhachsan2.png'),
        require('../assets/phongkhachsan3.png'),
        require('../assets/phongkhachsan4.png'),
    ];
    const currentDate = moment();
    const formattedDate = currentDate.format('dddd,DD/MM/YYYY', {locale: 'vi'});

    return (
        <View style={styles.container}>
            <Image source={require('../assets/hotel-logo-1.png')} style={styles.logo} />
            <View style={styles.formContainer}>
                <View style={styles.dateHeader}>
                    <View style={styles.dateHeaderLeft}>
                        <Icon name="calendar" size={20} />
                        <Text style={styles.iconText}>Ngày nhận phòng</Text>
                        <Text style={{ marginLeft: 90, }}>Số đêm nghỉ</Text>
                    </View>
                    <View style={styles.dateHeaderRight}>
                        <View style={styles.dateRightItem}>
                            <TouchableOpacity onPress={() => navigation.navigate('TimeScreen')}>
                                <Text style={styles.fromdate}>{formattedDate}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateRightItem}>
                            <Text style={{
                                marginLeft: 36, fontSize: 16,
                                fontWeight: 'bold',
                            }}>1 đêm</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                        <Text style={{ fontWeight: '300', }}>Ngày trả phòng:</Text>
                        <Text style={{ marginLeft: 10, }}>{formattedDate}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.searchsmall1}>
                        <TouchableOpacity onPress={(loc)}>
                            <View style={{ flexDirection: 'row', }}>
                                <Icon name="filter" size={20} />
                                <Text style={{ marginLeft: 10, }}>Bộ lọc</Text>
                            </View>
                            <Modal visible={modalloc} transparent={true} animationType='slide'>
                                <View style={styles.modal}>
                                    <View style={styles.modal1}>
                                        <View style={styles.headermodal}>
                                            <Text style={styles.textheadermodal}>Lọc</Text>
                                            <TouchableOpacity style={{ marginLeft: '33%' }} onPress={(dongloc)}><Text style={styles.textheadermodal2}>X</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ marginVertical: 15, borderColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: 600 }}>Hạng phòng</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 }}>
                                                <View style={styles.textlocmodal}><Text>1 sao </Text></View>
                                                <View style={styles.textlocmodal}><Text>2 sao </Text></View>
                                                <View style={styles.textlocmodal}><Text>3 sao </Text></View>
                                                <View style={styles.textlocmodal}><Text>4 sao </Text></View>
                                                <View style={styles.textlocmodal}><Text>5 sao </Text></View>
                                            </View>
                                        </View>
                                        <View style={{ borderBottomWidth: 10, borderColor: 'rgba(0,0,0,0.1)' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 600 }}>Loại Phòng</Text>
                                            <View style={{ marginLeft: 30, marginBottom: 30 }}>
                                                <Text>1 giường đơn</Text>
                                                <Text>2 giường đơn</Text>
                                                <Text>1 giường đôi</Text>
                                                <Text>2 giường đôi</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                            <TouchableOpacity style={{ backgroundColor: isPressed ? '#3399ff' : 'white' }}
                                                onPress={(dongloc)}
                                                onPressIn={handlePressIn}
                                                onPressOut={handlePressOut}>
                                                <View style={styles.button}>
                                                    <Text style={styles.buttonText}> Xác nhận</Text>
                                                </View>
                                            </TouchableOpacity >
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('DanhSachPhong')}>
                    <Text style={styles.buttonText}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%',height: '30%',}}>
                <Text style={{fontWeight: 'bold',}}>Ưu đãi</Text>
                <Swiper showsButtons={true}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.slide}>
                            <Image source={image} style={styles.image} />
                        </View>
                    ))}
                </Swiper>

            </View>
            <TouchableOpacity onPress={() => {
                navigation.navigate("RoomScreen")
            }}>
                <View>
                    <Text style={{fontWeight: 'bold',}}>Phòng phổ biến</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeee',
    },
    img2: {
        resizeMode: 'contain'
    },
    slide: {
        borderRadius:10,
      },
      image: {
        width: '100%',
        borderRadius:10,
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
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 20,
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
    },
    logo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 70,
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
    textlocmodal: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 35,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
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
        borderColor: 'rgba(0,0,0,0.1)'
    },
});

export default HomeScreen;
