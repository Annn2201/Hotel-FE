import axios from "axios";
import { Room } from "./interfaces/room";
const BASE_URL = 'http://192.168.0.111:8080/api/v1'

export const listRoomsApi = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/rooms"),
    })
}

export const addTaskApi = ({ title, content }: Task) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("task"),
        data: {
            title,
            content
        }
    })
}

export const updateTaskApi = ({ title, content, id }: Task) => {
    return axios({
        method: "PUT",
        url: BASE_URL.concat("/task/").concat(id),
        data: {
            title,
            content
        }
    })
}

export const getTaskByIdApi = (id: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/task/").concat(id)
    })
}


export const deleteTaskApi = (id: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("/task/").concat(id)
    })
}