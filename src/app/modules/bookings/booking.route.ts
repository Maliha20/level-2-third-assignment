import { Router } from "express";
import validateRequests from "../../middlewares/validateRequests";
import { bookingValidations } from "./booking.validation";
import { bookingControllers } from "./booking.controller";
import authValidation from "../../middlewares/authMiddleware";
import { USER_ROLE}  from "../users/user.constant";

const router = Router()


router.post('/bookings', authValidation(USER_ROLE.user) ,validateRequests(bookingValidations.bookingValidationSchema), bookingControllers.createBooking)
router.get('/bookings', authValidation(USER_ROLE.admin), bookingControllers.getAllBooking)
router.get('/my-bookings', authValidation(USER_ROLE.user), bookingControllers.getUserBooking)


export const bookingRoutes = router