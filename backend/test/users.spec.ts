import request from 'supertest';
import app from '../src/index'
import userRoutes from '../src/routes/userRoute';
import bodyParser from 'body-parser';
import { JWT_SECRET } from '../src/config/default';
import jwt from 'jsonwebtoken';
import { describe } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use('/api', userRoutes);

const testUser = {
    email: 'testuser@example.com',
    password: 'testpass123',
    username: 'testuser',
};
let token: string;

beforeAll(async () => {
    await prisma.user.deleteMany(); // Clean test DB
});

describe('User Routes', () => {
    it('should sign up a user', async () => {
        const res = await request(app).post("/api/v1/user/signup").send(testUser);
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("User created");
        token = res.body.token;
        expect(token).toBeDefined();
    });

    it('should not sign up duplicate user', async () => {
        const res = await request(app).post("/api/v1/user/signup").send(testUser);
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("User already exists");
    });

    it('should sign in a user', async () => {
        const res = await request(app).post("/api/v1/user/signin").send({
            email: testUser.email,
            password: testUser.password
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('should get authenticated user details', async () => {
        const token = jwt.sign({ userId: 'dummyId' }, JWT_SECRET as string);
        const res = await request(app)
            .get('/api/v1/user/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.userId).toBe('dummyId');
    });
});
