import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter name"],
  },
  number: {
    type: Number,
    required: [true, "enter name"],
  },
});

const defaultModel = mongoose.model("reviwe", schema);
export default defaultModel;
