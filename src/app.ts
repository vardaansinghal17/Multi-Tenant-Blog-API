import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import tenantRoutes from "./modules/tenant/tenant.routes";
import postRoutes from "./modules/posts/post.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tenants", tenantRoutes);
app.use("/posts", postRoutes);

app.get("/", (_req, res) => {
  res.send("Multi-Tenant Blog API is running ");
});

export default app;