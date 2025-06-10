import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/index'; // adjust path if needed
import { JWT_SECRET } from '../src/config/default';

describe('User Routes', () => {
    const userData = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
    };

    let token: string;

    it('should sign up a user', async () => {
        const res = await request(app)
            .post('/api/v1/user/signup')
            .send(userData);

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('should not sign up duplicate user', async () => {
        const res = await request(app)
            .post('/api/v1/user/signup')
            .send(userData);

        expect(res.status).toBe(400);
    });

    it('should sign in a user', async () => {
        const res = await request(app)
            .post('/api/v1/user/signin')
            .send({
                email: userData.email,
                password: userData.password,
            });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });

    it('should get authenticated user details', async () => {
        const res = await request(app)
            .get('/api/v1/user/me')
            .set('Authorization', `Bearer ${token}`);

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        expect(res.status).toBe(200);
        expect(res.body.userId).toBe(decoded.id);
    });
});
