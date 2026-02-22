import { Router } from "express";
import { createTenantHandler } from "./tenant.controller";

const router = Router();

router.post("/", createTenantHandler); 

export default router;