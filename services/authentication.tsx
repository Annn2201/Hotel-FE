import axios from "axios";
import { RegisterData } from "./interfaces/registerData";
import { LoginData } from "./interfaces/loginData";

const BASE_URL = 'http://172.20.10.8:8080/api/v1'

export const registerApi = ({ email, username, password}: RegisterData) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/register"),
        data: {
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
    })
}