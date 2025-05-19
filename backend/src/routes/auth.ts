import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signinSchema,signupSchema } from "../validators/auth";




const router =Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret234aa@r24"


router.post('/signup', async (req: Request, res: Response) => {
    const parse =  signupSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: parse.error.errors });

    const {username,password,email}=parse.data;
    try {
        const existingUser = await prisma.user.findUnique({where:{email}});
        if(existingUser) return res.status(400).json({msg:"User already exists"})
        const hashed = await bcrypt.hash(password,10);
        const user = await prisma.user.create({data:{username,email,password:hashed}})
        return res.status(200).json({msg:"User  created",user:user.id })
    } catch (error) {
        res.status(500).json({error:'Server error'})
    }

})
export default router;
router.post('/signin', async (req: Request, res: Response) => {
    const parse =  signinSchema.safeParse(req.body);
    if(!parse.success) return res.status(400).json({error:parse.error.errors});

    const {email,password}=parse.data;
    try {
        const user = await prisma.user.findFirst({where:{email}});
        if(!user) return res.status(400).json({error:"Invalid credentials"});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({error:"Invalid credentials"})

        const token = jwt.sign({userId:user.id},JWT_SECRET,{expiresIn:'1hr'});
        res.json({msg:"Signed In",token});

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

})

export default router;