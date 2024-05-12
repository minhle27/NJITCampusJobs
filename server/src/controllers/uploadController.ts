import { Response } from "express";
import { RequestWithUser } from "../types";
import fieldValidate from "../utils/fieldValidate";
import { uploadCloudinary } from "../utils/helpers";

const uploadController = async (req: RequestWithUser, res: Response) => {
  const { dataURI } = fieldValidate.processFileUpload(req.body);
  const uploadedFile = await uploadCloudinary(dataURI, "resume");
  return res.status(200).json(uploadedFile);
};

export default uploadController;
