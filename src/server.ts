import "dotenv/config"; 
import app from "./app";
import { connectRedis } from "./lib/redis";
const PORT = process.env.PORT || 4000;

(async () => {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();