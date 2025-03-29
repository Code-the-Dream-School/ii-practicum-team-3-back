import express from "express";
const app = express();
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
app.use(favicon(__dirname + "/public/favicon.ico"));

// routes
app.use("/api/v1", mainRouter);
app.use("/api/v1/auth", authRoutes);
module.exports = app;
