import { PrismaClient } from "@prisma/client";
import { sign, verify } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import z from 'zod'
import { serve, password } from 'bun';
import { success } from "zod/v4";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;


const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)

})

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

serve({
    port: 3000,
    fetch: async (req:Request) => {
        const url = new URL(req.url)
        const pathname = url.pathname;
        const method = req.method;

        const body = await req.json();

        if (pathname === "/api/v1/user/signup" && method === "POST") {
            const parsed = signupSchema.safeParse(body)
            if (!parsed.success) {
                return new Response(JSON.stringify({ message: "Invalid Input" }), {
                    status: 400,
                })
            }
            const { email, password, name } = parsed.data;
            const existingUser = await prisma.user.findUnique({ where: { email } })
            if (existingUser) {
                return new Response(JSON.stringify({
                    success: false,
                    messgae: "User already exists,please login dude!"
                }),{status:409}
            );
            }
            const hashedPassword =await bcrypt.hash(password,10)
            const user = await prisma.user.create({
                data:{
                    email,
                    password:hashedPassword,
                    name
                },
            });
            const token = sign({id:user.id},JWT_SECRET)
            return  Response.json({success:true,token})
        }
        return new Response("Not Found", { status: 404 });
    }


})


