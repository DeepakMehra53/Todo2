import { todoSchema } from "../validators/todoValidation";
import { todoService } from "../services/todoService";

export const todoControllers = {
    async create(reqBody:any,userId:number){
        const parsed = todoSchema.safeParse(reqBody)
        
        if (!parsed.success) {
            return { status: 400, body: { message: "Invalid data" } };
        }        const todo = await  todoService.createTodo(userId,parsed.data)
        return {status:201,body:todo}
    },
    async get(userId: number) {
        const todos = await todoService.getTodos(userId);
        return { status: 200, body: todos };
    },

    async update(id: number, userId: number, reqBody: any) {
        const parsed = todoSchema.safeParse(reqBody);
        if (!parsed.success) return { status: 400, body: { message: "Invalid data" } };
        await todoService.updateTodo(id, userId, parsed.data);
        return { status: 200, body: { message: "Todo updated" } };
    },

    async delete(id: number, userId: number) {
        await todoService.deleteTodo(id, userId);
        return { status: 200, body: { message: "Todo deleted" } };
    },
}