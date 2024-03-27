/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const postRouter = express.Router();
import postController from "../controllers/postController";
import verifyToken from "../middleware/verifyToken";

//GET ALL POST FROM A USER
postRouter.get(
  "/employer/:id",
  verifyToken,
  postController.getAllPostsFromAnEmployer
);

postRouter.post(
  "/",
  verifyToken,
  postController.createNewPost
);

export default postRouter;
