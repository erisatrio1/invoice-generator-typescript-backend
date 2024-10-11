import express, { Express } from "express";
import { CreateChannel } from "../helpers/rabbit-connect";
import { errorMiddleware } from "../middleware/error-middleware";
import { router } from "../router";

export const server = async(app: Express) :Promise<void> => {
    app.use(express.json());

    const channel = await CreateChannel();

    router(app, channel);
    app.use(errorMiddleware);
}