import { useState } from "react"
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { RegisterData } from "../services/interfaces/registerData"
import {registerApi} from '../services/authentication'
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterScreen = ({ navigation }) => { 
  
    const img = { uri : "https://i.pinimg.com/736x/3a/ea/10/3aea107afa94a7cb6c2afd313c3bd173--a-hotel-hotel-offers.jpg"};
    const [email, setEmail] = useState<string>("")
    const [ username, setUsername ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ showpassword, setShowPassword ] = useState(false)
    const [ rePassword, setRePassword ] = useState<string>("")
        
    const validateEmail = (valueToValidate: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(valueToValidate);}
    const register = async () => {

        if (email === "") {
          return alert("Không bỏ trống email");
        }
        if (username === "") {
            return alert("Không bỏ trống username");
          }
        if (password === "") {
          return alert("Không bỏ trống password");
        }
        // Validate email
        if (!validateEmail(email)) {
          return alert("Email không hợp lệ");
        }  
        try {
            const registerResponse = await registerApi({ 
                email,
                username,
                password,
            })
            const { data } = registerResponse
            console.log('Kết quả từ server:', registerResponse.data);
            navigation.navigate('LoginScreen')
        } catch (err) {
          alert(err);
        }
    
        if (password !== rePassword) {
          return alert("Mật khẩu không khớp");
        }
      };
    return(
        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style = {{flex : 1, width : '100%'}} >
            <View style= {{flexDirection: 'row', justifyContent: 'space-between' }}><Image
                source={{uri: 'https://symbols.vn/wp-content/uploads/2021/11/Bo-anh-icon-ngoi-nha-vector-pho-bien.png'}}
                style={{width: 30, height: 30, margin: '7%'}}
            />
            <Image
                source={{uri: 'https://th.bing.com/th/id/R.36c58195609f9ed12189ffdcbd279b18?rik=zqDrklA7EYW33A&pid=ImgRaw&r=0'}}
                style={{width: 30, height: 30, margin: '7%'}}
            />
            </View>
            
            <Text style={styles.mainText}>Đăng ký</Text>
            <KeyboardAvoidingView style={styles.content} behavior="position">
                <Text style={styles.label}>Email</Text>
                <TextInput value={email} placeholder="Nhâp email" onChangeText={(value) => {
                    setEmail(value)
                }}  style={styles.input} />
                <Text style={styles.label}>Username</Text>
                <TextInput value={username} placeholder="Nhâp username" onChangeText={(value) => {
                    setUsername(value)
                }}  style={styles.input} />
                <Text style={styles.label}>Mật khẩu</Text>
                <View style={[styles.input, { flexDirection : 'row', alignItems : 'flex-end', justifyContent : 'space-between'}] }>
                    <TextInput  value={password} placeholder="Nhập mật khẩu" secureTextEntry={!showpassword} onChangeText={(value) => {
                        setPassword(value)
                    }}  style={{paddingRight: "65%"}}  />
                    <TouchableOpacity onPress={() => setShowPassword(!showpassword)}>
                        <Icon name={password ? 'eye-slash' : 'eye'} size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <View style={[styles.input, {flexDirection : 'row', alignItems : 'flex-end', justifyContent : 'space-between'}] }>
                    <TextInput value={rePassword} placeholder="Nhập mật khẩu" secureTextEntry={!showpassword} onChangeText={(value) => {
                        setRePassword(value)
                    }}  style={{paddingRight: "65%"}}     />
                    <TouchableOpacity onPress={() => setShowPassword(!showpassword)}>
                        <Icon name={password ? 'eye-slash' : 'eye'} size={20} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style = {{fontWeight : '700'}}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("LoginScreen")
            }}>
                    <Text style = {{fontWeight : '700'}}>Đăng nhập ở đây</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>)
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mainText: {
        marginTop: '5%',
        fontSize: 50,
        fontWeight: "900",
        textAlign:'center',
        
    },
    content: {
        alignItems: "flex-start",
        padding:30,
    },
    input: {
        borderWidth: 1,
        borderColor: "white",
        padding: 5,
        borderRadius: 5,
        width: "100%",
        backgroundColor: 'white',
        opacity: 0.5,
    },
    label: {
        marginVertical: 10,
        fontSize:20,
        fontWeight: '700',
        color: '#00CED1'

    },
    buttons: {
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 15,
        borderRadius: 5,
        backgroundColor: "#00FFFF",
        alignItems: "center",
        marginHorizontal:'7%'
    }
})
export default RegisterScreen