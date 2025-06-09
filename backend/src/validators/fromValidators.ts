import z from "zod"

export const signupSchema = z.object({
    email:z.string().email(),
    password:z.string().min(3),
    username:z.string()
})

export const signinSchema =z.object({
    email:z.string().email(),
    password:z.string()
})

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;