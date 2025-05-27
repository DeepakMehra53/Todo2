import { Request,Response } from "express";
import * as TodoService from '../services/todo_services'


export class TodoController{
    static async create(req:Request,res:Response,){
        const response = await TodoService.createTodo(req.body)
        res.status(response.status).json(response.data);

    }
    static async getAll(req: Request, res: Response,) {
        const response = await TodoService.getTodos();
        res.status(response.status).json(response.data);
    }
    static async Updatetodo(req: Request, res: Response,) {

    }
}