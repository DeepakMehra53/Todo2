import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createTodo = async ({ title, description,done }: { title: string;done:boolean, description: string }) => {
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

export const updateTodo=async(userId:number,todoId:number,data:{title?:string;description?:string;done?:boolean})=>{
    try {
        const todo = await prisma.todo.findUnique({where:{id:todoId}})
        if(!todo){
            return{status:400,data:{error:"Todo not found"}}
        }
        const updatedTodo =await prisma.todo.update({
            where:{id:todoId},
            data:{
                title: data.title,
                description: data.description,
                done: data.done
            }
        })
        return { status: 200, data: updatedTodo };

    } catch (error) {
        return { status: 500, data: { error: 'Server error' } };
    }
}