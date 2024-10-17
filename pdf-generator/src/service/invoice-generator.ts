import { Browser } from 'puppeteer';
import { minioClient } from '../databases/Connection';
import { logger } from '../helpers/logging';
import { UpdateWriteOpResult } from 'mongoose';
import { status_html } from '../databases/status-schema';


export class InvoiceGenerator {

    static async updateStatus(id_invoice: string, status: string) : Promise<UpdateWriteOpResult> {

        const update = await status_html.updateOne(
            {id_invoice:id_invoice},
            {
                $set: {
                    pdf_status: status
                }
            }
        )

        return update;

    }

    static async downloadPDF(browser: Browser, url: string, bucketName: string, filename: string, id_invoice: string) {

        try {
            
            const page = await browser.newPage();
    
            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 0
            });
    
            const pdfUint8Array = await page.pdf({
                format: 'A4',
                printBackground: true
            });
    
            await page.close();
    
            let pdfBuffer = Buffer.from(pdfUint8Array);

            await minioClient.putObject(bucketName, filename, pdfBuffer);

            logger.info(`Success upload to minio for ${filename}`);
            
            await this.updateStatus(id_invoice, 'done');

            logger.info(`Success saved status for ${filename}`);

        } catch (error) {
            logger.error('Error Initializing DB', { error: error instanceof Error ? error.message : error})
        }
    }
}