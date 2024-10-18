CREATE TABLE IF NOT EXISTS invoice_data.invoice_datas (
	id serial NOT NULL,
	id_invoice VARCHAR(255),
    invoice_date VARCHAR(255),
    due_date VARCHAR(255),
    client_name VARCHAR(255),
    client_address VARCHAR(255),
    client_city VARCHAR(255),
    client_state VARCHAR(255),
    client_zip VARCHAR(255),
    payment_method VARCHAR(255),
    check_number VARCHAR(255),
    items jsonb,
    total_amount INT
)