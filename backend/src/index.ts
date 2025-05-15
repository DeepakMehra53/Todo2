import { PrismaClient } from "@prisma/client";
import express ,{Request,Response}from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET:string = "Brother>=Stong"
const app = express();
app.use(express.json())
const prisma = new PrismaClient()
app.post("/api/v1/user/signup",async(req:Request,res:Response)=>{
    const {username,email,password}= req.body;
    try {
        const signup = await prisma.user.create({
            data:{
                username,
                email,
                password
            }
        })
        const token = jwt.sign({id:signup.id},JWT_SECRET)
        res.status(200).json({token,signup})
    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
      }
   
})

app.post('/api/v1/user/signin',(req:Request,res:Response)=>{
    const {username,password}=  req.body
    try {
        const signin = prisma.user.findFirst({
            where:{
                username,
                password
            }
        })

        if(!signin){
            res.status(403).json({
                msg:"Incorrect credential"
            })
        }

        const token = jwt.sign({id:signin?.id},JWT_SECRET)
        return res.json(token)
    } catch (error) {
        console.log(error)
        res.status(403);
        return res.json({msg:'Invalid'})
    }
})




app.listen(3000,()=>{
    console.log('Server is running on port no. 3000')
})