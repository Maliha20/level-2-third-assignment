import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async(req,res)=>{
    const user = req.user
    const result = await bookingServices.createBookingIntoDb(req.body, user )
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking successful",
        data: result
    
    })
})
const getAllBooking = catchAsync(async(req,res)=>{
  
    const result = await bookingServices.getAllBookingsFromDb()
    sendResponse(res,{
        success: result.length ? true : false,
        statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
        message: result.length ? "All bookings retrieved successfully" : "No Data Found",
        data: result
    
    })
})
const getUserBooking = catchAsync(async(req,res)=>{
  const user = req.user
    const result = await bookingServices.getUserBookingsFromDb(user)
    sendResponse(res,{
        success: result.length ? true : false,
        statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
        message: result.length ? "User bookings retrieved successfully" : "No Data Found",
        data: result
    
    })
})

// suucess: result.length ? true : false

export const bookingControllers = {
    createBooking,
    getAllBooking,
    getUserBooking
}