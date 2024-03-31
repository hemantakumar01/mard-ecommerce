import { razorpay } from "../app.js";
import { tryAsync } from "../utils/tryAsync.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      receipt: "sdfdfdfdfdf",
    };
    const response = await razorpay.orders.create(options);
    res.status(200).send({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verify = tryAsync(async (req, res) => {
  res.status(200).send({ success: "true" });
});

export const getKey = tryAsync(async (req, res) => {
  res.status(200).send({ key: process.env.RPKEY_ID });
});
