import amqp, {ChannelWrapper, AmqpConnectionManager} from 'amqp-connection-manager';
import { env } from "../config/config";
import { logger } from "./logging";
import {  StatusProcess } from '../model';
import { ResponseError } from '../error/response-error';

const queue = env.QUEUE;

export const CreateChannel = async() : Promise<ChannelWrapper> => {
    try {
        const connection: AmqpConnectionManager = amqp.connect ([env.RABBIT_PORT]);
        const channelWrapper: ChannelWrapper = connection.createChannel({
            setup: (channel: any) => {
                return channel.assertQueue(queue, { durable: true });
            }
        })
        logger.info('Connect to rabbit')
        return channelWrapper;
    } catch (error) {
        logger.error('Failed to connect to RabbitMQ', { error: error instanceof Error ? error.message : error });
        throw new ResponseError(500, 'Failed to connect to RabbitMQ');
    }
}

export const sendMessage = (message: StatusProcess, channelWrapper: ChannelWrapper) => {
    channelWrapper
    .sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true
    })
    .then(() => {
        return logger.info('Success send message')
    })
    .catch((error) => {
        logger.error('Failed send message to queue', { error: error instanceof Error ? error.message : error });
    })
}