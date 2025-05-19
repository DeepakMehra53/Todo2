"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../validators/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret234aa@r24";
//@ts-ignore
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parse = auth_1.signupSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.errors });
    const { username, password, email } = parse.data;
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ msg: "User already exists" });
        const hashed = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({ data: { username, email, password: hashed } });
        return res.status(200).json({ msg: "User  created", user: user.id });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
//@ts-ignore
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parse = auth_1.signinSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.errors });
    const { email, password } = parse.data;
    try {
        const user = yield prisma.user.findFirst({ where: { email } });
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" });
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1hr' });
        res.json({ msg: "Signed In", token });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
