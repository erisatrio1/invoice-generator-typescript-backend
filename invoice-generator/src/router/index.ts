import { ChannelWrapper } from "amqp-connection-manager";
import { Express, Request, Response, NextFunction } from "express";
import { InvoiceService } from "../service/invoice-service";
import { StatusProcess, toBaseResponse } from "../model";
import { sendMessage } from "../helpers/rabbit-connect";
import { env } from "../config/config";
import { logger } from "../helpers/logging";


export const router = (app: Express, channel: ChannelWrapper) : void => {

    app.get('/invoice-generator/:id_invoice', async(req: Request, res: Response, next: NextFunction)  => {

        try {
            const id_invoice = req.params.id_invoice;

            const isGenerated = await InvoiceService.getStatus(id_invoice);

            if (isGenerated) {
                
                const response : StatusProcess = {
                    id_invoice: isGenerated.id_invoice,
                    filename: isGenerated.filename,
                    html_generated: isGenerated.html_generated,
                    pdf_status: isGenerated.pdf_status,
                    link_html: isGenerated.link_html,
                }

                res.status(200).json(toBaseResponse(true, 200, 'Invoice has been generated', response));
                return;
            }
    
            const invoice = await InvoiceService.getInvoice(id_invoice);
            const template = await InvoiceService.getTemplate(id_invoice);
            const generatedHtml = InvoiceService.generateHtml(template.html_template, invoice);
            const filename = InvoiceService.generateFilename(id_invoice);

            const link: string = `http://localhost:${env.PORT}/invoice-view/${id_invoice}` 

            const status : StatusProcess = {
                id_invoice: id_invoice,
                filename: filename,
                html_generated: generatedHtml,
                pdf_status: 'pending',
                link_html: link,
            }

            await InvoiceService.insertStatus(status);

            sendMessage(status, channel);

            res.status(200).json(toBaseResponse(true, 200, 'Invoice has been generated', status))

        } catch (error) {
            next(error);
        }

    })

    app.get('/invoice-view/:id_invoice', async(req: Request, res: Response, next: NextFunction) => {

        try {
            const id_invoice = req.params.id_invoice;
            const status = await InvoiceService.getStatus(id_invoice);
            res.send(status.html_generated);

        } catch (error) {
            next(error);
        }
    })

    app.get('/ping', (req: Request, res: Response, next: NextFunction) => {

        try {
            logger.info('Health-check')

            res.status(200).json({ message: 'pong' })
            
        } catch (error) {

            next(error)
        }
    })
}