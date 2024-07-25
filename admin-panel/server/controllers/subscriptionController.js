const connection = require("../database/db");
const dotenv = require('dotenv');
const PDFDocument = require('pdfkit');
const excel = require('exceljs');

dotenv.config();


module.exports.subscriptionController = {
    setSubscription: async (req, res) => {
        try {
            const { traditional, special } = req.body
            const newdata = {
                traditional: traditional,
                special: special,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            connection.query(`INSERT INTO subscriptions SET?`, newdata, function (error, results, fields) {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    console.log("1 record inserted");
                    return res.status(201).json({ msg: "Subscription Successfully Created" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getSubscriptions: async (req, res) => {
        try {
            connection.query(`SELECT * FROM subscriptions LIMIT 1`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ results: results[0], msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateSubscription: async (req, res) => {
        try {
            const { id, traditional, special } = req.body

            connection.query(`UPDATE subscriptions SET traditional='${traditional}',special='${special}', updatedAt='${new Date()}' WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ msg: "Successfully Updated" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    checkValidation: async (req, res) => {
        try {

            const { id } = req.rootUser;
            connection.query(`SELECT isActive FROM users WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    if (results[0].isActive === 0) {
                        return res.status(200).json({ isActive: results[0].isActive, msg: "User has been blocked" });
                    } else {
                        const { subscriveDate } = req.body;
                        const subscribedDateObject = new Date(subscriveDate);

                        // Extract the year, month, and day
                        const subscribedYear = subscribedDateObject.getFullYear();
                        // const subscribedMonth = String(subscribedDateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                        // const subscribedDay = String(subscribedDateObject.getDate()).padStart(2, '0');

                        // Format the date as YYYY-MM-DD
                        // const subscribedFormattedDate = `${subscribedYear}-${subscribedMonth}-${subscribedDay}`;
                        // console.log('subscribe date:', subscribedFormattedDate);

                        const date = new Date()
                        const currentYear = date.getFullYear();
                        // console.log('check:', subscribedYear, '-', currentYear, " : ", currentYear > subscribedYear)

                        if (currentYear > subscribedYear) {
                            // add another operation with data base

                            // send response to client
                            return res.status(401).json({ msg: "Your subscription has expired. Please renew to continue using our services." });
                        } else {
                            return res.status(200).json({ msg: "Your subscription is currently active. Enjoy our services!" });
                        }
                    }
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getPaymentHistory: async (req, res) => {
        try {
            const { searchTerm, subscriptionType } = req.query;

            // Pagination parameters
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
            const limit = 10; // Default to 10 entries per page

            // Calculate the offset based on the page number and limit
            const offset = (page - 1) * limit;

            let countQuery;
            let dataQuery;
            let countQueryParams = [];
            let dataQueryParams = [limit, offset];

            if (searchTerm || subscriptionType) {
                // Sanitize and prepare the search term for case-insensitive search
                const sanitizedSearchTerm = searchTerm ? `%${searchTerm.trim().toLowerCase()}%` : null;

                let baseQuery = `SELECT * FROM purchase_history WHERE 1=1`;
                let baseCountQuery = `SELECT COUNT(*) AS total FROM purchase_history WHERE 1=1`;

                if (sanitizedSearchTerm) {
                    baseQuery += ` AND (LOWER(fullName) LIKE ? OR LOWER(mobile) LIKE ? OR LOWER(email) LIKE ?)`;
                    baseCountQuery += ` AND (LOWER(fullName) LIKE ? OR LOWER(mobile) LIKE ? OR LOWER(email) LIKE ?)`;
                    countQueryParams.push(sanitizedSearchTerm, sanitizedSearchTerm, sanitizedSearchTerm);
                    dataQueryParams.unshift(sanitizedSearchTerm, sanitizedSearchTerm, sanitizedSearchTerm);
                }

                if (subscriptionType) {
                    baseQuery += ` AND subscriptionType = ?`;
                    baseCountQuery += ` AND subscriptionType = ?`;
                    countQueryParams.push(subscriptionType);
                    dataQueryParams.unshift(subscriptionType);
                }

                countQuery = baseCountQuery;
                dataQuery = `${baseQuery} LIMIT ? OFFSET ?`;
            } else {
                countQuery = `SELECT COUNT(*) AS total FROM purchase_history`;
                dataQuery = `SELECT * FROM purchase_history LIMIT ? OFFSET ?`;
            }

            // Count total entries matching the search term or all entries if no search term
            connection.query(countQuery, countQueryParams, async function (error, countResults, fields) {
                if (error) {
                    console.error('Error counting entries:', error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const totalEntries = countResults[0].total;
                    const totalPages = Math.ceil(totalEntries / limit);

                    // Fetch users matching the search term with pagination
                    connection.query(dataQuery, dataQueryParams, function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ msg: 'Error fetching information.' });
                        }

                        return res.status(200).json({ results: result, totalPages: totalPages, msg: 'Successfully fetched users.' });
                    });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    getSubscriptionReport: async (req, res) => {
        try {
            const { type } = req.query

            const date = new Date();
            const currentYear = date.getFullYear();
            const fromDateDefault = `${currentYear - 1}-01-01`; // January 1st of last year

            const today = req.query.toDate ? new Date(req.query.toDate) : new Date()
            today.setDate(today.getDate() + 1); // Add 1 day to the current date
            const tomorrow = today.toISOString().split('T')[0];

            const fromDate = req.query.fromDate || fromDateDefault
            const toDate = tomorrow;

            if (type === 'pdf') {
                // Query the purchase_history table for records within the date range
                connection.query(`SELECT * FROM purchase_history WHERE createdAt BETWEEN ? AND ?`, [fromDate, toDate], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Error fetching information.' });
                    }

                    // Create a new PDF document with A4 size and 10px margin
                    const customWidth = 1500;
                    const customHeight = 1000;
                    const margin = 10;
                    const doc = new PDFDocument({ size: [customWidth, customHeight], margin });
                    let buffers = [];
                    doc.on('data', buffers.push.bind(buffers));
                    doc.on('end', () => {
                        let pdfData = Buffer.concat(buffers);

                        // fs.writeFileSync('output.pdf', pdfData);

                        res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(pdfData),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=subscription_report.pdf',
                        }).end(pdfData);
                    });

                    // Add title to the PDF document
                    doc.fontSize(25).text('Subscription Report', {
                        align: 'center'
                    });
                    doc.fontSize(12).fillColor('black')
                        .text(`From Date: ${fromDate}`, { align: 'right' })
                        .text(`To Date: ${toDate}`, { align: 'right' });

                    doc.moveDown();

                    // Define table column widths (100% width of A4 minus margins: 575.28pt)
                    const pageWidth = doc.page.width - 2 * doc.options.margin; // Total width minus 2*10px margins
                    const columnWidths = [
                        pageWidth * 0.05,  // 5% for ID
                        pageWidth * 0.15,  // 15% for Full Name
                        pageWidth * 0.1,   // 10% for Mobile
                        pageWidth * 0.15,  // 15% for Email
                        pageWidth * 0.1,   // 10% for Amount
                        pageWidth * 0.15,  // 15% for Subscription Plan
                        pageWidth * 0.1,   // 10% for Payment ID
                        pageWidth * 0.1,   // 10% for Order ID
                        pageWidth * 0.1    // 10% for Purchase Date
                    ];
                    const rowHeight = 30;
                    const startX = 10; // Start X position for the table (left margin)
                    const startY = doc.y; // Start Y position for the table

                    // Draw table headers
                    doc.fontSize(12).fillColor('white').rect(startX, startY, pageWidth, rowHeight).fill('blue');
                    doc.fillColor('white');
                    doc.text('ID', startX, startY + 10, { width: columnWidths[0], align: 'center' });
                    doc.text('Full Name', startX + columnWidths[0], startY + 10, { width: columnWidths[1], align: 'center' });
                    doc.text('Mobile', startX + columnWidths[0] + columnWidths[1], startY + 10, { width: columnWidths[2], align: 'center' });
                    doc.text('Email', startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY + 10, { width: columnWidths[3], align: 'center' });
                    doc.text('Amount', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY + 10, { width: columnWidths[4], align: 'center' });
                    doc.text('Subscription Plan', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], startY + 10, { width: columnWidths[5], align: 'center' });
                    doc.text('Payment ID', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], startY + 10, { width: columnWidths[6], align: 'center' });
                    doc.text('Order ID', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], startY + 10, { width: columnWidths[7], align: 'center' });
                    doc.text('Purchase Date', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], startY + 10, { width: columnWidths[8], align: 'center' });

                    doc.moveDown();

                    // Draw table rows
                    let y = startY + rowHeight;
                    result.forEach((row, index) => {
                        // Alternate row colors
                        if (index % 2 === 0) {
                            doc.fillColor('#f0f0f0').rect(startX, y, pageWidth, rowHeight).fill();
                        }

                        // Draw row text
                        doc.fillColor('black');
                        doc.text(index + 1, startX, y + 10, { width: columnWidths[0], align: 'center' });
                        doc.text(row.fullName, startX + columnWidths[0], y + 10, { width: columnWidths[1], align: 'left' });
                        doc.text(row.mobile, startX + columnWidths[0] + columnWidths[1], y + 10, { width: columnWidths[2], align: 'center' });
                        doc.text(row.email, startX + columnWidths[0] + columnWidths[1] + columnWidths[2], y + 10, { width: columnWidths[3], align: 'left' });
                        doc.text(row.amount, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y + 10, { width: columnWidths[4], align: 'right' });
                        doc.text(row.subscriptionType, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], y + 10, { width: columnWidths[5], align: 'center' });
                        doc.text(row.razorpay_payment_id, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], y + 10, { width: columnWidths[6], align: 'center' });
                        doc.text(row.razorpay_order_id, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], y + 10, { width: columnWidths[7], align: 'center' });
                        doc.text(new Date(row.createdAt).toLocaleDateString(), startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], y + 10, { width: columnWidths[8], align: 'center' });

                        // Draw row borders
                        doc.strokeColor('black').lineWidth(0.5);
                        doc.rect(startX, y, columnWidths[0], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0], y, columnWidths[1], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0] + columnWidths[1], y, columnWidths[2], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2], y, columnWidths[3], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y, columnWidths[4], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], y, columnWidths[5], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], y, columnWidths[6], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], y, columnWidths[7], rowHeight).stroke();
                        doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], y, columnWidths[8], rowHeight).stroke();

                        y += rowHeight;
                    });

                    // Draw table border
                    doc.strokeColor('black').lineWidth(1);
                    doc.rect(startX, startY, columnWidths[0], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0], startY, columnWidths[1], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0] + columnWidths[1], startY, columnWidths[2], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY, columnWidths[3], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY, columnWidths[4], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], startY, columnWidths[5], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], startY, columnWidths[6], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], startY, columnWidths[7], rowHeight + result.length * rowHeight).stroke();
                    doc.rect(startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], startY, columnWidths[8], rowHeight + result.length * rowHeight).stroke();

                    // Finalize the PDF and end the stream
                    doc.end();
                });
            } else {

                connection.query(`SELECT * FROM purchase_history WHERE createdAt BETWEEN ? AND ?`, [fromDate, toDate], function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Error fetching information.' });
                    }

                    const workbook = new excel.Workbook();
                    const worksheet = workbook.addWorksheet('Entries');

                    worksheet.columns = [
                        { header: 'ID', key: 'id', width: 15 },
                        { header: 'Full Name', key: 'fullName', width: 20 },
                        { header: 'Mobile', key: 'mobile', width: 15 },
                        { header: 'Email', key: 'email', width: 15 },
                        { header: 'Amount', key: 'amount', width: 15 },
                        { header: 'Subscription Plan', key: 'subscriptionPlan', width: 15 },
                        { header: 'Payment ID', key: 'paymentId', width: 15 },
                        { header: 'Order ID', key: 'orderId', width: 15 },
                        { header: 'Purchase Date', key: 'purchaseDate', width: 15 },
                    ];

                    results.forEach((row, i) => {
                        worksheet.addRow({
                            id: i + 1,
                            fullName: row.fullName,
                            mobile: row.mobile,
                            email: row.email,
                            amount: row.amount,
                            subscriptionPlan: row.subscriptionType,
                            paymentId: row.razorpay_payment_id,
                            orderId: row.razorpay_order_id,
                            purchaseDate: new Date(row.createdAt),
                        });
                    });

                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.setHeader('Content-Disposition', 'attachment; filename=entries.xlsx');

                    workbook.xlsx.write(res).then(() => {
                        res.end();
                    });
                });
            }

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
}