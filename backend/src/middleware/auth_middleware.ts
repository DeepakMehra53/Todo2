import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config"


export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ errors: result.error.errors });
        return;
    }
    next();
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(400).json({ error: 'Authorization header missing or malformed' });
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = { userId: decoded.userId };
        next(); // ✅ proceed if valid
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user?.userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }
    next();
};