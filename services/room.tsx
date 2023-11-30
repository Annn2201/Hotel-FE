import axios from "axios";
    // const BASE_URL = 'http://192.168.1.10:8080/api/v1'
// const BASE_URL = 'http://192.168.1.99:8080/api/v1'
// const BASE_URL = 'http://172.20.10.4:8080/api/v1'
const BASE_URL = 'https://annoyed-driving-production.up.railway.app/api/v1'

export const listRoomsApi = (selectedRoomRank: string, selectedRoomType: string, sortBy: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/rooms"),
        params: {
            roomRank: selectedRoomRank,
            roomType: selectedRoomType,
            sortBy: sortBy
        }
    })
}

export const getRoomByRoomCodeApi = (roomCode: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/rooms/").concat(roomCode)
    })
}

export const bookRoomByUserApi = (roomCode: string, startDate: string, endDate: string) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat(`/rooms/${roomCode}/${startDate}/${endDate}`),
        data: {
            startDate: startDate,
            endDate: endDate
        }
    });
}

export const getBookingRoomApi = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/user-room")
    })
}

export const deleteBookingRoomWhenCheckout = (roomUserId: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("/user-room")
    })
}
export const deleteBookingRoomByRoomUserId = (roomUserId: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("/user-room/").concat(`${roomUserId}`)
    })
}
