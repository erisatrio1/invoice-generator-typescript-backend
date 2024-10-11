import { DbResult, InvoiceData, InvoiceItems, StatusProcess, TemplateHtml} from "../model";
import { pool } from "../databases/Connection";
import { ResponseError } from "../error/response-error";
import { template_html } from "../databases/template-schema";
import { HydratedDocument } from 'mongoose';
import { status_html } from "../databases/status-schema";

export class InvoiceService {

    static async getInvoice(id_invoice: string) : Promise<InvoiceData>  {

        const query = 'SELECT * FROM oss_rba_comoss.form_datas WHERE id_invoice = $1';
        const values = [id_invoice];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            throw new ResponseError(404, `Invoice for ${id_invoice} not found`)
        }
        
        const row = result.rows[0];

        const items: InvoiceItems[] = JSON.parse(row.items);

        const invoiceData: InvoiceData = {
            invoice_number: row.invoice_number,
            invoice_date: row.invoice_date,
            due_date: row.due_date,
            client_name: row.client_name,
            client_address: row.client_address,
            client_city: row.client_city,
            client_state: row.client_state,
            client_zip: row.client_zip,
            payment_method: row.payment_method,
            check_number: row.check_number,
            items: items,  
            total_amount: row.total_amount
        };

        return invoiceData;
    }

    static async getTemplate(id_invoice: string) : Promise<HydratedDocument<TemplateHtml>>  {

        const result = await template_html.findOne({ id_invoice: id_invoice });

        if (!result) {
            throw new ResponseError(404, `Template HTML for ${id_invoice} not found`)
        }
        
        return result;
    }
    
    static async insertStatus(message: StatusProcess) : Promise<HydratedDocument<StatusProcess>> {
        
        const data = await status_html.findOneAndUpdate(
            { id_invoice: message.id_invoice},         
            { $setOnInsert: {
                id_invoice: message.id_invoice,
                filename: message.filename,
                html_generated: message.html_generated,
                pdf_status: message.pdf_status,
                link_html: message.link_html,
            }},  
            { upsert: true, new: true }  
        );
        
        return data;
    }

    static async getStatus(id_invoice: string) : Promise<HydratedDocument<StatusProcess>>  {

        const result = await status_html.findOne({ id_invoice: id_invoice });

        if (!result) {
            throw new ResponseError(404, `Template HTML for ${id_invoice} not found`)
        }
        
        return result;
    }
    
    static generateRows(items: InvoiceItems[]) : string {
        return items.map(item => `
            <tr class="item">
                <td>${item.description}</td>
                <td>$${item.price.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    static generateHtml(template: string, invoiceData: InvoiceData): string {
        return template.replace('{invoice_number}', invoiceData.invoice_number)
                        .replace('{invoice_date}', invoiceData.invoice_date)
                        .replace('{due_date}', invoiceData.due_date)
                        .replace('{client_name}', invoiceData.client_name)
                        .replace('{client_address}', invoiceData.client_address)
                        .replace('{client_city}', invoiceData.client_city)
                        .replace('{client_state}', invoiceData.client_state)
                        .replace('{client_zip}', invoiceData.client_zip)
                        .replace('{payment_method}', invoiceData.payment_method)
                        .replace('{check_number}', invoiceData.check_number)
                        .replace('{total_amount}', invoiceData.total_amount.toFixed(2))
                        .replace('{TRLoop_items}', this.generateRows(invoiceData.items));
    }

    static generateFilename(id_invoice: string) :string {

        const code = '0001';

        const filename = `lamp_${code}_${id_invoice}.pdf`;
        
        return filename;
    }


}