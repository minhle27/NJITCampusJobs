import config from "./config";

const generatePresignedUrl = (
  accountType: string,
  userId: string,
  fileType: string,
  folder: string,
  publicId: string | null = null
) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const finalFolder =
    accountType === "student"
      ? `students/${userId}/${folder}`
      : `employers/${userId}/${folder}`;
  const finalPublicId = publicId || fileType;

  const paramsToSign = {
    timestamp: timestamp,
    folder: finalFolder,
    public_id: finalPublicId,
  };

  const signature = config.cloudinary.utils.api_sign_request(
    paramsToSign,
    config.cloudinary.config().api_secret!
  );

  return {
    url: `https://api.cloudinary.com/v1_1/${
      config.cloudinary.config().cloud_name
    }/auto/upload`,
    params: {
      timestamp: timestamp,
      folder: finalFolder,
      public_id: finalPublicId,
      api_key: config.cloudinary.config().api_key,
      signature
    },
  };
};

export default generatePresignedUrl;
