import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TodoServices {
    create(title: string, description: string, done: boolean, userId: number) {
        return prisma.todo.create({ data: { title, description, done, userId } })
    }


    update(id: number, title?: string, description?: string, done?: boolean) {
        return prisma.todo.update({ where: { id }, data: { title, description ,done } })
    }

    async getAllTodosByUserId(userId: number, skip: number, limit: number) {
        return prisma.todo.findMany({
            where: { userId },
            skip,
            take: limit,
        });
    }

    get(id: number) {
        return prisma.todo.findFirst({ where: { id } });
      }
}