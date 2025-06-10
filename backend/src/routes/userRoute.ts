import { Router, Request, Response } from "express";
import { UserController } from "../controllers/userControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const controller = new UserController();
function asyncHandler(fn: (req: Request, res: Response) => Promise<any>) {
    return (req: Request, res: Response, next: Function) => {
        fn(req, res).catch((err) => next(err));
    };
}

router.post("/signup", asyncHandler((req, res) => controller.signup(req, res)));
router.post("/signin", asyncHandler((req, res) => controller.signin(req, res)));
router.get("/me",authMiddleware,asyncHandler(async(req:Request,res:Response)=>{return res.json({userId:req.user.id})}))

export default router;
