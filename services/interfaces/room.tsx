import { DateData } from "react-native-calendars"

export interface Room {
    roomCode: string
    pricePerNight: string
    roomType: string
    roomRank: string
    description: string
    checkInTime: DateData
    checkOutTime: DateData
    population: BigInt
    roomName: string
    images: string[]
}