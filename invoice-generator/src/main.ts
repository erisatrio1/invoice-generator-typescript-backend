import express from "express";
import { env } from "./config/config";
import { connection } from "./databases/Connection";
import { logger } from "./helpers/logging";
import { server } from "./application/web";

const StartServer = async() : Promise<void> => {
    const app = express();
    const PORT = env.PORT;

    await connection();

    await server(app);

    app.listen(PORT, () => {
        logger.info(`Service up and running on port:${PORT}`);
    });
}

StartServer();