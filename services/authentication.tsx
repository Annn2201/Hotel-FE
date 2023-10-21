import axios from "axios";
import { RegisterData } from "./interfaces/registerData";
import { LoginData } from "./interfaces/loginData";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://192.168.0.111:8080/api/v1'
// const BASE_URL = 'http://192.168.1.99:8080/api/v1'
export const registerApi = ({ lastName, firstName, identifyNumber ,email, username, password}: RegisterData) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/register"),
        data: {
            lastName,
            firstName,
            identifyNumber,
            email,
            username,
            password
        }
    })
}

export const loginApi = ({ username, password }: LoginData) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/login"),
        data: {
            username,
            password
        }
    });
}
export const setAccessToken = async (accessToken: string) => {
    if(!accessToken) {
        return false
    }
    try {
        await SecureStore.setItemAsync('accessToken', JSON.stringify(accessToken))
        addTokenToAxios(accessToken)
        return true
    } catch(error) {
        console.log("Loi khi luu token", error)
    }
    return false
}

export const getAccessToken = async() => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        return accessToken
    } catch (error) {
        console.log("Lỗi khi lấy token", error)
    }
    return false
}

export const addTokenToAxios = (accessToken: string) => {
    axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      })
}