import { router } from "./router";
import express, { type Application } from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

export const app: Application = express();
app.use(cors())
app.use(express.json());
router(app);

export default app;