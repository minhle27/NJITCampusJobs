import employerModel from "../models/Employer";
import { Response } from "express";
import { RequestWithUser } from "../types";

const employerController = {
  getEmployer: async (req: RequestWithUser, res: Response) => {
    const employer = await employerModel.findById(req.params.id);
    return res.status(200).json(employer);
  },
};

export default employerController;
