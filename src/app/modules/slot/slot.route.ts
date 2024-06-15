import { Router } from "express";
import { slotControlllers } from "./slot.controller";
import validateRequests from "../../middlewares/validateRequests";
import { slotValidations } from "./slot.validation";
import authValidation from "../../middlewares/authMiddleware";
import { USER_ROLE } from "../users/user.constant";


const router = Router()

router.post('/services/slots',authValidation(USER_ROLE.admin),validateRequests(slotValidations.slotValidationSchema) ,slotControlllers.createSlots)
router.get('/slots/availability',slotControlllers.getAllAvailableSlots)

export const slotRoutes = router