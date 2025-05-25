import { Response } from "express";
import { RequestWithUser } from "../types";
import generatePresignedUrl from "../utils/generatePresignedUrl";

const signedUrlController = (req: RequestWithUser, res: Response) => {
  const userId = req.query.userId as string;
  const fileType = req.query.fileType as string;
  const accountType = req.query.accountType as string;

  if (!accountType || !userId || !fileType) {
    return res.status(400).json({ error: 'userId and fileType and accountType are required' });
  }

  let folder, publicId;

  switch (fileType) {
    case 'profile_picture':
      folder = 'profile';  
      publicId = `picture_${Math.round(Date.now() / 1000)}`; 
      break;

    case 'resume':
      folder = 'resumes';   
      publicId = `resume_${Math.round(Date.now() / 1000)}`;  
      break;

    default:
      return res.status(400).json({ error: 'Unsupported file type' });
  }

  const result = generatePresignedUrl(accountType, userId, fileType, folder, publicId);

  return res.json(result);
};

export default signedUrlController;
