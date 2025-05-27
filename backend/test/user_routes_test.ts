import request from 'supertest';
import express, { Application } from 'express';
import userRoutes from '../src/routes/user_routes';
import bodyParser from 'body-parser';
import { JWT_SECRET } from '../src/config/config';
import jwt from 'jsonwebtoken';

const app: Application = express();
app.use(bodyParser.json());
app.use('/api', userRoutes);

const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpass123',
};

describe('User Routes', () => {
    it('should sign up a user', async () => {
        const res = await request(app).post('/api/signup').send(testUser);
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe('User created');
    });

    it('should not sign up duplicate user', async () => {
        const res = await request(app).post('/api/signup').send(testUser);
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('User already exists');
    });

    it('should sign in a user', async () => {
        const res = await request(app).post('/api/signin').send({
            email: testUser.email,
            password: testUser.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('should get authenticated user details', async () => {
        const token = jwt.sign({ userId: 'dummyId' }, JWT_SECRET as string);
        const res = await request(app)
            .get('/api/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.userId).toBe('dummyId');
    });
});
