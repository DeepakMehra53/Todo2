import express from "express";
import cors from "cors";
import { AuthController } from "./src/controllers/authController";
const authController = new AuthController()
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/signup", authController.signup.bind);
app.post("/api/v1/signin", authController.signin.bind);



export default app;
