import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  MONGODB_URI,
  TEST_MONGODB_URI,
  PORT,
  SECRET,
  cloudinary: cloudinary.v2,
};
