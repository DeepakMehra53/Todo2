import { NextFunction, Request,Response,Router } from "express";
import { TodoController } from "../controllers/todoControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const controller = new TodoController();
function asyncHandler(fn: (req: Request, res: Response) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res).catch(next);
    };
}
router.use(authMiddleware); 

router.post("/todo",asyncHandler((req,res)=>controller.createTodo(req,res)))
router.put("/uptodo",asyncHandler((req,res)=>controller.updateTodo(req,res)))
router.get("/:id",asyncHandler((req,res)=>controller.getTodoById(req,res)))
router.get("/todos",asyncHandler((req,res)=>controller.getTodos(req,res)))

export default router;