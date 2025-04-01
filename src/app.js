import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from "cors";
import favicon from "express-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRouter.js";
import mainRouter from "./routes/mainRouter.js";

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "../public/favicon.ico")));

// routes
app.use("/api/v1", mainRouter);
app.use("/api/v1/auth", authRoutes);
export default app;
