import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
const prisma = new PrismaClient();

export async function signup({ username, email, password }: any) {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { status: 400, data: { msg: 'User already exists' } };
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashed },
        });
        return { status: 200, data: { msg: 'User created', user: user.id } };
    } catch (error) {
        return { status: 500, data: { error: 'Server error' } };
    }
}

export async function signin({ email, password }: any) { 
    try {
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { status: 400, data: { error: 'Invalid credentials' } };
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return { status: 200, data: { msg: 'Signed In', token } };
    } catch (error) {
        return { status: 500, data: { error: 'Server error' } };
    }
}
