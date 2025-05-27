import { Request,Response } from "express";
import * as UserService from '../services/user_services'

export class UserController {
    static async signup (req:Request,res:Response){
        const response = await UserService.signup(req.body)
        res.status(response.status).json(response.data)
    }

    static async signin(req: Request, res: Response) {
        const response = await UserService.signin(req.body);
        res.status(response.status).json(response.data);
    }

    static async me(req: Request, res: Response) {
        res.json({ msg: 'You are authenticated', userId: req.user?.userId });
    }

    

}