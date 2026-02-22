import { Request, Response } from "express";
import { createTenant } from "./tenant.service";

export const createTenantHandler = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tenant = await createTenant(name);
    res.status(201).json(tenant);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};