import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter email"],
  },
  profile: {
    type: String,
  },
  number: {
    type: Number,
    required: [true, "Please Enter number"],
  },
  pin: {
    type: Number,
    required: [true, "Please Enter pin"],
  },
  password: {
    type: String,
    required: [true, "Please Enter password"],
  },
  address: {
    type: String,
    required: [true, "Please Enter address"],
  },
  landmark: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "Please Enter city"],
  },
  state: {
    type: String,
    required: [true, "Please Enter state"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

const User = mongoose.model("user", userSchema);

export default User;
