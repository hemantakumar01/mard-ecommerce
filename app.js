import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { dbConnection } from "./utils/dbConnection.js";
import Razorpay from "razorpay";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __joinPath = join(__dirname + "/client/build");
const filePath = join(__dirname + "/client/build/index.html");

const app = express();

dotenv.config();
export const razorpay = new Razorpay({
  key_id: process.env.RPKEY_ID,
  key_secret: process.env.RPKEY_SECRET,
});
app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://192.168.169.107:3000",
      process.env.CORS_URL,
      "http://localhost:3000",
      "https://hemantapaswan.site",
      "https://mard-ecommerce.onrender.com",
    ],
  })
);

app.use(express.static(__joinPath));

// All Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
app.get("*", (req, res) => {
  try {
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});
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
