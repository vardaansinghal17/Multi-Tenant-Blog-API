import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import {
  createPost,
  getPosts,
  updatePost,
  softDeletePost,
} from "./post.service";
import prisma from "../../lib/prisma";
import { redisClient } from "../../lib/redis";


export const createPostHandler = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;

  const post = await createPost(
    title,
    content,
    req.user!.userId,
    req.user!.tenantId
  );
const keys = await redisClient.keys(`posts:${req.user!.tenantId}:*`);
  if (keys.length) {
    await redisClient.del(keys);
  }
  res.status(201).json(post);
};

export const getPostsHandler = async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const title = req.query.title as string | undefined;

  const cacheKey = `posts:${req.user!.tenantId}:p${page}:l${limit}:t${title}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const { posts, total } = await getPosts(req.user!.tenantId, page, limit, title);

  const result = {
    page,
    limit,
    totalPosts: total,
    totalPages: Math.ceil(total / limit),
    posts,
  };

  await redisClient.setEx(cacheKey, 120, JSON.stringify(result));

  res.json(result);
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

  const keys = await redisClient.keys(`posts:${req.user!.tenantId}:*`);
  if (keys.length) {
    await redisClient.del(keys);
  }
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

  const keys = await redisClient.keys(`posts:${req.user!.tenantId}:*`);
  if (keys.length) {
    await redisClient.del(keys);
  }

  res.json({ message: "Post deleted", deleted });
};