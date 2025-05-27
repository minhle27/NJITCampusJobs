/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Response } from "express";
import applicationModel from "../models/Application";
import studentModel from "../models/Student";
import { RequestWithUser } from "../types";
import { extractPaginationQueryParams } from "../utils/extractPaginationQuery";
import fieldValidate from "../utils/fieldValidate";
import { offsetPaginate } from "../utils/offsetPaginate";

const applicationController = {
  getStudentApplications: async (req: RequestWithUser, res: Response) => {
    const studentId = req.params.studentId;
    const { page, limit, otherParams } = extractPaginationQueryParams(
      req.query
    );

    let filter: { [key: string]: unknown } = { student: studentId };
    if (otherParams.search) {
      filter = { title: { $regex: otherParams.search, $options: "i" } };
    }

    if (otherParams.status && otherParams.status !== 'all') {
      filter = { ...filter, status: otherParams.status };
    }

    const result = await offsetPaginate(applicationModel, filter, page, limit);
    const populatedResult = await applicationModel.populate(result.data, {
      path: "student job",
    });
    return res.status(200).json({ ...result, data: populatedResult });
  },

  getApplicationsByPost: async (req: RequestWithUser, res: Response) => {
    const jobId = req.params.jobId;
    const { page, limit, otherParams } = extractPaginationQueryParams(
      req.query
    );

    let filter: { [key: string]: unknown } = { job: jobId };

    if (otherParams.status !== 'all') {
      filter = { ...filter, ...otherParams };
    } else {
      delete otherParams.status;
      filter = { ...filter, ...otherParams };
    }

    console.log(filter);

    const result = await offsetPaginate(applicationModel, filter, page, limit);
    const populatedResult = await applicationModel.populate(result.data, {
      path: "student",
      select: "classYear email fullName phone major gpa degree profilePicture",
    });

    return res.status(200).json({ ...result, data: populatedResult });
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

  createNewApplication: async (req: RequestWithUser, res: Response) => {
    const application = fieldValidate.processNewApplication(req.body);
    const { resumeUrl, job, status } = application;

    const user = await studentModel.findById(req.user!._id);
    if (!user) return res.status(404).json({ error: "User Not Found" });
    const newApplication = new applicationModel({
      student: user._id,
      resumeUrl,
      job,
      status,
    });

    const savedApplication = await newApplication.save();
    await user.save();
    return res.status(201).json(savedApplication);
  },
};

export default applicationController;
