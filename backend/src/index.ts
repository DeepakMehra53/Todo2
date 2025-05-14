import { PrismaClient } from "@prisma/client";
import express ,{Request,Response}from "express";
const app = express();
const prisma = new PrismaClient()

app.post("/api/v1/user/signup",async(req:Request,res:Response)=>{
    const {username,email,password}= req.body;
    const signup = await prisma.user.create({
        data:{
            username,
            email,
            password
        }
    })
    res.status(200).json(signup);
})


app.post('/api/v1/user/signin',async(req:Request,res:Response)=>{
    const 
})

app.listen(3000,()=>{
    console.log('Server is running on port no. 3000')
})