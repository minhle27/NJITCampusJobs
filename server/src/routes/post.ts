/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const postRouter = express.Router();
import postController from "../controllers/postController";
import verifyToken from "../middleware/verifyToken";

postRouter.get(
  "/employer/:id",
  verifyToken,
  postController.getAllPostsFromAnEmployer
);

postRouter.delete("/:id", verifyToken, postController.deleteAPost);

postRouter.patch("/:id", verifyToken, postController.updateAPost);

postRouter.get("/:id", verifyToken, postController.getPost);

postRouter.patch(
  "/:id/applicants",
  verifyToken,
  postController.updateApplicantStatus
);

postRouter.post("/", verifyToken, postController.createNewPost);

postRouter.get("/", verifyToken, postController.getAllPosts);

export default postRouter;
