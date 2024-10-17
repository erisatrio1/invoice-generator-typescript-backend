import express, { Express } from "express";
import { ConsumeMessage, CreateChannel } from "../helpers/rabbit-connect";
import { errorMiddleware } from "../middleware/error-middleware";
import { router } from "../router";
import { PuppeteerConnect } from "../databases/puppeteer-connect";
import { logger } from "../helpers/logging";

export const server = async(app: Express, bucketName: string) :Promise<void> => {
    app.use(express.json());

    const channel = await CreateChannel();

    const browser = await PuppeteerConnect();

    if (browser === undefined ) {
        logger.error(`Puppeteer not connect or return undefined`)
        return
    } 

    ConsumeMessage(channel, bucketName, browser!);

    router(app);
    app.use(errorMiddleware);
}