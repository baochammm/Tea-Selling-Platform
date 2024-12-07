import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { ENV_VARS } from "../config/envVars.js";
import Stripe from "stripe";

const stripe = new Stripe(ENV_VARS.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const { userId, items, amount, address } = req.body;

    // Validate request body
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // console.log("Line items:", line_items); // Log the line items

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?cancel=true&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error!",
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: "true" });
      res.json({ success: true, message: "Order paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error!",
    });
  }
};
export { placeOrder, verifyOrder };
