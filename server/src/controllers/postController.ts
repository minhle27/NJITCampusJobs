import employerModel from "../models/Employer";
import jobModel from "../models/Job";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import fieldValidate from "../utils/fieldValidate";
import studentModel from "../models/Student";

const postController = {
  getAllPostsFromAnEmployer: async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const employer = await employerModel.findById(req.params.id).populate({
      path: "jobPosts",
      populate: {
        path: "applicants",
        populate: {
          path: "accepted rejected pending",
          populate: {
            path: "student",
            select: "fullName profilePicture",
          },
        },
      },
    });
    if (!employer) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json(employer?.jobPosts);
  },

  updateAPost: async (req: AuthenticatedRequest, res: Response) => {
    const newPost = fieldValidate.processNewPost(req.body);
    const post = await jobModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    await post.updateOne({ $set: newPost });
    return res.status(200).json("Post has been updated");
  },

  updateApplicantStatus: async (req: AuthenticatedRequest, res: Response) => {
    const application = fieldValidate.processNewStatus(req.body);
    const post = await jobModel.findById(req.params.id);
    const student = await studentModel.findById(application.studentId);

    if (!post || !student) {
      return res.status(404).json({ error: "Post or Student Not Found" });
    }

    const newApplication = {
      student: student._id,
      resumeUrl: application.resumeUrl,
    };

    if (!application.oldStatus) {
      await post.updateOne({ $push: { "applicants.pending": newApplication } });
      await student.updateOne({
        $push: { "appliedJobs.pending": post._id },
      });
    } else {
      await post.updateOne({
        $pull: {
          [`applicants.${application.oldStatus}`]: {
            student: application.studentId,
          },
        },
      });
      await post.updateOne({
        $push: {
          [`applicants.${application.newStatus}`]: newApplication,
        },
      });
      await student.updateOne({
        $push: { [`appliedJobs.${application.newStatus}`]: post._id },
      });
      await student.updateOne({
        $pull: { [`appliedJobs.${application.oldStatus}`]: post._id },
      });
    }

    return res.status(200).json("Application has been updated");
  },

  createNewPost: async (req: AuthenticatedRequest, res: Response) => {
    const job = fieldValidate.processNewPost(req.body);
    const { title, externalApplication, jobDescription, location, salary } =
      job;

    const user = await employerModel.findById(req.user);
    if (!user) return res.status(404).json({ error: "User Not Found" });
    const newJob = new jobModel({
      employer: user._id,
      title,
      externalApplication,
      jobDescription,
      location,
      salary,
    });

    const savedJob = await newJob.save();
    user.jobPosts = user.jobPosts.concat(savedJob._id);
    await user.save();
    return res.status(200).json(savedJob);
  },
};

export default postController;
