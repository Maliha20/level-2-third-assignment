
import httpStatus from "http-status";
import { TBookingService } from "./booking.interface";

import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";
import { User } from "../users/user.model";
import { JwtPayload } from "jsonwebtoken";



const createBookingIntoDb = async(payload:TBookingService, user: JwtPayload)=>{
   

    const doesUserExist = await User.findOne({email:user?.email, role: user?.role})
    console.log(user, doesUserExist);
    if(!doesUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'Customer not found')
      }
     
  const {slotId,serviceId,vehicleBrand,vehicleModel,vehicleType,manufacturingYear, registrationPlate} = payload
  const doesServiceExist = await Service.findById(serviceId)

  if(!doesServiceExist){
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found')
  }
 
  const doesSlotExist = await Slot.findById({
    _id: slotId,
    service: serviceId
  })

  if(!doesSlotExist){
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found')
  }
 
//check

  if (doesSlotExist?.isBooked==='booked') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No slots are available right now',
    );
  }
await Slot.findOneAndUpdate({_id: payload?.slotId},
  { isBooked: 'booked'} )

 const bookedService = await Booking.create({
    customer: doesUserExist?._id,
    service: doesServiceExist?._id,
    slot: doesSlotExist?._id,
    vehicleType:vehicleType,
    vehicleBrand: vehicleBrand,
    vehicleModel:vehicleModel,
    manufacturingYear: manufacturingYear,
    registrationPlate:registrationPlate
 })

 const result = await Booking.findById(bookedService).populate('customer').populate('service').populate('slot')
return result
}

const getAllBookingsFromDb = async()=>{
  const result = await Booking.find().populate('customer').populate('service').populate('slot')

  return result
}

const getUserBookingsFromDb = async(user:JwtPayload)=>{

  const userInfo = await User.findOne({email: user?.email, role: user?.role})
  const result = await Booking.find({customer: userInfo})

  return result
}

export const bookingServices = {
    createBookingIntoDb,
    getAllBookingsFromDb,
    getUserBookingsFromDb
}