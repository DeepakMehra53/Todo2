import {prisma } from "../models/userModels"
import bcrypt from "bcrypt"
import jwt from  "jsonwebtoken"
import { signUpSchema, signInSchema } from '../validators/fromValidators';
import { JWT_SECRET } from "../config/default"

export class UserService {
    async signup(data:signUpSchema){
        const hashed = await bcrypt.hash(data.password ,10)
        
    }
}