import { PrismaClient } from "@prisma/client";
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import z from 'zod';
import { password } from "bun";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

const SingUpSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string()
})

const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const JWT_SECRET = "sercert2343fs4"

app.use(express.json())

app.use

const authMiddleware =(req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(402).json({message:"Unauthorized"})
    }
    const token = authHeader.split(" ")[1] || "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string }
            (req as any).user = decoded; // attach decoded user info to the request
        next();
    } catch (err ) {
        return res.status(401).json({ message: "Invalid token" });

    }
}


app.post("/api/v1/user/signup",(req:Request,res:Response)=>{

})

app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}`)})