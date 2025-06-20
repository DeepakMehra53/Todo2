import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignUpSchema, SignInSchema } from "../validators/fromValidators";
import { signToken } from "../utils/jwt";

export class AuthController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
        this.signup=    this.signup.bind(this)
        this.signin=    this.signin.bind(this)
    }

    public signup = async (req: Request, res: Response): Promise<Response> => {
        const result = SignUpSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.flatten().fieldErrors });
        }

        const { name, email, password } = result.data;
        const hashed = await bcrypt.hash(password, 10);

        try {
            const user = await this.prisma.user.create({ data: { name, email, password: hashed } });
            const token = signToken({ id: user.id, email: user.email });
            return res.status(201).json({ jwt: token });
        } catch (error) {
            return res.status(500).json({ message: "Signup failed" });
        }
    };

    public signin = async (req: Request, res: Response): Promise<Response> => {
        const result = SignInSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.flatten().fieldErrors });
        }

        const { email, password } = result.data;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = signToken({ id: user.id, email: user.email });
        return res.json({ jwt: token });
    };
}
