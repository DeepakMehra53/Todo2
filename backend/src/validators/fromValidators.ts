import z from "zod"

export const signupSchema = z.object({
    email:z.string().email(),
    password:z.string().min(3),
    username:z.string()
})

export const signinSchema =z.object({
    email:z.string().email(),
    password:z.string()
})


export const createTodo= z.object({
    title:z.string().min(1,"Title is required"),
    description:z.string().min(1,"Description is required"),
    done:z.boolean().optional()
})

export const updateTodo = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    done: z.boolean()
})

export type UpdateTodo = z.infer<typeof updateTodo>
export type CreateTodo =z.infer<typeof createTodo>
export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;