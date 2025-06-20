    import { PrismaClient } from "@prisma/client";
    import express from 'express';
    import type { Request, Response, NextFunction } from 'express';
    import bcrypt from 'bcrypt';
    import z from 'zod';
   
    import jwt, { sign } from "jsonwebtoken";

    const prisma = new PrismaClient();
    const app = express();
    const PORT = process.env.PORT || 3000;

    const SignUpSchema = z.object({
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



    const authMiddleware =(req:Request,res:Response,next:NextFunction)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(402).json({message:"Unauthorized"})
        }
        const token = authHeader.split(" ")[1] || "";
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string }
            (req as any).user = decoded; 
            next();
        } catch (err ) {
            return res.status(401).json({ message: "Invalid token" });

        }
    }


    app.post("/api/v1/user/signup",async(req:Request,res:Response)=>{
            const payload = SignUpSchema.safeParse(req.body);
            if(!payload.success){
                res.status(400).json({mgs:"Invalid Input"})
                return
            }
            try {
                const{name,email,password}=payload.data;
                const hashed = await bcrypt.hash(password,10);
                const user = await prisma.user.create({
                    data:{
                        name,
                        email,
                        password:hashed
                    }
                })
                const token =  sign({ id: user.id },JWT_SECRET)
                return res.json({ jwt: token })
            } catch (error) {
                return res.status(404).json({ msg: "Failed to create user" })
            }
    })


    app.post("/api/v1/user/signin",async(req:Request,res:Response)=>{
        const payload= await SignInSchema.safeParse(req.body);
        if(!payload.success){
            return res.status(400).json({msg:"Invalid Input"})
        }
        try {
            const {email} =payload.data;
            const user = await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(!user || !(await bcrypt.compare(payload.data.password,user.password))){
                res.status(403)
                return res.json({ error: "Invalid credentials" })
            }
            const jwt = await sign({ id: user.id }, JWT_SECRET)
            return res.json({ jwt })
        } catch (error) {
            return res.status(500).json({ msg: "Signin failed" });

        }
    })



    app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}`)})