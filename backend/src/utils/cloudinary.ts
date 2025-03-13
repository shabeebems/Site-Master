import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const CloudinaryV2 = cloudinary.v2;

CloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default CloudinaryV2;