import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from "cors"
import  {  sign } from "jsonwebtoken"
import bcrypt from 'bcrypt'
import z from 'zod'


const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

const JWT_SECRET = "adwdawdaadawd"
//-------> Zod schema user signup <-----//

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    username: z.string()
})

const signinSchema =    z.object({
    email:z.string().email(),
    password:z.string()
})

//-------> User Route <-----//

app.post('/api/v1/user/signup', async (req: Request, res: Response) => {
    const result = signupSchema.safeParse(req.body)
    if(!result.success){
        res.status(400).json({ meassage: "Input are not correct" })
        return;
    }
    const { email, password, username } = result.data;

    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
    }

    try {
        const hashed = await bcrypt.hash(password,10)
        const user = await prisma.user.create({
            data:{
                email,
                password:hashed,
                username
            }
        })
        const token =sign({id:user.id},JWT_SECRET)
        return res.json({jwt:token})
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }

})

app.post('/api/v1/user/signin', async (req: Request, res: Response) => {
    const result = signinSchema.safeParse(req.body)
    if(!result.success){
        res.status(400).json({ meassage: "Input are not correct" })
        return;
    }
    const {email,password}=result.data;
    const user=await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return res.status(400).json({ message: "Invalid email or password" });

    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    const token = sign({ id: user.id }, JWT_SECRET);
    return res.json({ jwt: token });



})