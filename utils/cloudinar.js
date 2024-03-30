import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CNAME,
//   api_key: process.env.CAPI_KEY,
//   api_secret: process.env.CAPI_SECRET,
// });

cloudinary.config({
  cloud_name: "dksavyi8e",
  api_key: "824169212213827",
  api_secret: "Tj1bPwm_ddnKt6lYRi5O2jNwu7g",
});
export const uplodeToCloudinary = async (url) => {
  try {
    console.log(url);
    if (!url) return null;

    const responce = await cloudinary.uploader.upload(url, {
      resource_type: "auto",
    });

    if (responce) {
      fs.unlinkSync(url);
    }
    return responce.secure_url;
  } catch (error) {
    fs.unlinkSync(url);

    return null;
  }
};
