import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const createTodo = async ({ title, done, description }: { title: string;done:boolean, description: string }) => {
    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                done:false
            }
        })
        return { status: 200, data: { msg: 'Todo created', todo } };

    } catch (error) {
        return {status:500,data:{error:`Server error`}}
    }
}

export const getTodos=async()=>{
    try {
        const todos = await prisma.todo.findMany();
        return {status:200,data:{todos}};
    } catch (error) {
        return {status:500,data:{error:`Server error`}}
    }
}