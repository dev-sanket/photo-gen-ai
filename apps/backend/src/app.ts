import express from "express";
import userRoutes from "./routes/user.routes";
import { responseHandler, finalResponseHandler } from "./middlewares";

const app = express();

app.use(express.json()); // Parse JSON bodies

app.use(responseHandler); // Attach response helper

app.use("/api/users", userRoutes); // User Routes

app.use(finalResponseHandler); // Global response handler

export default app;