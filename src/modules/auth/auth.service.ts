import { hashPassword, comparePassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import prisma from "../../lib/prisma";



export const registerUser = async (
  email: string,
  password: string,
  tenantId: string,
  role: "ADMIN" | "MEMBER"
) => {
  const existing = await prisma.user.findFirst({
    where: { email, tenantId },
  });

  if (existing) throw new Error("User already exists in this tenant");

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role,
      tenantId,
    },
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string,
  tenantId: string
) => {
  const user = await prisma.user.findFirst({
    where: { email, tenantId },
  });

  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = signToken({
    userId: user.id,
    tenantId: user.tenantId,
    role: user.role,
  });

  return { token, user };
};