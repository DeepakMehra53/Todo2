import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { prisma } from '../models/userModels'
import { JWT_SECRET } from '../config/default';

export class UseService {
    async signup(email: string, password: string, name: string) {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) throw new Error("User already exists")

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { email, password: hashedPassword, name } });
        return user;
    }

    async signin(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid cerdentials");
        }
        const token = jwt.sign({ id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" })
        return { token, user: { id: user.id, email: user.email } };
    }
}