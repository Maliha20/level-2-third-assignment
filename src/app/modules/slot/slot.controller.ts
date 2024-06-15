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

  const result = await slotServices.getAllAvailableSlotsFromDb()
 
  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No data found',
      data: result
    });
  }
})

export const slotControlllers ={
    createSlots,
    getAllAvailableSlots
}