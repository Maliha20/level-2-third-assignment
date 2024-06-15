import { z } from "zod";

 const loginValidationSchema  = z.object({
 body:z.object({
    email: z.string({ required_error: 'An email must be provided'}).email(),
    password: z.string({ required_error: 'A Password is required'})
 })
})

export const authValidations = {
    loginValidationSchema
}