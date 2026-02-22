import prisma from "../../lib/prisma";

export const createPost = async (
  title: string,
  content: string,
  authorId: string,
  tenantId: string
) => {
  return prisma.post.create({
    data: { title, content, authorId, tenantId },
  });
};

export const getPosts = async (tenantId: string) => {
  return prisma.post.findMany({
    where: {
      tenantId,
      deletedAt: null,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updatePost = async (
  postId: string,
  data: { title?: string; content?: string }
) => {
  return prisma.post.update({
    where: { id: postId },
    data,
  });
};

export const softDeletePost = async (postId: string) => {
  return prisma.post.update({
    where: { id: postId },
    data: { deletedAt: new Date() },
  });
};