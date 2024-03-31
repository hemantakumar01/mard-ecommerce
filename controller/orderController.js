import orderModel from "../model/orderModle.js";
import { tryAsync } from "../utils/tryAsync.js";
import { CError } from "../utils/custumError.js";
import { reduceStock } from "../utils/utils.js";

export const createOrder = tryAsync(async (req, res) => {
  const { orders, total, shipping, userId } = req.body;
  const order = await orderModel.create({ orders, total, shipping, userId });
  if (order) {
    await reduceStock(order.orders);
    res.status(200).send({
      success: true,
      message: "Order Created",
    });
  }
});

export const getUserOrders = tryAsync(async (req, res) => {
  const { id } = req.params;

  const orders = await orderModel.find({ userId: id }).sort({ createdAt: -1 });
  res.status(200).send({
    success: true,
    orders,
  });
});

export const singleOrder = tryAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new CError("Please Enter Id"));
  const order = await orderModel.findById(id);
  if (order) {
    res.status(200).send({
      success: true,
      order,
    });
  } else {
    next(new CError("User Not Found"));
  }
});

export const allOrders = tryAsync(async (req, res) => {
  const orders = await orderModel.find({}).sort({ createdAt: -1 });
  res.status(200).send({
    success: true,
    orders,
  });
});

export const updateStatus = tryAsync(async (req, res) => {
  const id = req.params.id;
  const order = await orderModel.findById(id);
  if (!order) return next(new CError("Order not found"));

  if (order.status === "processing") {
    order.status = "shipped";
  }
  if (order.status === "shipped") {
    order.status = "delivered";
  }
  await order.save();

  res.status(200).send({
    success: true,
    message: order.status,
  });
});
