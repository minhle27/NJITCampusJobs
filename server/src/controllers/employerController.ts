import employerModel from "../models/Employer";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { Response } from "express";

const employerController = {
  getEmployer: async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const employer = await employerModel.findById(req.params.id).lean();
    return res.status(200).json(employer);
  },
};

export default employerController;