import express from 'express';
import { userControllers } from './user.controller';
import validateRequests from '../../middlewares/validateRequests';
import { userValidationSchema } from './user.validation';



const router = express.Router()

router.post('/auth/signup',validateRequests(userValidationSchema), userControllers.createUser)

export const userRoutes = router;