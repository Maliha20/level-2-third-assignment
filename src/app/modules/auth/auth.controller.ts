
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async(req, res)=>{
   
    const result = await authServices.loginUserIntoDb(req.body)

    sendResponse(res, {
        success:true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        token: result.token,
        data: result.user
    })
})


export const authControllers = {
    loginUser
}