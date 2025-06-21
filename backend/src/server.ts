import { PrismaClient } from "@prisma/client";
import { password, password } from "bun";
import type { Request, Response } from "express";
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import z from 'zod'
import dotenv from 'dotenv'
import { success } from "zod/v4";
dotenv.config();

const prisma = new PrismaClient();
const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)

})

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

app.post("/api/v1/user/signup", async (req: Request, res: Response) => {
    const parsed = signupSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(404).json({ msg: "Invalid Input" })
    }
    const { email, password, name } = parsed.data;
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (!existingUser) {
        return res.send({
            success: false,
            message: "User already exists, please login dude!"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })
        const token = jwt.sign({ id: user.id }, JWT_SECRET)
        res.send({
            success: true,
            token
        })
    } catch (error) {

    }
})

app.post("/api/v1/user/signin", async (req: Request, res: Response) => {
    const parsed = signinSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(401).json({message:"Invalid Input"})
    }
    try {
        const {email,password} =parsed.data;
        const user = await prisma.user.findFirst({
            where:{email}
        })
        if(!user){
            return res.status(404).json({message:"User not found ,please signup first"})
        }
        const comparePassword =await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(401).json({message:"Invalid password"})
        }
        const token = jwt.sign({id:user.id},JWT_SECRET)
        res.status(200).send({
            success:true,
            token
        })
    } catch (error) {
        res.status(400).json({error:"Wrong Input"})
    }
    
})

app.listen(PORT, () => {
    console.log(`Server of running on http://localhost:${PORT}`)
})
