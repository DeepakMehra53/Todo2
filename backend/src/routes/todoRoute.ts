import { NextFunction, Request,Response,Router } from "express";
import { TodoController } from "../controllers/todoControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../types/express"; // Make sure this file exists

const router = Router();
const controller = new TodoController();
function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}
router.use(authMiddleware); 

router.post("/todo",asyncHandler((req,res,next:NextFunction)=>controller.createTodo(req,res)))
router.put("/uptodo",asyncHandler((req,res,next:NextFunction)=>controller.updateTodo(req,res)))
router.get("/:id",asyncHandler((req,res,next:NextFunction)=>controller.getTodoById(req,res)))
router.get("/todos",asyncHandler((req,res,next:NextFunction)=>controller.getTodos(req,res)))

export default router;