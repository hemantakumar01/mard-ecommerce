import express from "express";
import {
  allOrders,
  createOrder,
  getUserOrders,
  singleOrder,
  updateStatus,
} from "../controller/orderController.js";
const app = express.Router();

app.post("/new", createOrder);
app.get("/my/:id", singleOrder);
app.get("/all", allOrders);
app.put("/:id", updateStatus);
app.get("/:id", getUserOrders);

export default app;
