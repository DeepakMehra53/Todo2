import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const todoService = {
    async createTodo(userId: number, data: { title: string, description: string }) {
        return prisma.todo.create({
            data: { ...data, authorId: userId }
        })
    },
    async getTodos(userId: number) {
        return prisma.todo.findMany(
            { where: { authorId: userId } }
        )
    },
    async updateTodo(id: number, userId: number, data: { title: string; description: string }) {
        return prisma.todo.updateMany({
            where: { id, authorId: userId },
            data,
        })
    },
    async deleteTodo(id: number, userId: number) {
        return prisma.todo.deleteMany({
            where: { id, authorId: userId }
        })
    },
}

