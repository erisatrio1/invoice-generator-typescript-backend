
export type TemplateHtml = {
    template_id: string,
    id_invoice: string
    html_template: string,
}

export type StatusProcess = {
    id_invoice: string,
    filename: string,
    html_generated: string,
    pdf_status: string,
    link_html: string,
}

export type DbResult = {
    data: object;
    error: string | null;
};

export type InvoiceItems = {
    price: number;
    description: string;
}

export type InvoiceData = {
    id_invoice: string,
    invoice_date: string,
    due_date: string,
    client_name: string,
    client_address: string,
    client_city: string,
    client_state: string,
    client_zip: string,
    payment_method: string,
    check_number: string,
    items: InvoiceItems[],
    total_amount: number
}

export type BaseResponse = {
    success: boolean;
    code: number;
    message: string;
    data: StatusProcess
}

export type BaseResponseNULL = {
    success: boolean;
    code: number;
    message: string;
    data: null
}


export const toDbResult = (data: object , error: string | null ) : DbResult => {
    return {
        data: data,
        error: error
    }
}

export const toBaseResponse = (success: boolean, code: number, message: string, data: StatusProcess) : BaseResponse => {
    return {
        success: success,
        code: code,
        message: message,
        data: data 
    }
}

export const toBaseResponseNULL = (success: boolean, code: number, message: string, data: null) : BaseResponseNULL => {
    return {
        success: success,
        code: code,
        message: message,
        data: null
    }
}
