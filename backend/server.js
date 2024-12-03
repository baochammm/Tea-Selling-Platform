import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import teaRouter from "./routes/tea.route.js";
import userRouter from "./routes/user.route.js";
import "dotenv/config"


//app config
const app = express();
const port = ENV_VARS.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

//DB connection
connectDB();

//api endpoints
app.use("/api/tea", teaRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
}
);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})