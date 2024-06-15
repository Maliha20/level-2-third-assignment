
import { Types } from "mongoose";


export type TBooking={
customer:Types.ObjectId,
service:Types.ObjectId,
slot: Types.ObjectId,
vehicleType: TVehicleType,
vehicleBrand: string,
vehicleModel: string,
manufacturingYear: number,
registrationPlate: string
}
export type TBookingService={
serviceId:Types.ObjectId,
slotId: Types.ObjectId,
vehicleType: TVehicleType,
vehicleBrand: string,
vehicleModel: string,
manufacturingYear: number,
registrationPlate: string
}


export type TVehicleType = 'car'| 'truck'| 'SUV'| 'van' |'motorcycle'| 'bus'|'electricVehicle'| 'hybridVehicle' |'bicycle'| 'tractor';