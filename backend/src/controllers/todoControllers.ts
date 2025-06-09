import { Request,Response } from "express";
import { TodoServices } from '../services/todoServices';
import { updateTodo, createTodo } from '../validators/fromValidators';
import { boolean } from "yargs";
import { error } from "console";
import { title } from "process";



export class TodoController{
    private todoServices = new TodoServices();

    async  createTodo  (req:Request,res:Response){
        const parsed=createTodo.safeParse(req.body)
        if(!parsed.success){res.status(400).json({error:"Invalid input  "})}
        const { title, description,  } = parsed.data!;
        const done:boolean =parsed.data!.done ?? false  
        const userId =(req as any).userId;
        const todo = await this.todoServices.create(
            title,
            description,
            done,
            userId

        )
        return res.json({id:todo.id})
    }
}

