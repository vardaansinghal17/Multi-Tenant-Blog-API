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


export const getPosts = async (
  tenantId: string,
  page: number,
  limit: number,
  title?: string
) => {
  const skip = (page - 1) * limit;

  const filters: any = {
    tenantId,
    deletedAt: null,
  };

  if (title) {
    filters.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  const posts = await prisma.post.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.post.count({ where: filters });

  return { posts, total };
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