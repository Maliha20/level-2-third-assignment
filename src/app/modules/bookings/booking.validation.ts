import { z } from "zod";
import { vehicleType } from "./booking.constant";

const bookingValidationSchema = z.object({
body: z.object({
serviceId: z.string().nonempty({ message: "service model is required" }).optional(),
slotId: z.string().nonempty({ message: "slot model is required" }).optional(),
vehicleType: z.enum([...vehicleType] as [string, ...string[]]).optional(),
vehicleBrand: z.string(),
vehicleModel: z.string(),
manufacturingYear: z.number(),
registrationPlate: z.string()
    })
})

export const bookingValidations = {
    bookingValidationSchema
}