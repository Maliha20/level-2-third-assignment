import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import jwt, { JwtPayload }  from "jsonwebtoken";
import config from "../config";
const authValidation = ()=>{
    return catchAsync(async(req: Request, res:  Response, next: NextFunction)=>{
        const token= req.headers.authorization;
        console.log(token);
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'you are not an authorized user!')
        }

        jwt.verify(token, config.jwt_access_secret as string , function(err, decoded) {
            // err

            if(err){
                throw new AppError(httpStatus.UNAUTHORIZED, 'you are not an authorized user!')
            }

            req.user = decoded as JwtPayload
            next()
            
          });
          
       
    })
}


export default authValidation