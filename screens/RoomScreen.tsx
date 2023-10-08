import { View,Text, SafeAreaView, StyleSheet,Image,TouchableOpacity, Modal, FlatList } from 'react-native';
import {useEffect, useState} from 'react'
import React from 'react';
import { Room } from '../services/interfaces/room';
import { listRoomsApi } from '../services/room';

const RoomScreen = ({navigation})=> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rooms, setRooms] = useState<Room[]>([])
  const [modalloc , setModalloc] = useState(false)
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
  const thaydoisapxep = (id)=>{
    setChonsapxep(id)
  } 

  const getRoomData = async () => {
    setIsLoading(true)
    try {
        const listRoomsResponse = await listRoomsApi()
        const { data } = listRoomsResponse
        // console.log(data)
        setRooms(data)
    } catch(err) {
        const errorMessage = err.response
        alert(errorMessage)
    }
    setIsLoading(false)
  }

  const renderTask = ({ item }: { item: Room }) => {
    return (
    <TouchableOpacity style={styles.listItem} onPress={() => {
        navigation.navigate("DetailTaskScreen", { taskId: item.id })
    }}> 
            <Text style={styles.roomName}>{item.roomName}</Text>
            <Text style={styles.roomPrice}>{item.pricePerNight}</Text>
    </TouchableOpacity>
  
    )
  }
  useEffect(() => {
    getRoomData()
}, []) 

  return (
    <View style = {{flex: 1}}>
      <View style = {styles.container}>
        <View style={{justifyContent:'center',marginLeft:15}}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("HomeScreen")
          }}><Image style={styles.img} source = {require('../assets/PngItem_2022960.png')}/></TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableOpacity><Image style={styles.img} source = {require('../assets/3cham.png')}/></TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity><Image style={styles.img} source = {require('../assets/pngegg.png')}/></TouchableOpacity>
        </View>
      </View>

      <View style={styles.lich}>
        <View style={styles.lich1}>
          <Image style={styles.img1} source={require('../assets/calendar.png')} />
          <Text style={styles.text2}>02/02/2020</Text>
        </View>
        <View style={styles.lich1}>
          <Image style={styles.img1} source={require('../assets/crescent-moon.png')} />
          <Text style={styles.text2}>2</Text>
        </View>
        <View style={styles.lich1}>
          <Image style={styles.img1} source={require('../assets/door.png')} />
          <Text style={styles.text2}>2</Text>
        </View>
        <View style={styles.lich1}>
          <Image style={styles.img1} source={require('../assets/user.png')} />
          <Text style={styles.text2}>2</Text>
        </View>
        <Image style={styles.img1} source={require('../assets/down-arrow.png')} />
      </View> 
      <View style = {styles.search}>
        <View style= {styles.searchsmall1}>
          <TouchableOpacity  onPress = {(loc)}> 
            <View style={{flexDirection:'row',}}>
              <Image style={styles.img2} source = {require('../assets/funnel.png')}/>
              <Text>lọc</Text>
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
            onRefresh={getRoomData} 
            refreshing={isLoading}
            style={styles.listRoom} 
            data={rooms} 
            renderItem={(item) => renderTask(item)} />
      <Modal visible={modalloc} transparent={true} animationType='slide'>
        <View style= {styles.modal}>
          <View style= {styles.modal1}>
            <View style = {styles.headermodal}>
              <Text style= {styles.textheadermodal}>Lọc</Text>
              <TouchableOpacity style= {{marginLeft:'33%'}} onPress={(dongloc)}><Text style={styles.textheadermodal2}>X</Text></TouchableOpacity>
            </View>
            <View style={{marginVertical:15,borderColor:'rgba(0,0,0,0.1)',borderBottomWidth:10}}>
              <Text style = {{fontSize:20,fontWeight:'600'}}>Hạng phòng</Text>
              <View style={{flexDirection:'row',justifyContent:'space-evenly', marginVertical:15}}>
                <View style={styles.textlocmodal}><Text>1 sao </Text></View>
                <View style={styles.textlocmodal}><Text>2 sao </Text></View>
                <View style={styles.textlocmodal}><Text>3 sao </Text></View>
                <View style={styles.textlocmodal}><Text>4 sao </Text></View>
                <View style={styles.textlocmodal}><Text>5 sao </Text></View>
              </View>
            </View>
            <View style={{borderBottomWidth:10,borderColor:'rgba(0,0,0,0.1)'}}>
              <Text style = {{fontSize:20,fontWeight:'600'}}>Loại Phòng</Text>
              <View style={{marginLeft:30,marginBottom:30}}>
                <Text>1 giường đơn</Text>
                <Text>2 giường đơn</Text>
                <Text>1 giường đôi</Text>
                <Text>2 giường đôi</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
              <TouchableOpacity style={{backgroundColor:isPressed ? '#3399ff':'white' }} 
                                        onPressIn={handlePressIn}
                                        onPressOut={handlePressOut}>
                <View style={styles.buttonmodalloc}>
                  <Text style = {{color:isPressed ? 'white':'black'}}  > Xóa bộ lọc</Text>
                </View>
              </TouchableOpacity >
               <TouchableOpacity style={{backgroundColor:isPressed1 ? '#3399ff':'white' }} 
                                        onPressIn={handlePressIn1}
                                        onPressOut={handlePressOut1}>
                <View style={styles.buttonmodalloc}>
                  <Text style = {{color:isPressed1 ? 'white':'black'}} >Áp dụng</Text>
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
    marginHorizontal:5
  },
  header:{
    flexDirection:'row',
    borderWidth:2,
    alignItems:'center',
    justifyContent:'space-between',
    alignSelf:'center',
    marginVertical:38,
    marginRight:20,
    borderRadius:20,
    backgroundColor:'grey',
    height:25,
    width:60,
    borderColor:'grey'
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
    width:60,
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
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal1:{
    backgroundColor:'white',
    marginTop:'50%',
    width:'100%',
    height:'50%',
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
    width:60,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25
  },
  buttonmodalloc:{
    height:50,
    width:150,
    borderWidth:2,
    borderColor:'#3399ff',
    justifyContent:'center',
    alignItems:'center'
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
    height: 100,
    width: "100%",
    marginBottom: 1,
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

},
listRoom: {
  flex: 1,
},

});
export default RoomScreen