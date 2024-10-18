SELECT * FROM invoice_data.invoice_datas
LIMIT 100


INSERT  INTO invoice_datas (id, id_invoice, invoice_date, due_date, client_name, client_address, client_city, client_state, client_zip, payment_method, check_number, items, total_amount) VALUES (1, 'INV-12345', '8 Oktober 2024', '8 November 2024', 'John Doe', 'Jl. Contoh No. 123', 'Jakarta', 'DKI Jakarta', '10110', 'Check', '1000', '[
        { "description": "Desain Website", "price": "300.00" },
        { "description": "Hosting (3 bulan)", "price": "75.00" },
        { "description": "Nama Domain (1 tahun)", "price": "10.00" }]', 385.00)

SELECT * FROM invoice_datas;

DELETE FROM invoice_datas WHERE id =1;