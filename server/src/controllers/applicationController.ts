import applicationModel from "../models/Application";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import fieldValidate from "../utils/fieldValidate";

const applicationController = {
  getStudentApplications: async (req: AuthenticatedRequest, res: Response) => {
    const applications = await applicationModel.find({
      student: req.params.id,
    });
    return res.status(200).json(applications);
  },

  updateApplicationStatus: async (req: AuthenticatedRequest, res: Response) => {
    const newStatus = fieldValidate.processNewStatus(req.body);

    await applicationModel.updateOne(
      { _id: req.params.id }, 
      { $set: { status: newStatus } } 
    );

    return res.status(200).json("Application has been updated");
  },

};

export default applicationController;
