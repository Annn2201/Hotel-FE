import axios from "axios";
import { Task } from "./interfaces/task";
const BASE_URL = 'https://64f670e49d77540849524e71.mockapi.io/api/v1/'

export const listTaskApi = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("task/"),
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