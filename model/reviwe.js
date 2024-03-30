import mongoose, { Schema } from "mongoose";
const schema = new mongoose.schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, "enter Id"],
  },
  userDetail: {
    name: String,
    message: String,
  },
});

const Reviwe = mongoose.model("reviwe", schema);

export default Reviwe;
