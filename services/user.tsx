import axios from "axios";
// const BASE_URL = 'http://192.168.0.111:8080/api/v1'
// const BASE_URL = 'http://192.168.1.99:8080/api/v1'
// const BASE_URL = 'http://172.20.10.4:8080/api/v1'
const BASE_URL = 'https://annoyed-driving-production.up.railway.app/api/v1'

export const getDetailUserApi = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/user"),
    })
}

export const updateUserDetailApi = (lastName: string | undefined,
                                    firstName: string | undefined,
                                    phone: string | undefined,
                                    email: string | undefined,) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/user"),
        data: {
            lastName: lastName,
            firstName: firstName,
            phone: phone,
            email: email
        }
    })
}
