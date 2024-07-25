const connection = require("../database/db");
const path = require('path')
const fs = require('fs')
const PDFDocument = require('pdfkit');
const excel = require('exceljs');
const dotenv = require('dotenv');
dotenv.config();


module.exports.prospectsController = {
    addClient: async (req, res) => {
        try {
            const { name, mobile, email } = req.body
            const { id } = req.rootUser

            const newdata = {
                name: name,
                mobile: mobile,
                email: email,
                type: 'client',
                addedBy: id,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            connection.query(`INSERT INTO prospects SET?`, newdata, function (error, results, fields) {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    console.log("1 record inserted");
                    return res.status(201).json({ msg: "Successfully Added" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getClients: async (req, res) => {
        try {
            const { id } = req.rootUser

            // Pagination parameters
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
            const limit = 10; // Default to 10 entries per page

            // Calculate the offset based on the page number and limit
            const offset = (page - 1) * limit;

            connection.query(`SELECT COUNT(*) AS total FROM prospects WHERE addedBy='${id}' AND type='client'`, async function (error, countResults, fields) {
                if (error) {
                    console.error('Error counting entries:', error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const totalEntries = countResults[0].total;
                    const totalPages = Math.ceil(totalEntries / limit);

                    connection.query(`SELECT * FROM prospects WHERE addedBy='${id}' AND type='client' ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {
                        if (error) {
                            // console.log(error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            // console.log(results)
                            return res.status(200).json({ results: results, totalPages: totalPages, msg: "successfully fetch entry" });

                        }
                    });
                }
            })

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateClients: async (req, res) => {
        try {
            const { id, name, mobile, email } = req.body

            connection.query(`UPDATE prospects SET name='${name}',mobile='${mobile}',email='${email}' WHERE id='${id}'`, async (error, results) => {
                if (error) {
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
    deleteClients: async (req, res) => {
        try {
            const { id } = req.body
            connection.query(`DELETE FROM prospects WHERE id =${id}`, async (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ msg: "Successfully Deleted" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getClientsData: async (req, res) => {
        try {
            const { id } = req.rootUser

            connection.query(`SELECT * FROM prospects WHERE addedBy='${id}' AND type='client' ORDER BY createdAt DESC LIMIT ${100}`, function (error, results, fields) {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    // console.log(results)
                    return res.status(200).json({ results: results, msg: "successfully fetch entry" });

                }
            });

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    addProspect: async (req, res) => {
        try {
            const { appointmentDate, appointmentTime, reason, remark, client } = req.body

            connection.query(`UPDATE prospects SET type='prospect', appointmentDate='${appointmentDate}', appointmentTime='${appointmentTime}', reason='${reason}', remark='${remark}',updatedAt='${new Date()}' WHERE id='${client.value}'`, async (error, results) => {
                if (error) {
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
    getProspects: async (req, res) => {
        try {
            const { id } = req.rootUser

            // Pagination parameters
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
            const limit = 10; // Default to 10 entries per page

            // Calculate the offset based on the page number and limit
            const offset = (page - 1) * limit;

            connection.query(`SELECT COUNT(*) AS total FROM prospects WHERE addedBy='${id}' AND type='prospect' `, async function (error, countResults, fields) {
                if (error) {
                    console.error('Error counting entries:', error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const totalEntries = countResults[0].total;
                    const totalPages = Math.ceil(totalEntries / limit);

                    connection.query(`SELECT * FROM prospects WHERE addedBy='${id}' AND type='prospect' ORDER BY appointmentDate DESC LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {
                        if (error) {
                            // console.log(error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            // console.log(results)
                            return res.status(200).json({ results: results, totalPages: totalPages, msg: "successfully fetch entry" });

                        }
                    });
                }
            })

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateProspect: async (req, res) => {
        try {
            const { id, appointmentDate, appointmentTime, reason, remark } = req.body

            connection.query(`UPDATE prospects SET appointmentDate='${appointmentDate}', appointmentTime='${appointmentTime}', reason='${reason}', remark='${remark}',followup='' WHERE id='${id}'`, async (error, results) => {
                if (error) {
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
    deleteProspect: async (req, res) => {
        try {
            const { id } = req.body
            // connection.query(`DELETE FROM prospects WHERE id =${id}`, async (error, results) => {
            //     if (error) {
            //         return res.status(500).json({ msg: error.sqlMessage });
            //     } else {
            //         return res.status(200).json({ msg: "Successfully Deleted" });
            //     }
            // });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getAppointment: async (req, res) => {
        try {
            const { id } = req.rootUser

            // Pagination parameters
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
            const limit = 10; // Default to 10 entries per page

            // Calculate the offset based on the page number and limit
            const offset = (page - 1) * limit;

            // Get today's date in 'YYYY-MM-DD' format
            const today = new Date().toISOString().split('T')[0];

            connection.query(`SELECT COUNT(*) AS total FROM prospects WHERE addedBy='${id}' AND type='prospect'`, async function (error, countResults, fields) {
                if (error) {
                    console.error('Error counting entries:', error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const totalEntries = countResults[0].total;
                    const totalPages = Math.ceil(totalEntries / limit);

                    connection.query(`SELECT * FROM prospects WHERE addedBy='${id}' AND type='prospect' ORDER BY appointmentDate DESC LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {
                        if (error) {
                            // console.log(error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            // console.log(results)
                            return res.status(200).json({ results: results, totalPages: totalPages, msg: "successfully fetch entry" });

                        }
                    });
                }
            })

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateAppointment: async (req, res) => {
        try {
            const { id } = req.body
            const today = new Date().toISOString().split('T')[0];

            connection.query(`UPDATE prospects SET followup='done',updatedAt='${today}'  WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ msg: "Successfully Done Followup" });
                }
            });

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getTodayFollowUps: async (req, res) => {
        try {
            const { id } = req.rootUser

            // Pagination parameters
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
            const limit = 10; // Default to 10 entries per page

            // Calculate the offset based on the page number and limit
            const offset = (page - 1) * limit;

            // Get today's date in 'YYYY-MM-DD' format
            const today = new Date().toISOString().split('T')[0];

            connection.query(`SELECT COUNT(*) AS total FROM prospects WHERE addedBy='${id}' AND type='prospect' AND DATE(updatedAt) = '${today}' AND followup='done' `, async function (error, countResults, fields) {
                if (error) {
                    console.error('Error counting entries:', error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const totalEntries = countResults[0].total;
                    const totalPages = Math.ceil(totalEntries / limit);

                    connection.query(`SELECT * FROM prospects WHERE addedBy='${id}' AND type='prospect' AND DATE(updatedAt) = '${today}' AND followup='done' ORDER BY updatedAt DESC LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {
                        if (error) {
                            // console.log(error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            // console.log(results)
                            return res.status(200).json({ results: results, totalPages: totalPages, msg: "successfully fetch entry" });

                        }
                    });
                }
            })

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    getProspectsReports: async (req, res) => {
        try {
            const { type } = req.query
            const { id } = req.rootUser

            if (type === 'pdf') {
                // Query the users table for records
                connection.query('SELECT * FROM prospects WHERE type=? AND addedBy=?', ['prospect', id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Error fetching information.' });
                    }

                    // Create a new PDF document with custom size (700x1000 points) and 10px margin
                    const customWidth = 1500;
                    const customHeight = 1000;
                    const margin = 10;
                    const doc = new PDFDocument({ size: [customWidth, customHeight], margin });

                    let buffers = [];
                    doc.on('data', buffers.push.bind(buffers));
                    doc.on('end', () => {
                        let pdfData = Buffer.concat(buffers);
                        // fs.writeFileSync('output.pdf', pdfData);

                        // Uncomment for server response
                        res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(pdfData),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=subscription_report.pdf',
                        }).end(pdfData);
                    });

                    // Add title and dates to the PDF document
                    doc.fontSize(25).text('Prospects Report', { align: 'center' });
                    doc.fontSize(12).fillColor('black')
                        .text(`Date: ${new Date()}`, { align: 'right' })

                    doc.moveDown();

                    // Define table column widths (100% width of custom page minus margins)
                    const pageWidth = customWidth - 2 * margin; // Total width minus 2*10px margins
                    const columnWidths = [
                        pageWidth * 0.05,  // 5% for ID
                        pageWidth * 0.2,  // 20% for Name
                        pageWidth * 0.1, // 15% for Mobile
                        pageWidth * 0.2,  // 20% for Email
                        pageWidth * 0.05, // 5% for DOB
                        pageWidth * 0.05,  // 10% for Gender
                        pageWidth * 0.1,  // 10% for Status
                        pageWidth * 0.1,  // 10% for Target
                        pageWidth * 0.15   // 10% for SubscriptionType
                    ];
                    const rowHeight = 30;
                    const startX = margin; // Start X position for the table (left margin)
                    const startY = doc.y; // Start Y position for the table

                    // Draw table headers
                    doc.fontSize(12).fillColor('white').rect(startX, startY, pageWidth, rowHeight).fill('blue');
                    doc.fillColor('white');
                    doc.text('ID', startX, startY + 10, { width: columnWidths[0], align: 'center' });
                    doc.text('Name', startX + columnWidths[0], startY + 10, { width: columnWidths[1], align: 'center' });
                    doc.text('Email', startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY + 10, { width: columnWidths[3], align: 'center' });
                    doc.text('Mobile', startX + columnWidths[0] + columnWidths[1], startY + 10, { width: columnWidths[2], align: 'center' });
                    doc.text('Appointment Date', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY + 10, { width: columnWidths[4], align: 'center' });
                    doc.text('Appointment Time', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], startY + 10, { width: columnWidths[5], align: 'center' });
                    doc.text('Reason', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], startY + 10, { width: columnWidths[6], align: 'center' });
                    doc.text('Remark', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], startY + 10, { width: columnWidths[7], align: 'center' });
                    doc.text('Followup', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], startY + 10, { width: columnWidths[8], align: 'center' });

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

                        doc.text(row.name, startX + columnWidths[0], y + 10, { width: columnWidths[1], align: 'left' });
                        doc.text(row.mobile, startX + columnWidths[0] + columnWidths[1], y + 10, { width: columnWidths[2], align: 'center' });
                        doc.text(row.email, startX + columnWidths[0] + columnWidths[1] + columnWidths[2], y + 10, { width: columnWidths[3], align: 'center' });
                        doc.text(row.appointmentDate, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y + 10, { width: columnWidths[4], align: 'center' });
                        doc.text(row.appointmentTime, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], y + 10, { width: columnWidths[5], align: 'left' });
                        doc.text(row.reason, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], y + 10, { width: columnWidths[6], align: 'center' });
                        doc.text(row.remark, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], y + 10, { width: columnWidths[7], align: 'center' });
                        doc.text(row.followup === '' ? 'Pending' : row.followup, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], y + 10, { width: columnWidths[8], align: 'center' });

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


                connection.query('SELECT * FROM prospects WHERE type=? AND addedBy=?', ['prospect', id], function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Error fetching information.' });
                    }

                    const workbook = new excel.Workbook();
                    const worksheet = workbook.addWorksheet('Entries');

                    // Define worksheet columns
                    worksheet.columns = [
                        { header: 'ID', key: 'id', width: 15 },
                        { header: 'Name', key: 'name', width: 20 },
                        { header: 'Mobile', key: 'mobile', width: 15 },
                        { header: 'Email', key: 'email', width: 25 },
                        { header: 'Appointment Date', key: 'appointmentDate', width: 15 },
                        { header: 'Appointment Time', key: 'appointmentTime', width: 15 },
                        { header: 'Reason', key: 'reason', width: 15 },
                        { header: 'Remark', key: 'remark', width: 15 },
                        { header: 'Followup', key: 'followup', width: 20 },
                    ];

                    // Add rows to worksheet
                    results.forEach((row, i) => {
                        worksheet.addRow({
                            id: i + 1,
                            name: row.name,
                            mobile: row.mobile,
                            email: row.email,
                            appointmentDate: row.appointmentDate,
                            appointmentTime: row.appointmentTime,
                            reason: row.reason,
                            remark: row.remark,
                            followup: row.followup === '' ? 'Pending' : row.followup,

                        });
                    });

                    // Set response headers for file download
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.setHeader('Content-Disposition', 'attachment; filename=entries.xlsx');

                    // Write to response
                    workbook.xlsx.write(res).then(() => {
                        res.end();
                    }).catch((err) => {
                        console.error('Error writing Excel file', err);
                        res.status(500).json({ msg: 'Error generating Excel file.' });
                    });
                });

            }
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getTodaysFollowUpReports: async (req, res) => {
        try {
            const { type } = req.query
            const { id } = req.rootUser

            // Get today's date in 'YYYY-MM-DD' format
            const today = new Date().toISOString().split('T')[0];


            if (type === 'pdf') {
                // Query the users table for records
                connection.query(`SELECT * FROM prospects WHERE addedBy='${id}' AND type='prospect' AND DATE(updatedAt) = '${today}' AND followup='done' ORDER BY updatedAt DESC`, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Error fetching information.' });
                    }

                    // Create a new PDF document with custom size (700x1000 points) and 10px margin
                    const customWidth = 1500;
                    const customHeight = 1000;
                    const margin = 10;
                    const doc = new PDFDocument({ size: [customWidth, customHeight], margin });

                    let buffers = [];
                    doc.on('data', buffers.push.bind(buffers));
                    doc.on('end', () => {
                        let pdfData = Buffer.concat(buffers);
                        // fs.writeFileSync('output.pdf', pdfData);

                        // Uncomment for server response
                        res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(pdfData),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=subscription_report.pdf',
                        }).end(pdfData);
                    });

                    // Add title and dates to the PDF document
                    doc.fontSize(25).text('Today Appointments Report', { align: 'center' });
                    doc.fontSize(12).fillColor('black')
                        .text(`Date: ${new Date()}`, { align: 'right' })

                    doc.moveDown();

                    // Define table column widths (100% width of custom page minus margins)
                    const pageWidth = customWidth - 2 * margin; // Total width minus 2*10px margins
                    const columnWidths = [
                        pageWidth * 0.05,  // 5% for ID
                        pageWidth * 0.2,  // 20% for Name
                        pageWidth * 0.1, // 15% for Mobile
                        pageWidth * 0.2,  // 20% for Email
                        pageWidth * 0.05, // 5% for DOB
                        pageWidth * 0.05,  // 10% for Gender
                        pageWidth * 0.1,  // 10% for Status
                        pageWidth * 0.1,  // 10% for Target
                        pageWidth * 0.15   // 10% for SubscriptionType
                    ];
                    const rowHeight = 30;
                    const startX = margin; // Start X position for the table (left margin)
                    const startY = doc.y; // Start Y position for the table

                    // Draw table headers
                    doc.fontSize(12).fillColor('white').rect(startX, startY, pageWidth, rowHeight).fill('blue');
                    doc.fillColor('white');
                    doc.text('ID', startX, startY + 10, { width: columnWidths[0], align: 'center' });
                    doc.text('Name', startX + columnWidths[0], startY + 10, { width: columnWidths[1], align: 'center' });
                    doc.text('Email', startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY + 10, { width: columnWidths[3], align: 'center' });
                    doc.text('Mobile', startX + columnWidths[0] + columnWidths[1], startY + 10, { width: columnWidths[2], align: 'center' });
                    doc.text('Appointment Date', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY + 10, { width: columnWidths[4], align: 'center' });
                    doc.text('Appointment Time', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], startY + 10, { width: columnWidths[5], align: 'center' });
                    doc.text('Reason', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], startY + 10, { width: columnWidths[6], align: 'center' });
                    doc.text('Remark', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], startY + 10, { width: columnWidths[7], align: 'center' });
                    doc.text('Followup', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], startY + 10, { width: columnWidths[8], align: 'center' });

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

                        doc.text(row.name, startX + columnWidths[0], y + 10, { width: columnWidths[1], align: 'left' });
                        doc.text(row.mobile, startX + columnWidths[0] + columnWidths[1], y + 10, { width: columnWidths[2], align: 'center' });
                        doc.text(row.email, startX + columnWidths[0] + columnWidths[1] + columnWidths[2], y + 10, { width: columnWidths[3], align: 'center' });
                        doc.text(row.appointmentDate, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y + 10, { width: columnWidths[4], align: 'center' });
                        doc.text(row.appointmentTime, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], y + 10, { width: columnWidths[5], align: 'left' });
                        doc.text(row.reason, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], y + 10, { width: columnWidths[6], align: 'center' });
                        doc.text(row.remark, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], y + 10, { width: columnWidths[7], align: 'center' });
                        doc.text(row.followup === '' ? 'Pending' : row.followup, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], y + 10, { width: columnWidths[8], align: 'center' });

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


                connection.query(`SELECT * FROM prospects WHERE addedBy='${id}' AND type='prospect' AND DATE(updatedAt) = '${today}' AND followup='done' ORDER BY updatedAt DESC`, function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Error fetching information.' });
                    }

                    const workbook = new excel.Workbook();
                    const worksheet = workbook.addWorksheet('Entries');

                    // Define worksheet columns
                    worksheet.columns = [
                        { header: 'ID', key: 'id', width: 15 },
                        { header: 'Name', key: 'name', width: 20 },
                        { header: 'Mobile', key: 'mobile', width: 15 },
                        { header: 'Email', key: 'email', width: 25 },
                        { header: 'Appointment Date', key: 'appointmentDate', width: 15 },
                        { header: 'Appointment Time', key: 'appointmentTime', width: 15 },
                        { header: 'Reason', key: 'reason', width: 15 },
                        { header: 'Remark', key: 'remark', width: 15 },
                        { header: 'Followup', key: 'followup', width: 20 },
                    ];

                    // Add rows to worksheet
                    results.forEach((row, i) => {
                        worksheet.addRow({
                            id: i + 1,
                            name: row.name,
                            mobile: row.mobile,
                            email: row.email,
                            appointmentDate: row.appointmentDate,
                            appointmentTime: row.appointmentTime,
                            reason: row.reason,
                            remark: row.remark,
                            followup: row.followup === '' ? 'Pending' : row.followup,

                        });
                    });

                    // Set response headers for file download
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.setHeader('Content-Disposition', 'attachment; filename=entries.xlsx');

                    // Write to response
                    workbook.xlsx.write(res).then(() => {
                        res.end();
                    }).catch((err) => {
                        console.error('Error writing Excel file', err);
                        res.status(500).json({ msg: 'Error generating Excel file.' });
                    });
                });

            }
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

}