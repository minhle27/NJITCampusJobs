import employerModel from "../models/Employer";
import { Response } from "express";
import { RequestWithUser } from "../types";
import fieldValidate from "../utils/fieldValidate";

const employerController = {
  getEmployer: async (req: RequestWithUser, res: Response) => {
    const employer = await employerModel.findById(req.params.id);
    return res.status(200).json(employer);
  },

  updateEmployerProfile: async (req: RequestWithUser, res: Response) => {
    const newEmployerInformation = fieldValidate.processNewEmployerInformation(req.body);

    const updatedEmployer = await employerModel.findByIdAndUpdate(
      req.params.id,
      newEmployerInformation,
      { new: true }
    );

    if (!updatedEmployer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    return res.status(200).json(updatedEmployer);
  },
};

export default employerController;
