import { Schema, model} from 'mongoose';
import { TemplateHtml } from '../model';

const templateSchema = new Schema<TemplateHtml> ( {
    template_id: { type: String, required: true },
    id_invoice: { type: String, required: true },
    html_template: { type: String, required: true },

}, { timestamps: true });

export const template_html = model<TemplateHtml>('template_html', templateSchema);