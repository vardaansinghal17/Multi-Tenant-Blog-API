import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL!;

export const redisClient = createClient({
  url: redisUrl,
  socket: {
    tls: true,
    rejectUnauthorized: false, 
  },
});

redisClient.on("connect", () => {
  console.log("Redis connected (Upstash)");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};