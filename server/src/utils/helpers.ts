import config from "../utils/config";

export const uploadCloudinary = async (
  dataURI: string | undefined,
  what: string
) => {
  if (!dataURI || dataURI.length <= 0) {
    if (what === "profilePicture") {
      return {
        fileUrl:
          "https://res.cloudinary.com/ddjybuw16/image/upload/v1707930194/Test/blankProfile.png",
        cloudinaryId: "Test/blankProfile.png",
        isDefault: true,
      };
    }
    return { fileUrl: "", cloudinaryId: "", isDefault: true };
  }
  const result = await config.cloudinary.uploader.upload(dataURI, {
    upload_preset: "user_assets",
  });
  return {
    fileUrl: result.secure_url,
    cloudinaryId: result.public_id,
    isDefault: false,
  };
};
