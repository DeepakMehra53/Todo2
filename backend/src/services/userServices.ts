import { PrismaClient } from "@prisma/client";

export class UserService {
    private prisma = new PrismaClient()
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } })
    }
    async createUser(email: string, password: string, username: string) {
        return this.prisma.user.create({ data: { email, password, username } })
    }
}

export class TodoService{
    private prisma = new PrismaClient()
    async createTodo (title:string,description:string,done:boolean,userId:number){
        return this.prisma.todo.create({data:{title,description,done,userId}})
    }
    
    
}