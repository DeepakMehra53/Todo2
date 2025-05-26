import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config"
import { error } from "console";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors })
    }
    req.body = result.data;
    next();
}

export const authenticationToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(400).json({ error: 'Authorization header missing or malformed' });

    }
    const token = authHeader.split('')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = { userId: decoded.userId };
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });

    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    next();
};