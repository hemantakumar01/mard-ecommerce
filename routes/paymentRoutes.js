import express from "express";
import { checkout, getKey, verify } from "../controller/paymentController.js";

const route = express.Router();

route.post("/instance", checkout);
route.post("/verify", verify);
route.get("/key", getKey);
export default route;
