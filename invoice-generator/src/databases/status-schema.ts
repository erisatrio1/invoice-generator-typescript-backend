import { Schema, model} from 'mongoose';
import { StatusProcess } from '../model';

const statusSchema = new Schema<StatusProcess> ( {
    id_invoice: { type: String, required: true },
    filename: { type: String, required: true },
    html_generated: { type: String, required: true },
    pdf_status: { type: String, required: true },
    link_html: { type: String, required: true },

}, { timestamps: true });

export const status_html = model<StatusProcess>('status_html', statusSchema);
