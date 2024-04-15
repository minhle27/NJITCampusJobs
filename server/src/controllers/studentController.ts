import studentModel from "../models/Student";
import { Response } from "express";
import { RequestWithUser } from "../types";

const studentController = {
  getStudent: async (
    req: RequestWithUser,
    res: Response
  ) => {
    const student = await studentModel.findById(req.params.id);
    console.log(req.params.id);
    if (!student) return res.status(404).json({ error: "student not found" });
    return res.status(200).json(student);
  },
};

export default studentController;