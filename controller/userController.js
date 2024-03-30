import User from "../model/userSchema.js";

import { uplodeToCloudinary } from "../utils/cloudinar.js";
import { CError } from "../utils/custumError.js";
import bcrypt from "bcrypt";
import { responce } from "../utils/responce.js";
import jwt from "jsonwebtoken";
import { tryAsync } from "../utils/TryAsync.js";
export const createNewUser = tryAsync(async (req, res, next) => {
  // const filepath = await uplodeToCloudinary(req.file.path);

  const { name, email, number, password, address, landMark, city, state, pin } =
    req.body;

  if (
    (!name,
    !email,
    !number,
    !password,
    !address,
    !landMark,
    !city,
    !state,
    !pin)
  )
    return res.status(400).send({
      success: false,
      message: "Enter All Fields",
    });

  const user = await User.findOne({ email });
  if (user) return next(new CError("User Exists"));
  const imgeUrl = await uplodeToCloudinary(req.file.path);
  const hasedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    number,
    password: hasedPassword,
    address,
    landMark,
    city,
    state,
    pin,
    profile: imgeUrl,
  });

  res.status(200).send({
    success: true,
    message: "User Created",
  });
});

export const getSingleUser = tryAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new CError("User Not Found", 400));
  }
  res.status(200).send({
    success: true,
    user,
  });
});
export const getAllUser = tryAsync(async (req, res) => {
  const users = await User.find({});
  res.status(200).send({
    success: true,
    users,
  });
});

export const loginUser = tryAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) return next(new CError("Enter All Fields"));
  let user = await User.findOne({ email });
  if (!user) return next(new CError("User not found"));
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) return next(new CError("Invalide Email and Password"));
  const token = jwt.sign({ _id: user._id }, "ujhujjhiuh", {
    expiresIn: "30 days",
  });

  responce(res, 201, `Welcome again ${user.name}`, true, { token, user });
});

export const getSingleUserWithToken = tryAsync(async (req, res, next) => {
  const token = req.headers.token;
  const tkn = jwt.verify(token, "ujhujjhiuh");

  const id = tkn._id;
  const user = await User.findById(id);
  if (!user) {
    return next(new CError("User Not Found", 400));
  }
  res.status(200).send({
    success: true,
    user,
  });
});
