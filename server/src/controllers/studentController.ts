import studentModel from "../models/Student";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { Response } from "express";

const studentController = {
  getStudent: async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const student = await studentModel.findById(req.params.id);
    console.log(req.params.id);
    if (!student) return res.status(404).json({ error: "student not found" });
    return res.status(200).json(student);
  },
};

export default studentController;