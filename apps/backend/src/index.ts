import app from "./app";
import { logger } from "./utils";
import { connectDatabase } from "./config/database";
import dotenv from "dotenv";

dotenv.config(); 

const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on http://localhost:${PORT}`);
    });
})