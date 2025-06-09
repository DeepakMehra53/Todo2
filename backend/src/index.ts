import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRoutes);

export default app; 