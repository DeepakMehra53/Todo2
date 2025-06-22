import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { email, success } from 'zod/v4';
import { password } from 'bun';
import { start } from 'repl';


const prisma = new PrismaClient();

export const userServices = {
    
    async signup({ email, password, name }: any) {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) return { success: false, message: "User already exists" }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })
        return { success: true, userId: user.id }
    },

    async signin({ email, password }: any) {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return { success: false, status: 404, message: "User not found" }


        const match = await bcrypt.compare(password, user.password)
        if (!match) return { success: true, status: 401, message: "Invalid password" }


        return {success:true,userId:user.id};
    }
}