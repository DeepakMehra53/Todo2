import type { Request, Response } from "express";
import { UserService } from "../service/userService";
import { signInSchema, signUpSchema } from "../validators/fromValidators";


const userService = new UserService();

export const signup = async (req: Request, res: Response) => {
    try {
        const parsed = signUpSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.message });
        }
        const { email, password, name } = parsed.data;
        const user = await userService.signup(email, password, name)
        res.status(201).json(user)
    } catch (error: any) {
        res.status(400).json({ message: error.message });

    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const parsed = signInSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.message })
        }
        const { email, password } = parsed.data;
        const response = await userService.signin(email, password);
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}