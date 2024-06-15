import { Types } from "mongoose"

export type TSlot = {
service: Types.ObjectId,
date: string,
startTime: string,
endTime: string,
isBooked: 'available'|'booked'|'cancelled' 
}

export type TSlotSchedules = {
    date: string,
    startTime: string,
    endTime :string
}