import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/userControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../types/express"; // Make sure this file exists

const router = Router();
const controller = new UserController();

// Error-handling wrapper for async route handlers
function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}

// Routes
router.post(
    "/signup",
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
        controller.signup(req, res)
    )
);

router.post(
    "/signin",
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
        controller.signin(req, res)
    )
);

router.get(
    "/me",
    authMiddleware,
    asyncHandler(async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        return   await res.json({ userId: req.userId });
    })
);

export default router;
