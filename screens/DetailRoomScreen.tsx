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
import {getRoomByRoomCodeApi} from "../services/room";
import {bookRoomByUserApi} from "../services/room";
import {listRoomsApi} from "../services/room";

const DetailRoomScreen = ({navigation}) => {
    const roomCode = navigation.getParam("roomCode")
    const startDate = navigation.getParam("startDate")
    const endDate = navigation.getParam("endDate")
    const [imageUrls, setImageUrls] = useState([])
    const [currentImage, setCurrentImage] = useState(0);
    const [morong, setMorong] = useState(false);

    const [modalthuoctinh, setModalethuoctinh]  = useState (false)
    const [room, setRoom] = useState<Room>()
    const [rooms, setRooms] = useState<Room[]>([])
    const [roomSameTypes, setRoomSameTypes] = useState<Room[]>([])
    const motatcathuoctinh = () =>{
        setModalethuoctinh(true)
        setMorong(true)
    }
    const dongtatcathuoctinh = () =>{
        setModalethuoctinh(false)
        setMorong(false)
    }
    const getRoomById = async(roomCode: string) => {
        try {
            const { data } = await getRoomByRoomCodeApi(roomCode)
            setRoom(data)
            setImageUrls(data?.images)
        } catch (err) {
            alert(err.response)
        }
    }
    useEffect(() => {
        getRoomById(roomCode)
    }, [roomCode])

    const getSameRankRoom = async(roomRank: string) => {
        try {
            const { data } = await listRoomsApi(roomRank)
            setRooms(data)
        } catch (err) {
            alert(err.response)
        }
    }
    useEffect(() => {
        getSameRankRoom(room?.roomRank)
    }, [room?.roomRank])
    const getSameTypeRoom = async(roomType: string) => {
        try {
            const { data } = await listRoomsApi(null,roomType)
            setRoomSameTypes(data)
        } catch (err) {
            alert(err.response)
        }
    }
    useEffect(() => {
        getSameTypeRoom(room?.roomType)
    }, [room?.roomType])

    const renderRoom = ({ item }: { item: Room }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetailRoomScreen", { roomCode: item.roomCode, startDate: startDate, endDate: endDate  })
            }}>
                <View>

                    <Image style={styles.image} source={{uri: item.images[0]}}></Image>
                    <Text style={styles.textInside}>Tên phòng: {item.roomName}</Text>
                    <Text style={styles.textInside}>Giá phòng: {item.pricePerNight}</Text>
                </View>
            </TouchableOpacity>

        )}


    const bookRoomByUser = async (roomCode: string, startDate: string, endDate: string) => {
        try {
            const { data } = await bookRoomByUserApi(roomCode, startDate, endDate)
            alert("Đã đặt phòng thành công")
        } catch (err) {
            alert("Phòng đã có người đặt vui lòng chọn phòng khác")
        }
    }
    const thuoctinh = (styletrongmodal) => {

        const tatcathuoctinh = morong ? ['Nhà hàng', 'Hồ bơi', 'Lễ Tân 24h', 'Wifi', 'Cầu trượt', 'Xe tăng', 'Tên lửa']
            :['Nhà hàng', 'Hồ bơi', 'Lễ Tân 24h', 'Wifi'];

        return tatcathuoctinh.map((id) => (
            <View key={id}
                  style={[styles.othuoctinh,styletrongmodal]}
            ><Text>{id}</Text>
            </View>
        ));

    };
    const handleNextImage = () => {
        setCurrentImage((anhhientai) => (anhhientai + 1) % imageUrls.length);
    };

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={handleNextImage}>
                <Image source={{uri: imageUrls[currentImage]}} style={{ width: '100%', height: 200 }} />
            </TouchableOpacity>
            <View style = {styles.thanhhienthihinhanh}>
                {imageUrls.map((_,sothutu) => (
                    <View key = {sothutu} style ={[styles.thutuanh,{backgroundColor : sothutu == currentImage ? 'rgba(0,0,255,0.5)': 'rgba(255,255,255,0.5)' }]}>
                    </View>
                ))}
            </View>
            <View style= {styles.chitietphong}>
                <ScrollView>
                    <View style= {styles.container}>
                        <View style={styles.header}>
                            <Text style={{fontSize:20,fontWeight:'700'}}>Tiện nghi</Text>
                            <TouchableOpacity onPress={motatcathuoctinh}>
                                <Text style={{fontSize:18,color:'rgb(00, 150, 220)'}}>Xem tất cả></Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerthuoctinh}>
                            {thuoctinh()}
                        </View>
                        <View style={styles.vachke}></View>
                        <Text style={{fontSize:20, fontWeight:'700'}}>Giờ Nhận Phòng / Trả Phòng </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:15}}>
                            <View style={{flexDirection:'row'}}>
                                <Text >🕥</Text>
                                <Text  style={{fontSize:18}} >Nhận phòng</Text>
                            </View>
                            <Text style={{fontWeight:'700',fontSize:18}}>{startDate} 15:00 -3:00</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:15}}>
                            <View style={{flexDirection:'row'}}>
                                <Text >🕥</Text>
                                <Text  style={{fontSize:18}} >Trả Phòng</Text>
                            </View>
                            <Text style={{fontWeight:'700',fontSize:18}}>{endDate} Trước 11:00</Text>
                        </View>
                        <View style={styles.vachke}></View>
                        <Text style={{fontSize:20, fontWeight:'700', marginVertical: 10}}>Mô Tả Phòng </Text>
                        <View style = {{height: 'auto'}}>
                                <Text>Tên phòng : {room?.roomName}</Text>
                                <Text>Loại phòng: {room?.roomType}</Text>
                                <Text>Hạng phòng: {room?.roomRank}</Text>
                                <Text>{room?.description}</Text>
                        </View>
                        <View style={{...styles.vachke,height:1}}></View>
                        <View>
                            <View style={{ width: '100%', height:'20%', margin: 5}}>
                                <Text style={styles.label}>Phòng cùng hạng</Text>
                                <View style={{ height: '400%', paddingBottom: 5}}>
                                    <FlatList
                                        horizontal
                                        style={styles.img2}
                                        data={rooms.slice(0, 5)}
                                        renderItem={(item) => renderRoom(item)}/>
                                </View>
                                <Text style={{fontSize: 15, color: '#3399ff', margin: 10, textAlign:'right'}}>Xem thêm</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ width: '100%',height:'20%', marginTop: 10}}>
                                <Text style={styles.label}>Phòng cùng loại</Text>
                                <View style={{ height: '400%', paddingBottom: 5}}>
                                    <FlatList
                                        horizontal
                                        style={styles.img2}
                                        data={roomSameTypes.slice(0, 5)}
                                        renderItem={(item) => renderRoom(item)}/>
                                </View>
                                <Text style={{fontSize: 15, color: '#3399ff', margin: 10, textAlign:'right'}}>Xem thêm</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:18, fontWeight:'700', marginLeft: 5}}> Giá phòng mỗi đêm từ</Text>
                        <View style={{marginRight: 10}}>
                            <Text style={{fontSize:18, fontWeight:'700',color:'rgb(00, 150, 220)'}}>{room?.pricePerNight} đ</Text>
                            <Text style={{color:'rgba(128,128,128,0.7)'}}>Đã bao gồm thuế</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.chonphongbutton} onPress={ () => {bookRoomByUser(roomCode, startDate, endDate), console.log(startDate, endDate)}}>
                        <Text>Chọn Phòng</Text>
                    </TouchableOpacity>
                    <Modal visible={modalthuoctinh} animationType='fade' transparent={true}>
                        <View style={{ backgroundColor:'rgba(0,0,0,0.5)',flex:1,alignItems:'center',justifyContent:'center'}}>
                            <View style={styles.modalcontainer}>
                                <View>
                                    <TouchableOpacity onPress={dongtatcathuoctinh} style={styles.modalenutX}>
                                        <Text style={{fontSize:30,fontWeight:'800',color:'white'}}>X</Text>
                                    </TouchableOpacity>
                                    <View style={styles.modaltatcathuoctinh}>{thuoctinh(styles.othuoctinhtrongmodal)}</View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
        </View>
    );
};
const styles = StyleSheet.create({
    chitietphong:{
        backgroundColor:'white',
        position:'absolute',
        top:160,
        height:'78%',
        width:'100%',
        borderTopLeftRadius:25,
        borderTopRightRadius:25

    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginHorizontal: 10
    },
    textInside: {
        marginLeft: 10
    },
    thanhhienthihinhanh:{
        position:'absolute',
        top:150,
        height:5,
        left:'30%',
        right:'30%',
        width:'40%',
        flexDirection:'row',
    },
    thutuanh:{
        flex:1,
        height:2,
        marginHorizontal:5
    },
    container:{
        margin:20
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    containerthuoctinh : {
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:15,
    },
    othuoctinh:{
        height:40,
        width:170,
        borderWidth:1,
        borderRadius:20,
        borderColor:'rgba(128, 128, 128,0.3)',
        justifyContent:'center',
        alignItems:'center',
        margin: 5
    },
    modalcontainer:{
        backgroundColor:'white',
        height:'70%',
        width:'100%',
        borderRadius:20,

    },
    modalenutX:{
        backgroundColor:'rgb(00, 150, 220)',
        alignItems:'center',
        height:'20%',
        justifyContent:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    modaltatcathuoctinh:{
        flexDirection:'row',
        flexWrap:'wrap',
        margin:20,
    },
    othuoctinhtrongmodal:{
        height:40,
        width:110
    },
    vachke:{
        backgroundColor:'rgba(128,128,128,0.1)',
        width:'100%'+40,
        height:10,
        marginLeft:-20,
        marginRight:-20,
        marginTop:10,
        marginBottom:15
    },
    chonphongbutton:{
        height:40,
        width:'95%',
        backgroundColor:'rgb(00, 150, 220)',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5
    },
    img2: {
        flexDirection: 'row',
        borderRadius: 10,
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
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',

    },
    bookButton: {
        backgroundColor: '#0099ff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
})

export default DetailRoomScreen;