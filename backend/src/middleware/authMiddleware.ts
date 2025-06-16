import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/default";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ error: "Unauthorized" });
     return
    }

    const token = authHeader.split(" ")[1] || ""; 

    try {
        const user = jwt.verify(token, JWT_SECRET);
        (req as any).user = user;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
};
