import studentModel from "../models/Student";
import employerModel from "../models/Employer";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { Response } from "express";

const userController = {
  getUserById: async (req: AuthenticatedRequest, res: Response) => {
    const employer = await employerModel.findById(req.params.id);
    if (employer) return res.status(200).json(employer);
    const student = await studentModel.findById(req.params.id);
    if (student) return res.status(200).json(student);
    return res.status(404).json({ error: "user not found" });
  },
};

export default userController;
