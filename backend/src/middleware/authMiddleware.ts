import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/default";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(402).json({ message: "Unauthorized" })
    }
    const token = authHeader.split(" ")[1] || "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string }
        (req as any).user = decoded; // attach decoded user info to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });

    }
}