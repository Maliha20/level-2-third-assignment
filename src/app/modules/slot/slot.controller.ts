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

export const slotControlllers ={
    createSlots
}