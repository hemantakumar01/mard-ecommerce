import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { dbConnection } from "./utils/dbConnection.js";
import Razorpay from "razorpay";
import cors from "cors";

const app = express();

dotenv.config();
export const razorpay = new Razorpay({
  key_id: process.env.RPKEY_ID,
  key_secret: process.env.RPKEY_SECRET,
});
app.use(express.json({ limit: "5mb" }));
app.use(cors({}));
app.get("/", (req, res, next) => {
  res.status(200).send({
    success: true,
    message: "Hellow world",
  });
});
// All Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
dbConnection();

// error middleware
app.use((err, req, res, next) => {
  err.message = err.message || "Internal server Error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send({
    success: false,
    message: err.message,
  });
});
app.listen(process.env.PORT, () => {
  console.log(`server is connected on http://localhost:${process.env.PORT}`);
});
