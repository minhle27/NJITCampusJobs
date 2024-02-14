import bcrypt from "bcrypt";
import fieldValidate from "../utils/fieldValidate";
import studentModel from "../models/Student";
import employerModel from "../models/Employer";
import { Request, Response } from "express";
import { uploadCloudinary } from "../utils/helpers";
import config from "../utils/config";
import jwt from "jsonwebtoken";

const authController = {
  register: async (req: Request, res: Response) => {
    const user = fieldValidate.processNewUser(req.body);
    const {
      password,
      email,
      fullName,
      phone,
      profileDescription,
      profilePicture,
      accountType,
    } = user;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    switch (accountType) {
      case "student": {
        const { classYear, degree, major, resume, transcript } = user;
        const existedUser = await studentModel.findOne({ email });
        if (existedUser)
          return res.status(409).json({ error: "Email is taken " });

        const newStudent = new studentModel({
          password: passwordHash,
          email,
          fullName,
          phone,
          profileDescription,
          profilePicture: uploadCloudinary(profilePicture),
          accountType,
          classYear,
          degree,
          resume: uploadCloudinary(resume),
          transcript: uploadCloudinary(transcript),
          major,
        });
        const savedStudent = await newStudent.save();
        return res.status(200).json(savedStudent);
      }
      case "employer": {
        const { department } = user;
        const existedUser = await employerModel.findOne({ email });
        if (existedUser)
          return res.status(409).json({ error: "Email is taken " });

        const newEmployer = new employerModel({
          password: passwordHash,
          email,
          fullName,
          phone,
          profileDescription,
          profilePicture: uploadCloudinary(profilePicture),
          accountType,
          department,
        });

        const savedEmployer = await newEmployer.save();
        return res.status(200).json(savedEmployer);
      }
      default:
        return res
          .status(500)
          .json({ error: "User Type is missing or invalid" });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password, accountType } = fieldValidate.processLoginInfo(
      req.body
    );
    let user;
    switch (accountType) {
      case "Student": {
        user = await studentModel.findOne({ email });
        break;
      }
      case "Employer": {
        user = await employerModel.findOne({ email });
        break;
      }
      default:
        return res
          .status(500)
          .json({ error: "User Type is missing or invalid" });
    }
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET as string);
    return res.status(200).send({ token, user });
  },
};

export default authController;
