import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotServices } from "./slot.sevice";

const createSlots = catchAsync(async(req, res)=>{
    const result = await slotServices.createSlotsIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slots created successfully" ,
        data: result
    })
})

const getAllAvailableSlots = catchAsync(async(req,res)=>{

  
  const result = await slotServices.getAllAvailableSlotsFromDb(req.query)
  sendResponse(res, {
    statusCode:  result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: result.length ? true : false,
    message: result.length ? "Available slots retrieved successfully" : "No Data Found",
    data: result



})
})

export const slotControlllers ={
    createSlots,
    getAllAvailableSlots
}