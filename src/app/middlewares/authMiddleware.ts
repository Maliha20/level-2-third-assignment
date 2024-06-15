import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import jwt, { JwtPayload }  from "jsonwebtoken";
import config from "../config";
import { TUser } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";
import sendResponse from "../utils/sendResponse";

const authValidation = (...requiredRoles : TUser[])=>{
    return catchAsync(async(req: Request, res:  Response, next: NextFunction)=>{
        const token= req.headers.authorization?.split(' ')[1];
        
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'you are not an authorized user!')
        }
        
        const decoded = jwt.verify(token,config.jwt_access_secret as string) as JwtPayload

          const {role,userUemail: userEmail} = decoded
        
        const user = await User.findOne(userEmail)
  
         if(!user){
             throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist")
         }


        if(requiredRoles && !requiredRoles.includes(role)){
           
            // throw new AppError(httpStatus.UNAUTHORIZED,  "You have no access to this route")

            sendResponse(res, {
                success:  false,
                statusCode: httpStatus.UNAUTHORIZED, 
                message: "You have no access to this route"        
        
            })
        }

        req.user = user
        next()
        
       
    })
}


export default authValidation