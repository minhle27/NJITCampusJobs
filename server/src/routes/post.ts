/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const postRouter = express.Router();
import postController from "../controllers/postController";
import verifyToken from "../middleware/verifyToken";
import applicationController from "../controllers/applicationController";

postRouter.get(
  "/employer/:id",
  verifyToken,
  postController.getAllPostsFromAnEmployer
);

postRouter.delete("/:id", verifyToken, postController.deleteAPost);

postRouter.patch("/:id", verifyToken, postController.updateAPost);

postRouter.get("/:id", verifyToken, postController.getPost);

postRouter.post("/", verifyToken, postController.createNewPost);

postRouter.get("/", verifyToken, postController.getAllPosts);

postRouter.get(
  "/:jobId/applications",
  verifyToken,
  applicationController.getApplicationsByPost
);

postRouter.post(
  "/:jobId/applications",
  verifyToken,
  applicationController.createNewApplication
);

export default postRouter;
