import employerModel from "../models/Employer";
import jobModel from "../models/Job";
import { Response } from "express";
import fieldValidate from "../utils/fieldValidate";
import studentModel from "../models/Student";
import applicationModel from "../models/Application";
import { RequestWithUser } from "../types";
import { offsetPaginate } from "../utils/offsetPaginate";
import { extractPaginationQueryParams } from "../utils/extractPaginationQuery";

const postController = {
  getAllPostsFromAnEmployer: async (req: RequestWithUser, res: Response) => {
    const employerId = req.params.id;

    const employer = await employerModel.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ error: "Employer Not Found" });
    }

    const { page, limit, otherParams } = extractPaginationQueryParams(req.query);

    let filter: { [key: string]: unknown } = { employer: employerId };
    if (otherParams.search) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      filter = { ...filter, title: { $regex: otherParams.search, $options: "i" } };
    }

    const result = await offsetPaginate(jobModel, filter, page, limit);
    return res.status(200).json(result);
  },

  updateAPost: async (req: RequestWithUser, res: Response) => {
    const newPost = fieldValidate.processNewPost(req.body);
    const post = await jobModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    await post.updateOne({ $set: newPost });
    return res.status(200).json("Post has been updated");
  },

  deleteAPost: async (req: RequestWithUser, res: Response) => {
    const post = await jobModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    await jobModel.findByIdAndDelete(req.params.id);

    await employerModel.updateOne(
      { _id: post.employer },
      { $pull: { jobPosts: post._id } }
    );

    await applicationModel.deleteMany({ job: post._id });

    await studentModel.updateMany(
      {
        $or: [{ savedJobs: post._id }],
      },
      {
        $pull: {
          savedJobs: post._id,
        },
      }
    );

    return res.status(204).end();
  },

  createNewPost: async (req: RequestWithUser, res: Response) => {
    const job = fieldValidate.processNewPost(req.body);
    const { title, externalApplication, jobDescription, location, salary } =
      job;

    const user = await employerModel.findById(req.user!._id);
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
    console.log(savedJob);
    user.jobPosts = user.jobPosts.concat(savedJob._id);
    await user.save();
    return res.status(200).json(savedJob);
  },

  getAllPosts: async (req: RequestWithUser, res: Response) => {
    const {page, limit, otherParams} = extractPaginationQueryParams(req.query);

    let filter = {};

    if (otherParams.search) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      filter = { title: { $regex: otherParams.search, $options: "i" } };
    }

    const result = await offsetPaginate(jobModel, filter, page, limit);

    return res.status(200).json(result);
  },

  getPost: async (req: RequestWithUser, res: Response) => {
    const post = await jobModel.findById(req.params.id).populate({
      path: "employer",
      select: "fullName department email phone profilePicture",
    });
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  },
};

export default postController;
