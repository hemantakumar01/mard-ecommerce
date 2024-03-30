import Product from "../model/productModle.js";

export const reduceStock = async (orders) => {
  try {
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const product = await Product.findById(order.id);
      if (product) {
        product.stock -= order.quantity;
        await product.save();
      } else throw new Error("Product Not Found");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
