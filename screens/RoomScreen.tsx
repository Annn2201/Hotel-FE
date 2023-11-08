import { View,Text, SafeAreaView, StyleSheet,Image,TouchableOpacity, Modal, FlatList} from 'react-native';
import {useEffect, useState} from 'react'
import React from 'react';
import { Room } from '../services/interfaces/room';
import { listRoomsApi } from '../services/room';
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome";
import {addTokenToAxios, deleteAccessToken, logoutApi} from "../services/authentication";

const RoomScreen = ({navigation})=> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rooms, setRooms] = useState<Room[]>([])
  const [modalloc , setModalloc] = useState(false)
  const [selectedRoomRank, setSelectedRoomRank] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const startDate = navigation.getParam("startDate")
  const endDate = navigation.getParam("endDate")
  const nights = navigation.getParam("nights")
  const roomRank = navigation.getParam("roomRank")
  const loc = () =>{
    setModalloc(true)
  }
  const dongloc = () =>{
    setModalloc(false)
  }

  const [phobien , setPhobien] = useState(false)
  const sapxep = () =>{
    setPhobien(true)
  }
  const dongsapxep = () =>{
    setPhobien(false)
  }

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };


  const handleRoomTypeSelect = (roomType) => {
    setSelectedRoomType(roomType);
  };

  const handleRoomRankSelect = (roomRank) => {
    setSelectedRoomRank(roomRank);
  };

  const [chonsapxep, setChonsapxep] = useState(1)
  const thaydoisapxep = (id)=>{
    setChonsapxep(id)
  } 

  const getRoomDataWithOutFilter = async () => {
    setIsLoading(true)
    try {
      const listRoomsResponse = await listRoomsApi()
      const { data } = listRoomsResponse
      setRooms(data)
    } catch(err) {
      const errorMessage = err.response
      alert(errorMessage)
    }
    setIsLoading(false)
  }

  const applyFilters = async () => {
    try {
      const listRoomsResponse = await listRoomsApi(selectedRoomRank, selectedRoomType)
      const { data } = listRoomsResponse
      setRooms(data)
    } catch(err) {
      const errorMessage = err.response
      alert(errorMessage)
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
  };
  const renderRoom = ({ item }: { item: Room }) => {
    return (
    <TouchableOpacity style={styles.listItem} onPress={() => {
        navigation.navigate("DetailRoomScreen", { roomCode: item.roomCode, startDate: startDate, endDate: endDate })
    }}>
      <View style={styles.room}>
        <View style={styles.roomDetail}>
          <Text style={styles.roomName}>{item.roomName}</Text>
          <Text>Hạng phòng: {item.roomRank}</Text>
          <Text>Loại phòng: {item.roomType}</Text>
          <Text style={styles.roomPrice}>{item.pricePerNight}$</Text>
        </View>
        <Image style={styles.image} source={{uri: item.images[0]}}></Image>
      </View>
    </TouchableOpacity>
  
    )
  }
  useEffect(() => {
    getRoomDataWithOutFilter()
  }, [])

  return (
    <View style = {{flex: 1}}>
      <View style = {styles.container}>
        <View style={{justifyContent:'center',marginLeft:10}}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("HomeScreen")
          }}><Image style={styles.img} source = {require('../assets/PngItem_2022960.png')}/></TouchableOpacity>
        </View>


        <View style={styles.header}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Danh sách phòng</Text>
          <Icon onPress={toggleUserOptionsModal} name={'bars'} size={30} color={'white'} style={{marginLeft: 160}}></Icon>
        </View>
      </View>
      <View style={styles.lich}>
        <View style={styles.lich1}>
          <Icon name="calendar" size={20} color={'white'} style={{marginRight: 5}}/>
          <Text style={styles.text2}>{startDate}</Text>
        </View>
        <View style={styles.lich1}>
          <Icon name="star" size={20} color={'white'} style={{marginRight: 5}}/>
          <Text style={styles.text2}>{nights}</Text>
        </View>
      </View> 
      <View style = {styles.search}>
        <View style= {styles.searchsmall1}>
          <TouchableOpacity  onPress = {(loc)}> 
            <View style={{flexDirection:'row',}}>
              <Image style={styles.img2} source = {require('../assets/funnel.png')}/>
              { isPressed ? (
                  <Text>đã lọc</Text>
              ) : (
                  <Text>lọc</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={(sapxep)}>
          <View style= {styles.searchsmall2}>
            <Text style = {styles.text3}>⇅ Phổ Biến Nhất </Text>
          </View>
        </TouchableOpacity> 
      </View>
      <FlatList
            onRefresh={getRoomDataWithOutFilter}
            refreshing={isLoading}
            style={styles.listRoom} 
            data={rooms} 
            renderItem={(item) => renderRoom(item)} />
      <Modal visible={modalloc} transparent={true} animationType='slide'>
        <View style= {styles.modal}>
          <View style= {styles.modal1}>
            <View style = {styles.headermodal}>
              <Text style= {styles.textheadermodal}>Lọc</Text>
              <TouchableOpacity style= {{marginLeft:'33%'}} onPress={(dongloc)}><Text style={styles.textheadermodal2}>X</Text></TouchableOpacity>
            </View>
            <View style={{ marginVertical: 15, borderColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 10, height: 150 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>Hạng phòng</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10 }}>
                <TouchableOpacity onPress={() => {handleRoomRankSelect('STANDARD'),setIsPressed(true)}}
                                  style={styles.textlocmodal}>
                  <Text>STANDARD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textlocmodal} onPress={() => {handleRoomRankSelect('SUPERIOR'), setIsPressed(true)}}>
                  <Text>SUPERIOR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textlocmodal} onPress={() => {handleRoomRankSelect('DELUXE'), setIsPressed(true)}}>
                  <Text>DELUXE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textlocmodal} onPress={() => {handleRoomRankSelect('SUIT'), setIsPressed(true)}}>
                  <Text>SUIT</Text>
                </TouchableOpacity>
              </View>
              {selectedRoomRank &&
                  <Text style={{ marginHorizontal: 10 }}>Bạn đã chọn phòng {selectedRoomRank}</Text>
              }
            </View>
            <View style={{borderBottomWidth:10,borderColor:'rgba(0,0,0,0.1)', height: 150}}>
              <Text style = {{fontSize:20,fontWeight:'bold', marginHorizontal: 10 }}>Loại Phòng</Text>
              <View style={{marginLeft:30,marginBottom:30}}>
              <TouchableOpacity onPress={() => {handleRoomTypeSelect('SINGLE BEDROOM'), setIsPressed(true)}}>
              <Text>1 giường đơn</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {handleRoomTypeSelect('TWIN BEDROOM'), setIsPressed(true)}}>
                <Text>2 giường đơn</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {handleRoomTypeSelect('DOUBLE BEDROOM'), setIsPressed(true)}}>
                <Text>1 giường đôi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {handleRoomTypeSelect('TRIPLE BEDROOM'), setIsPressed(true)}}>
                <Text>1 giường 3 hoặc 3 giường đơn</Text>
              </TouchableOpacity>
              {selectedRoomType && <Text >Bạn đã chọn phòng {selectedRoomType}</Text>}
              </View>
            </View>
            <View style={{height: 100, backgroundColor:'white', flexDirection:'row', justifyContent:'space-evenly', marginTop: 15}}>
              <TouchableOpacity
                  onPress={() => {setSelectedRoomRank(null), setSelectedRoomType(null), setIsPressed(false), getRoomDataWithOutFilter()}}>
                <View style={styles.buttonmodalloc}>
                  <Text > Xóa bộ lọc</Text>
                </View>
              </TouchableOpacity >
              <TouchableOpacity onPressIn={handlePressIn}
                                // onPressOut={handlePressOut}
                                onPress={applyFilters}>
                  <View style={{height:50,
                    width:150,
                    borderRadius: 10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#3399ff' }}>
                    <Text style = {{color: 'white'}}
                    >Áp dụng</Text>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={phobien} animationType='slide' transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modal2}>
            <View style = {styles.headermodal}>
                <Text style= {{...styles.textheadermodal, marginLeft:'38%'}}>Sắp xếp</Text>
              <TouchableOpacity style= {{marginLeft:'25%'}} onPress={(dongsapxep)}><Text style={styles.textheadermodal2}>X</Text></TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity  style ={[styles.viewloaisapxep,chonsapxep==1 && styles.viewloaisapxepduocchon ]} onPress ={()=> thaydoisapxep(1)}>
                  <Text>    Phổ biến nhất</Text>
                  {chonsapxep == 1 && <Image style={{height:20,width:20,resizeMode:'contain',marginLeft:'55%'}} source={require('../assets/tichxanh.png')}/>}
              </TouchableOpacity>
              <TouchableOpacity  style ={[styles.viewloaisapxep,chonsapxep==2 && styles.viewloaisapxepduocchon ]} onPress ={()=> thaydoisapxep(2)} >
                  <Text>    Giá thấp nhất </Text>
                  {chonsapxep == 2 && <Image style={{height:20,width:20,resizeMode:'contain',marginLeft:'55%'}} source={require('../assets/tichxanh.png')}/>}
              </TouchableOpacity>
              <TouchableOpacity  style ={[styles.viewloaisapxep,chonsapxep==3 && styles.viewloaisapxepduocchon ]}  onPress ={()=> thaydoisapxep(3)}>
                   <Text>    Giá cao nhất   </Text>
                   {chonsapxep == 3 && <Image style={{height:20,width:20,resizeMode:'contain',marginLeft:'55%'}} source={require('../assets/tichxanh.png')}/>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showUserOptions} transparent animationType={"fade"}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <TouchableOpacity onPress={toggleUserOptionsModal}>
              <Icon name={'close'} style={styles.closeButton}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ListBookingRoomScreen")
              toggleUserOptionsModal()
            }}>
              <Text style={styles.modalOption}>Phòng đã đặt</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("UserDetailScreen")
              toggleUserOptionsModal()
            }}>
              <Text style={styles.modalOption}>Thông tin cá nhân</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ChangePassword")
              toggleUserOptionsModal()
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#3399ff',
    height:60,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  img:{
    height:15,
    width:15,
    resizeMode:'contain',
    marginHorizontal:10
  },
  header:{
    flexDirection:'row',
    alignSelf:'center',
    marginVertical:38,
    marginRight:20,
    height:25,
    width: '100%',
    borderColor:'grey',
  },
  lich:{
    height:30,
    width:'100%',
    backgroundColor:'#3399ff',
    marginTop:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  img1:{
    height:22,
    width:22,
    resizeMode:'contain',
  },
  text2:{
    color:'white'
  },
  lich1:{
    flexDirection:'row',
  },
  search:{
    backgroundColor:'WHITE',
    height:50,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth:2,
    borderColor:'white'

  },
  img2:{
    height:20,
    width:20,
    resizeMode:'contain'
  },
  searchsmall1:{
    marginLeft:20,
    borderWidth:1,
    height:32,
    width:100,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30
  },
  text3:{
    color:'#1A94FF',
    fontWeight:'600'
  },
  searchsmall2:{
    marginRight:20,
    borderWidth:2,
    height:32,
    width:130,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
    borderColor:'#1A94FF'
  },  
  modal:{
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: 300
  },
  modal1:{
    backgroundColor:'white',
    marginTop:'50%',
    width:'100%',
    height: 400,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  headermodal:{
    borderBottomWidth:1,
    height:40,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    borderColor:'rgba(0,0,0,0.1)'
  },
  textheadermodal:{
    fontSize:25,
    fontWeight:'600',
    marginLeft:'45%'
  },
  textheadermodal2:{
    fontSize:30,
    fontWeight:'600'
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
  buttonmodalloc:{
    height:50,
    width:150,
    borderWidth:2,
    borderColor:'#3399ff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10
  },
  modal2:{
    backgroundColor:'white',
    marginTop:'70%',
    height:'30%',
    width:'100%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  viewloaisapxep:{
    height:40,
    width:'100%',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)',
    flexDirection:'row',
    alignItems:'center'
    
  },
  viewloaisapxepduocchon:{
    backgroundColor:'rgba(51, 153, 255,0.5)',
  },
  listItem: {
    height: 180,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center"
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
    backgroundColor: '#ffffff'
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 15,
    marginHorizontal: 10
  },
  room: {
    flexDirection: "row-reverse",
    justifyContent: 'flex-end',
  },
  roomDetail: {
    margin: 20
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
});
export default RoomScreen