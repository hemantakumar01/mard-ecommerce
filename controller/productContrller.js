import Product from "../model/productModle.js";
import { tryAsync } from "../utils/TryAsync.js";
import { uplodeToCloudinary } from "../utils/cloudinar.js";
import { CError } from "../utils/custumError.js";
import { responce } from "../utils/responce.js";

export const createProduct = tryAsync(async (req, res, next) => {
  const { title, description, longDes, price, stock } = req.body;
  const files = req.files;
  console.log("Files are", files);

  const path = files.map((e) => e.path);

  const uploadedImages = [];

  for (const url of path) {
    try {
      const response = await uplodeToCloudinary(url);
      uploadedImages.push(response);
    } catch (error) {
      console.error("Error uploading image:", url, error);
    }
  }

  if ((!title, !description, !price, !stock, !files)) {
    return next(new CError("Enter All Fields"));
  }
  await Product.create({
    title,
    description,
    longDes,
    price,
    stock,
    img: uploadedImages,
  });
  return res.status(201).send({
    message: "User Created",
    success: true,
  });
});
export const getAllProduct = tryAsync(async (req, res, next) => {
  const { name, sort } = req.query;

  const filter = {};

  if (name !== undefined) {
    filter.title = {
      $regex: name,
      $options: "i",
    };
  }

  const limit = Number(req.query.limit) || 50;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const totalProducts = await Product.find({});
  const products = await Product.find(filter)
    .limit(limit)
    .skip(skip)
    .sort(
      sort !== undefined && {
        price: sort === "asc" ? 1 : sort === "dec" ? -1 : 1,
      }
    );

  if (products.length === 0) {
    responce(res, 200, "Success", true, totalProducts, {
      limit,
      totalProducts: totalProducts.length,
    });
  } else {
    responce(res, 200, "Success", true, products, {
      limit,
      totalProducts: totalProducts.length,
    });
  }
});

export const singleProduct = tryAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new CError("Provide Product Id"));
  const product = await Product.findById(id);
  if (!product) return next(new CError("Product Not Found"));
  responce(res, 200, "", true, product);
});
export const deleteProduct = tryAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new CError("Provide Product Id"));
  await Product.findByIdAndDelete({ _id: id });
  responce(res, 200, "Deleted Product", true);
});

export const updateProduct = tryAsync(async (req, res, next) => {
  // const { id } = req.params;

  // if (!id) return next(new CError("Provide Product Id"));
  // const product = await Product.findById(id);
  // if (!product) return next(new CError("Product Not Found"));

  // Extract product ID from request params
  const { id } = req.params;

  // Create a filtered update object to avoid overwriting unnecessary fields
  const allowedUpdates = [
    "title",
    "description",
    "longDes",
    "price",
    "stock",
    "img",
  ];

  const update = Object.keys(req.body)
    .filter((key) => allowedUpdates.includes(key))
    .reduce((acc, key) => {
      acc[key] = req.body[key];
      return acc;
    }, {});

  // Perform update using findOneAndUpdate with options for validation and middleware
  const updatedProduct = await Product.findOneAndUpdate({ _id: id }, update, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(updatedProduct);
});

export const sample = tryAsync(async (req, res, next) => {});
