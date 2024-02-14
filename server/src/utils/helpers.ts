import config from "../utils/config";

export const uploadCloudinary = async (dataURI: string | undefined) => {
  if (!dataURI || dataURI.length <= 0) {
    return { fileUrl: "", cloudinaryId: "" };
  }
  const result = await config.cloudinary.uploader.upload(dataURI, {
    upload_preset: "user_assets",
  });
  return {
    fileUrl: result.secure_url,
    cloudinaryId: result.public_id,
  };
};

