import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/default';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.replace('Bearer ', '').trim();

    if (!token) {
        res.status(403).json({ msg: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        (req as any).userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({ msg: 'Unauthorized' });
    }
};
