import { Router } from "express";
import { slotControlllers } from "./slot.controller";


const router = Router()

router.post('/slots', slotControlllers.createSlots)

export const slotRoutes = router