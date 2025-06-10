import { Request, Response } from 'express';
import { TodoServices } from '../services/todoServices';
import { updateTodo, createTodo } from '../validators/fromValidators';
import { boolean, string } from "yargs";
import { error } from "console";
import { title } from "process";



export class TodoController {
    private todoServices = new TodoServices();

    async createTodo(req: Request, res: Response) {
        const parsed = createTodo.safeParse(req.body)
        if (!parsed.success) {
            res.status(400).json({ error: "Invalid input  " })
            return;

        }
        const { title, description, done } = parsed.data;
        const userId = parseInt((req as any).userId);
        if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID" })

        const todo = await this.todoServices.create(title, description, done || false, userId)
        return res.json({ id: todo.id })


    }

    async updateTodo(req: Request, res: Response) {
        const parsed = updateTodo.safeParse(req.body)
        if (!parsed.success) return res.status(400).json({ error: "Invalid input" })
        const { id,done=false,title,description} = parsed.data
        


        const todo = await this.todoServices.update(id, title, description, done)
        return res.json({id:todo.id})

    }

    async getTodos (req:Request,res:Response){
        const page=parseInt(req.query.page as string || '1')
        const limit =parseInt(req.query.limit as string || '10')
        const skip =    (page-1)*limit;
        const todos =await this.todoServices.list(skip,limit);
        return res.json({page,limit,data:todos});
    }
    async getTodoById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid todo ID' });

        const todo = await this.todoServices.get(id);
        return res.json({ todo });
    }


}

