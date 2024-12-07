import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(express.static("public"));

import { connectDB } from "./DB/connectDB.js";
import Routers from "./Routes/index.routes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

app.use("/api/v1", Routers);
app.use(errorMiddleware);

connectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server is running on", PORT);
    })
  )
  .catch((err) => console.log("error in mongoDB connection", err));
