import { ChannelWrapper } from "amqp-connection-manager";
import { Express, Request, Response, NextFunction } from "express";
import { logger } from "../helpers/logging";


export const router = (app: Express) : void => {


    app.get('/ping', (req: Request, res: Response, next: NextFunction) => {

        try {
            logger.info('Health-check')

            res.status(200).json({ message: 'pong' })
            
        } catch (error) {

            next(error)
        }
    })
}