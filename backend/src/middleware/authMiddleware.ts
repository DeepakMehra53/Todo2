import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/default';
import { Jwt } from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.replace('Bearer', '')
    if (!token) return res.status(403).json({ msg: "Unauthorized" })
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
        (req as any).userId = decoded.id;
        next()
    } catch (error) {
        return res.status(403).json({ msg: 'Unauthorized' });

    }
};