import prisma from "../../lib/prisma";

export const createTenant = async (name: string) => {
  return prisma.tenant.create({
    data: { name },
  });
};