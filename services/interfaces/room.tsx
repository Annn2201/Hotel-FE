import { DateData } from "react-native-calendars"

export interface Room {
    roomCode: string
    pricePerNight: string
    roomType: string
    roomRank: string
    description: string
    roomName: string
    startDate: string
    endDate: string
    images: string[]
}