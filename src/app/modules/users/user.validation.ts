import { z } from "zod";

export const userValidationSchema = z.object({
    name: z.string(),
    email:  z.string().email(),
    password: z.string({ invalid_type_error: 'The password must be a string' })
    .min(8, { message: 'The password cannot be less than 8 charaters' }),
    phone:  z.string(),
    role: z.enum(['admin', 'user']),
    address:  z.string()
})