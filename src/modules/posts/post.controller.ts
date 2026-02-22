import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import {
  createPost,
  getPosts,
  updatePost,
  softDeletePost,
} from "./post.service";
import prisma from "../../lib/prisma";


export const createPostHandler = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;

  const post = await createPost(
    title,
    content,
    req.user!.userId,
    req.user!.tenantId
  );

  res.status(201).json(post);
};

export const getPostsHandler = async (req: AuthRequest, res: Response) => {
  const posts = await getPosts(req.user!.tenantId);
  res.json(posts);
};

export const updatePostHandler = async (req: AuthRequest, res: Response) => {
  const postIdParam = req.params.id;

  if (Array.isArray(postIdParam)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  const postId = postIdParam;
  const { title, content } = req.body;

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post || post.tenantId !== req.user!.tenantId) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.authorId !== req.user!.userId && req.user!.role !== "ADMIN") {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await updatePost(postId, { title, content });
  res.json(updated);
};

export const deletePostHandler = async (req: AuthRequest, res: Response) => {
  const postIdParam = req.params.id;

  if (Array.isArray(postIdParam)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  const postId = postIdParam;

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post || post.tenantId !== req.user!.tenantId) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deleted = await softDeletePost(postId);
  res.json({ message: "Post deleted", deleted });
};