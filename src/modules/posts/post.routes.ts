import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/role.middleware";
import {
  createPostHandler,
  getPostsHandler,
  updatePostHandler,
  deletePostHandler,
} from "./post.controller";

const router = Router();

router.use(authMiddleware); 

router.post("/", createPostHandler);
router.get("/", getPostsHandler);
router.put("/:id", updatePostHandler);

router.delete("/:id", adminOnly, deletePostHandler);

export default router;