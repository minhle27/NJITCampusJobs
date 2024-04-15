import applicationModel from "../models/Application";
import { Response } from "express";
import fieldValidate from "../utils/fieldValidate";
import { RequestWithUser } from "../types";

const applicationController = {
  getStudentApplications: async (req: RequestWithUser, res: Response) => {
    const applications = await applicationModel
      .find({
        student: req.params.id,
      })
      .populate({
        path: "student job",
      });
    return res.status(200).json(applications);
  },

  getApplicationsByPost: async (req: RequestWithUser, res: Response) => {
    const applications = await applicationModel
      .find({
        job: req.params.id,
      })
      .populate({
        path: "student job",
      });
    return res.status(200).json(applications);
  },

  updateApplicationStatus: async (req: RequestWithUser, res: Response) => {
    const newStatus = fieldValidate.processNewStatus(req.body);
    await applicationModel.updateOne(
      { _id: req.params.id },
      { $set: { status: newStatus.status } }
    );

    return res.status(200).json("Application has been updated");
  },

  withdrawApplication: async (req: RequestWithUser, res: Response) => {
    await applicationModel.findByIdAndDelete(req.params.id);
    return res.status(204).end();
  },
    
};

export default applicationController;
