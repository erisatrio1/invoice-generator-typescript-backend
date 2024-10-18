import amqp, { AmqpConnectionManager } from 'amqp-connection-manager';
import { Browser } from 'puppeteer';
import { Message} from 'amqplib';
import { env } from "../config/config";
import { logger } from "./logging";
import { ResponseError } from '../error/response-error';
import { InvoiceGenerator } from '../service/invoice-generator';


export const CreateChannel = async() : Promise<AmqpConnectionManager> => {
    try {
        const connection: AmqpConnectionManager = amqp.connect ([env.RABBIT_PORT]);

        logger.info('Connect to rabbit')
        return connection;
    } catch (error) {
        logger.error('Failed to connect to RabbitMQ', { error: error instanceof Error ? error.message : error });
        throw new ResponseError(500, 'Failed to connect to RabbitMQ');
    }
}

export const ConsumeMessage = (connection :AmqpConnectionManager, bucketName : string, browser: Browser) => {
    const queue = env.QUEUE;

    const channelWrapper = connection.createChannel({
        setup: async(channel: any) => {
            await channel.assertQueue(queue, {durable: true });
            channel.prefetch(1);
            channel.consume(queue, async(msg: Message) => {
                if (!msg) return;

                const messageArray = JSON.parse(msg.content.toString());
                logger.info(`Received: ${messageArray.link_html}`);
                try {
                    await InvoiceGenerator.downloadPDF(browser, messageArray.link_html, bucketName, messageArray.filename, messageArray.id_invoice );
                    channel.ack(msg); 
                } catch (error) {
                    logger.error(` Error downloading ${messageArray.link}:`, { error: error instanceof Error ? error.message : error });
                    channel.noAck(msg);
                }
            }, {
                noAck: false
            })
        }
    })
}