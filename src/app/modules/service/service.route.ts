import express from 'express'
import { carServiceControllers } from './service.controller'
import validateRequests from '../../middlewares/validateRequests'
import { serviceValidationSchema, updateServiceValidationSchema } from './service.validation'

const router = express.Router()


router.post('/services', validateRequests(serviceValidationSchema), carServiceControllers.createCarService)
router.get('/services',carServiceControllers.getAllServices)
router.get('/services/:id',carServiceControllers.getAService)
router.put('/services/:id',validateRequests(updateServiceValidationSchema),carServiceControllers.updateAService)

export const serviceRoutes = router