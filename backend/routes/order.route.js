import express from "express";
// import authMiddleware from "../middleware/auth.js";
import { placeOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();
//chua co middleware nha
orderRouter.post("/place", placeOrder);

export default orderRouter;
