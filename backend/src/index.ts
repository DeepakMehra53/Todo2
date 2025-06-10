import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute";
import todoRoute from "./routes/todoRoute"; // correct relative path

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use('/api/v1/user/',todoRoute)

export default app; 