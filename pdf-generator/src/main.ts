import express from "express";
import { env } from "./config/config";
import { connection } from "./databases/Connection";
import { logger } from "./helpers/logging";
import { server } from "./application/web";

const StartServer = async() : Promise<void> => {
    const app = express();
    const PORT = env.PORT;
    const bucketName = env.MINIO_BUCKET; 

    await connection(bucketName);

    await server(app, bucketName);

    app.listen(PORT, () => {
        logger.info(`Service up and running on port:${PORT}`);
    });
}

StartServer();