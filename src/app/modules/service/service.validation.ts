import { z } from "zod";

export const serviceValidationSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean(),
})
export const updateServiceValidationSchema = z.object({

    price: z.number().optional(),
    duration: z.number().optional(),
    
})