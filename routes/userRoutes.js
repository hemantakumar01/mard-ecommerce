import express from "express";
import {
  createNewUser,
  getAllUser,
  getSingleUser,
  getSingleUserWithToken,
  loginUser,
} from "../controller/userController.js";
import upload from "../middleware/multerDiskStorage.js";
const route = express.Router();

route.post("/new", upload.single("img"), createNewUser);
route.post("/login", loginUser);
route.get("/all", getAllUser);
route.get("/get-user", getSingleUserWithToken);
route.get("/:id", getSingleUser);

export default route;
