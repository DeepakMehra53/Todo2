import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TodoServices {
    create(title: string, description: string, done: boolean, userId: number) {
        return prisma.todo.create({ data: { title, description, done, userId } })
    }


    update(id: number, title: string, description: string) {
        return prisma.todo.update({ where: { id }, data: { title, description } })
    }

    list(skip:number,take:number){
        return prisma.todo.findMany({skip,take})
    }

    get(id: number) {
        return prisma.todo.findFirst({ where: { id } });
      }
}