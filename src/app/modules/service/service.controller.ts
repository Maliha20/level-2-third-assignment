import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { carServiceServices } from "./service.service";

const createCarService = catchAsync(async(req, res)=>{
    const result = await carServiceServices.createCarServiceIntoDb(req.body)
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Service created successfully",
        data: result
    
    })
   
})

const getAllServices = catchAsync(async(req, res)=>{
    const result = await carServiceServices.getAllServicesFromDb()
    sendResponse(res,{
        success: result.length ? true : false,
        statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
        message: result.length ? "Services retrieved successfully" : "No Data Found",
        data: result
    
    })
})

const getAService = catchAsync(async(req, res)=>{

    const {id} = req.params
    const result = await carServiceServices.getAServiceFromDb(id)
    if(result == null){
        sendResponse(res,{
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No Data Found",
        data: result
        })
    }
    sendResponse(res, {
        success:  true,
        statusCode: httpStatus.OK, 
        message: "Service retrieved successfully",
        data: result

    })

})

const updateAService = catchAsync(async(req, res)=>{

    const {id} = req.params
    
    const result = await carServiceServices.updateServiceIntoDb(id, req.body)
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Service updated successfully",
        data: result
    
    })
})
const deleteAService = catchAsync(async(req, res)=>{

    const {id} = req.params
    
    const result = await carServiceServices.deleteServiceFromDb(id)
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Service deleted successfully",
        data: result
    
    })
})
export const carServiceControllers = {
    createCarService,
    getAllServices,
    getAService,
    updateAService,
    deleteAService
}