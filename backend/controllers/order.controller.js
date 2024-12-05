import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { ENV_VARS } from "../config/envVars.js";
import Stripe from "stripe";

const stripe = new Stripe(ENV_VARS.STRIPE_SECRET_KEY);
//placing user order from frontend
export async function placeOrder(req, res) {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: red.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 23000,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "vnd",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 23000,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
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
}
