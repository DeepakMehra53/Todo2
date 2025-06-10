import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/default";
import { AuthenticatedRequest } from "../types/express";

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction):void {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith(`Bearer`)) {
       res.status(401).json({ message: "Unauthorized" });
       return
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.userId = decoded.id;
        next();
    } catch {
         res.status(401).json({ message: "Invalid token" });
         return
    }
}
