import { Request,Response } from "express";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { signupSchema,signinSchema, SignupInput } from "../validators/fromValidators";
import { UserService } from '../services/userServices';
import { JWT_SECRET } from '../config/default';


export class UserController{
    private userService = new UserService()

    async signup (req:Request,res:Response){
        const result = signupSchema.safeParse(req.body)
        if(!result.success){
            res.status(400).json({message:"Invalid input"})
            return
        }
        const {email,password,username}:SignupInput= result.data;   
        const existingUser =await this.userService.findByEmail(email)
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await this.userService.createUser(email, hashed, username);
        const token = sign({ id: user.id }, JWT_SECRET);
        return res.json({ jwt: token });
    }
    async signin(req: Request, res: Response) {
        const result = signinSchema.safeParse(req.body);
        if (!result.success) return res.status(400).json({ message: "Invalid input" });

        const { email, password } = result.data;
        const user = await this.userService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ message: "Invalid email or password" });

        const token = sign({ id: user.id }, JWT_SECRET);
        return res.json({ jwt: token });
      }
}