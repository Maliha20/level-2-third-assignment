import  { Router } from 'express'
import { carServiceControllers } from './service.controller'
import validateRequests from '../../middlewares/validateRequests'
import { serviceValidationSchema, updateServiceValidationSchema } from './service.validation'
import authValidation from '../../middlewares/authMiddleware'
import { USER_ROLE } from '../users/user.constant'

const router = Router()


router.post('/services',authValidation(USER_ROLE.admin) ,validateRequests(serviceValidationSchema), carServiceControllers.createCarService)
router.get('/services',carServiceControllers.getAllServices)
router.get('/services/:id',carServiceControllers.getAService)
router.put('/services/:id',authValidation(USER_ROLE.admin),validateRequests(updateServiceValidationSchema),carServiceControllers.updateAService)
router.delete('/services/:id',authValidation(USER_ROLE.admin),carServiceControllers.deleteAService)

export const serviceRoutes = router