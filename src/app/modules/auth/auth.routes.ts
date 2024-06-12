import express from 'express'
import validateRequests from '../../middlewares/validateRequests'
import { authValidations } from './auth.validation'
import { authControllers } from './auth.controller'


const router = express.Router()


router.post('/login', validateRequests(authValidations.loginValidationSchema) ,authControllers.loginUser) 

export const authRoutes = router