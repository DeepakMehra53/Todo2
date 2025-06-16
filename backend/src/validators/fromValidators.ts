import  {z} from 'zod';

export const SignUpSchema = z.object({
    name:z.string().min(1),
    email:z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})  

export const SighInSchema = z.object({
   
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})  
