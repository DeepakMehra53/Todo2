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