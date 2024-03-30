import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
} from "../controller/productContrller.js";
import upload from "../middleware/multerDiskStorage.js";

const routes = express.Router();

routes.post("/new", upload.array("img[]"), createProduct);
routes.get("/all", getAllProduct);
routes
  .route("/:id")
  .get(singleProduct)
  .delete(deleteProduct)
  .put(updateProduct);

export default routes;
