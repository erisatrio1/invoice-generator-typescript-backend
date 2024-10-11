// Data yang diperoleh dari database
const invoiceData = {
    invoice_number: 'INV-12345',
    invoice_date: '8 Oktober 2024',
    due_date: '8 November 2024',
    client_name: 'John Doe',
    client_address: 'Jl. Contoh No. 123',
    client_city: 'Jakarta',
    client_state: 'DKI Jakarta',
    client_zip: '10110',
    payment_method: 'Check',
    check_number: '1000',
    items: [
        { description: 'Desain Website', price: 300.00 },
        { description: 'Hosting (3 bulan)', price: 75.00 },
        { description: 'Nama Domain (1 tahun)', price: 10.00 }
    ],
    total_amount: 385.00
};

// Template HTML sebagai string
let templateHTML = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice</title>
<style>
    body {
        font-family: Arial, sans-serif;
        padding: 20px;
    }
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        color: #555;
    }
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        border-collapse: collapse;
    }
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    .invoice-box table tr.top table td.title h1 {
        font-size: 45px;
        line-height: 45px;
        color: #333;
        margin: 0;
    }
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
        text-align: left;
    }
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }
    .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
    }
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    .invoice-box table tr.total td {
        border-top: 2px solid #eee;
        font-weight: bold;
        text-align: right;
    }
</style>
</head>
<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
        <tr class="top">
        <td colspan="2">
            <table>
                <tr>
                    <td class="title">
                        <h1>Invoice</h1>
                    </td>
                    <td>
                        Invoice #: {invoice_number}<br>
                        Date: {invoice_date}<br>
                        Due: {due_date}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr class="information">
        <td colspan="2">
            <table>
                <tr>
                    <td>
                        Nama Perusahaan<br>
                        1234 Nama Jalan<br>
                        Kota, Provinsi, Kode Pos
                    </td>
                    <td>
                        {client_name}<br>
                        {client_address}<br>
                        {client_city}, {client_state}, {client_zip}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
            <tr class="heading">
                <td>Item</td>
                <td>Harga</td>
            </tr>
            {TRLoop_items}
            <tr class="total">
                <td></td>
                <td>Total: {total_amount}</td>
            </tr>
        </table>
    </div>
</body>
</html>`;

// Fungsi untuk menghasilkan baris item
function generateItemsRows(items) {
    return items.map(item => `
        <tr class="item">
            <td>${item.description}</td>
            <td>$${item.price.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Menggantikan placeholder dengan data
templateHTML = templateHTML
    .replace('{invoice_number}', invoiceData.invoice_number)
    .replace('{invoice_date}', invoiceData.invoice_date)
    .replace('{due_date}', invoiceData.due_date)
    .replace('{client_name}', invoiceData.client_name)
    .replace('{client_address}', invoiceData.client_address)
    .replace('{client_city}', invoiceData.client_city)
    .replace('{client_state}', invoiceData.client_state)
    .replace('{client_zip}', invoiceData.client_zip)
    .replace('{payment_method}', invoiceData.payment_method)
    .replace('{check_number}', invoiceData.check_number)
    .replace('{total_amount}', invoiceData.total_amount)
    .replace('{TRLoop_items}', generateItemsRows(invoiceData.items));

// Menampilkan hasil di console (atau bisa dikirim ke browser/PDF)
console.log(templateHTML);
