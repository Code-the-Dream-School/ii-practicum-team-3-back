import express from "express";
const app = express();
import cors from "cors";

import logger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import xss from "xss-clean";
import authRoutes from "./routes/authRouter.js";

// middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);


app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.static("public"));

// routes
app.use("/api/v1/auth", authRoutes);

export default app;
