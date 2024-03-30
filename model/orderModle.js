import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    orders: [
      {
        id: String,
        title: String,
        price: Number,
        quantity: Number,
        thumbnail: String,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    shipping: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "processing",
      enum: ["processing", "shipped", "delivered"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Enter User ID"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", schema);
export default orderModel;
