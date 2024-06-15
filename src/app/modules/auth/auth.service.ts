import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from "../../config";

const loginUserIntoDb = async(payload:TLoginUser)=>{
    const user = await User.findOne({email: payload.email})
  

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist")
    }
 //checkPasswordMatchesOrNot
 const doesPasswordMatch = await bcrypt.compare(payload.password , user.password)

 if(!doesPasswordMatch){
    throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match")
 }

 //create token 

 const jwtPayload = {
    userId : user._id,
    role : user.role
 }

 const token = jwt.sign( jwtPayload, config.jwt_access_secret as string , { expiresIn: '10d' });

    return {
        token,
        user
    }
}


export const authServices = {
    loginUserIntoDb
}