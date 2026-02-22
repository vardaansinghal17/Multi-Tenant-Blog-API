import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, tenantId, role } = req.body;
    const user = await registerUser(email, password, tenantId, role);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, tenantId } = req.body;
    const data = await loginUser(email, password, tenantId);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};