import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter Title"],
  },
  description: {
    type: String,
    required: [true, "Enter description"],
  },
  longDes: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Enter number"],
  },
  stock: {
    type: Number,
    required: [true, "Enter Stock"],
  },
  img: { type: Array, required: [true, "Please Enter Images"] },
});

const Product = mongoose.model("product", schema);

export default Product;
