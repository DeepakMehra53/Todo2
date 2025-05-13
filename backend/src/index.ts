import { PrismaClient } from "@prisma/client";
import express ,{Request,Response}from "express";
const app = express();

const prisma = new PrismaClient()
app.post('/api/user',async(req:Request,res:Response)=>{
    const 
})
async function insertData(username:string,password:string,email:string){
   const res= await prisma.user.create({
        data:{
            username,
            password,
            email

        } 
     })
     console.log(res)
}

insertData("deepak1","pawnwaiwe13","deepak12@gmail.com");