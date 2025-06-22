import { password } from 'bun'
import z from 'zod'
import { email } from 'zod/v4'

export const signupSchema = z.object({
    name:z.string().min(1),
    email:z.string().email(),
    password:z.string().min(6)
})

export const signinSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})