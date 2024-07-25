const connection = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { saveimage } = require("../utils/saveimage");
const { extractFullName } = require("../utils/extractFullName");
const { sendPasswordRecoveryEmail } = require("../utils/sendPasswordRecoveryEmail");
const path = require('path')
const fs = require('fs')
const PDFDocument = require('pdfkit');
const excel = require('exceljs');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.userController = {
    signup: async (req, res) => {
        try {
            const { fullName, email, mobile, password, dob, gender, aadharId, addedBy } = req.body;

            connection.query(`SELECT email FROM users WHERE email='${email}'`, async function (error, result) {
                if (error) {
                    return res.status(404).json({ msg: error.sqlMessage });
                } else {
                    // console.log(result.length);
                    if (result.length > 0) {
                        return res.status(409).json({ msg: "User Already Exist." });
                    } else {

                        const file = await saveimage('users', req.file);
                        // console.log(file);

                        const userName = await extractFullName(fullName)

                        const newUsers = {
                            fullName: fullName,
                            firstName: userName.firstName,
                            middleName: userName.middleName,
                            lastName: userName.lastName,
                            dob: dob,
                            gender: gender,
                            email: email,
                            mobile: mobile,
                            aadharId: aadharId,
                            addedBy: addedBy ? addedBy : 'self',
                            image: file.newFileName,
                            password: await bcrypt.hash(password, 12),
                            isActive: true,
                            createdAt: new Date()
                        };

                        connection.query(`INSERT INTO users SET?`, newUsers, function (error, results, fields) {
                            if (error) {
                                // console.log(error);
                                return res.status(404).json({ msg: error.sqlMessage });
                            } else {
                                console.log("1 record inserted");
                                const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
                                // console.log(jwt.verify(token,JWT_SECRET))


                                return res.status(201).json({ token: token, user: newUsers, msg: "Successfully Created" });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    login: async (req, res) => {
        try {
            // console.log(req.body);
            const { email, password } = req.body;

            connection.query(`SELECT * FROM users WHERE email='${email}'`, async (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: error.sqlMessage || 'Database query error' });
                } else {
                    if (results.length === 0) {
                        // No user found with that email
                        return res.status(404).json({ msg: 'User not found' });
                    }
                    const user = results[0];

                    try {
                        // Compare the provided password with the hashed password in the database
                        const isMatch = await bcrypt.compare(password, user.password);

                        if (isMatch) {

                            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
                            // console.log(jwt.verify(token,JWT_SECRET))

                            return res.status(200).json({ user: user, token: token, msg: 'Login successful' });
                        } else {
                            return res.status(401).json({ msg: 'Invalid credentials' });
                        }
                    } catch (compareError) {
                        console.error('Error comparing passwords:', compareError);
                        return res.status(500).json({ msg: 'Error comparing passwords' });
                    }
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    sendPasswordRecoveryEmail: async (req, res) => {
        try {
            // console.log(req.body);
            const { email } = req.body;

            connection.query(`SELECT email,fullName FROM users WHERE email='${email}'`, async (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: error.sqlMessage || 'Database query error' });
                } else {
                    if (results.length === 0) {
                        // No user found with that email
                        return res.status(404).json({ msg: 'User not found' });
                    }
                    const user = results[0];
                    const token = jwt.sign({ type: 'user', email: user.email }, JWT_SECRET, { expiresIn: '5m' });
                    // console.log(jwt.verify(token,JWT_SECRET))


                    await sendPasswordRecoveryEmail({
                        user: {
                            name: user.fullName,
                            email: user.email,
                            resetLink: `http://localhost:3000/userNewPwd/${token}`
                        }
                    });

                    return res.status(200).json({ msg: 'Email Successfully Send' });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { nPassword, token } = req.body;
            try {
                const { type, email } = jwt.verify(token, JWT_SECRET)
                connection.query(`SELECT email FROM users WHERE email='${email}'`, async (error, results) => {
                    if (error) {
                        return res.status(500).json({ msg: error.sqlMessage || 'Database query error' });
                    } else {
                        if (results.length === 0) {
                            // No user found with that email
                            return res.status(404).json({ msg: 'User not found' });
                        }
                        // const user = results[0];
                        connection.query(`UPDATE users SET password = '${await bcrypt.hash(nPassword, 12)}' WHERE email='${email}'`, function (error, result) {
                            if (error) {
                                console.log(error)
                                return res.status(500).json({ msg: 'Error Updating Password.' });
                            };
                            return res.status(200).json({ msg: 'Password Successfully Updated.' });
                        });
                    }
                });

            } catch (error) {
                console.log('Invalid Token or Expire Token')
            }
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { id, firstName, middleName, lastName, dob, gender, aadharId } = req.body

            const fullName = firstName + " " + middleName + " " + lastName

            connection.query(`UPDATE users SET fullName='${fullName}', firstName='${firstName}', middleName='${middleName}', lastName='${lastName}', dob='${dob}', gender='${gender}', aadharId='${aadharId}' WHERE id='${id}'`, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ msg: 'Error Updating Information.' });
                };
                return res.status(200).json({ msg: 'Successfully Update' });
            });

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateProfileImage: async (req, res) => {
        try {
            const { prev_img } = req.body
            const { id } = req.rootUser

            const file = await saveimage('users', req.file);
            connection.query(`UPDATE users SET image='${file.newFileName}' WHERE id='${id}'`, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ msg: 'Error Updating Information.' });
                };

                const fullPath = path.join(__dirname, `../uploads/users/${prev_img}`);
                fs.unlink(fullPath, async (err) => {
                    if (err) {
                        console.error('Error deleting file:');
                    } else {
                        console.log('File deleted successfully:', fullPath);
                    }
                });
                return res.status(200).json({ image: file.newFileName, msg: 'Successfully Update' });
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getUsers: async (req, res) => {
        try {
            const { searchTerm, subscriptionType, status } = req.query;

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

                let baseQuery = `SELECT * FROM users WHERE 1=1`;
                let baseCountQuery = `SELECT COUNT(*) AS total FROM users WHERE 1=1`;

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
                if (sanitizedSearchTerm && subscriptionType) {
                    baseQuery += `AND (LOWER(fullName) LIKE ? OR LOWER(mobile) LIKE ? OR LOWER(email) LIKE ?) OR subscriptionType = ?`;
                    baseCountQuery += `AND (LOWER(fullName) LIKE ? OR LOWER(mobile) LIKE ? OR LOWER(email) LIKE ?) OR subscriptionType = ?`;
                    countQueryParams.push(sanitizedSearchTerm, sanitizedSearchTerm, sanitizedSearchTerm, subscriptionType);
                    dataQueryParams.unshift(sanitizedSearchTerm, sanitizedSearchTerm, sanitizedSearchTerm, subscriptionType);
                }
                countQuery = baseCountQuery;
                dataQuery = `${baseQuery} LIMIT ? OFFSET ?`;
            } else if (status) {
                // Sanitize and prepare the search term for case-insensitive search
                const sanitizedSearchTerm = searchTerm ? `%${searchTerm.trim().toLowerCase()}%` : null;

                let baseQuery = `SELECT * FROM users WHERE 1=1`;
                let baseCountQuery = `SELECT COUNT(*) AS total FROM users WHERE 1=1`;

                if (status) {
                    baseQuery += ` AND isActive = ?`;
                    baseCountQuery += ` AND isActive = ?`;
                    countQueryParams.push(status);
                    dataQueryParams.unshift(status);
                }

                countQuery = baseCountQuery;
                dataQuery = `${baseQuery} LIMIT ? OFFSET ?`;
            } else {
                countQuery = `SELECT COUNT(*) AS total FROM users`;
                dataQuery = `SELECT * FROM users LIMIT ? OFFSET ?`;
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
    addUserSubscription: async (req, res) => {
        try {
            const { userId, type } = req.body
            connection.query(`UPDATE users SET isSubscribe = ${true}, subscriptionDate = '${new Date()}', subscriptionType = '${type}' WHERE id='${userId}'`, function (error, result) {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ msg: 'Error Updating Password.' });
                };
                return res.status(200).json({ msg: 'Password Successfully Updated.' });
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    activeDeactiveUsers: async (req, res) => {
        try {
            const { userId, activeStatus } = req.body
            connection.query(`UPDATE users SET 	isActive=${activeStatus === 0 ? true : false} WHERE id='${userId}'`, function (error, result) {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ msg: 'Error Updating Password.' });
                };
                return res.status(200).json({ msg: 'Password Successfully Updated.' });
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getUsersReport: async (req, res) => {
        try {
            const { type } = req.query

            if (type === 'pdf') {

                // Query the users table for records
                connection.query(`SELECT * FROM users`, function (err, result) {
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
                    doc.fontSize(25).text('User Report', { align: 'center' });
                    doc.fontSize(12).fillColor('black')
                        .text(`Date: ${new Date()}`, { align: 'right' })

                    doc.moveDown();

                    // Define table column widths (100% width of custom page minus margins)
                    const pageWidth = customWidth - 2 * margin; // Total width minus 2*10px margins
                    const columnWidths = [
                        pageWidth * 0.05,  // 5% for ID
                        pageWidth * 0.2,  // 20% for Name
                        pageWidth * 0.05, // 5% for DOB
                        pageWidth * 0.05,  // 10% for Gender
                        pageWidth * 0.1, // 15% for Mobile
                        pageWidth * 0.2,  // 20% for Email
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
                    doc.text('DOB', startX + columnWidths[0] + columnWidths[1], startY + 10, { width: columnWidths[2], align: 'center' });
                    doc.text('Gender', startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY + 10, { width: columnWidths[3], align: 'center' });
                    doc.text('Mobile', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY + 10, { width: columnWidths[4], align: 'center' });
                    doc.text('Email', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], startY + 10, { width: columnWidths[5], align: 'center' });
                    doc.text('Status', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], startY + 10, { width: columnWidths[6], align: 'center' });
                    doc.text('Target', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], startY + 10, { width: columnWidths[7], align: 'center' });
                    doc.text('SubscriptionType', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], startY + 10, { width: columnWidths[8], align: 'center' });

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
                        doc.text(new Date(row.dob).toLocaleDateString(), startX + columnWidths[0] + columnWidths[1], y + 10, { width: columnWidths[2], align: 'center' });
                        doc.text(row.gender, startX + columnWidths[0] + columnWidths[1] + columnWidths[2], y + 10, { width: columnWidths[3], align: 'center' });
                        doc.text(row.mobile, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y + 10, { width: columnWidths[4], align: 'center' });
                        doc.text(row.email, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], y + 10, { width: columnWidths[5], align: 'left' });
                        doc.text(row.isActive === 1 ? 'Active' : 'Inactive', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], y + 10, { width: columnWidths[6], align: 'center' });
                        doc.text(row.isSetTarget === 1 ? 'Set' : 'N/A', startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], y + 10, { width: columnWidths[7], align: 'center' });
                        doc.text(row.subscriptionType === "" ? 'N/A' : row.subscriptionType, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], y + 10, { width: columnWidths[8], align: 'center' });

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


                connection.query(`SELECT * FROM users`, function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Error fetching information.' });
                    }

                    const workbook = new excel.Workbook();
                    const worksheet = workbook.addWorksheet('Entries');

                    // Define worksheet columns
                    worksheet.columns = [
                        { header: 'ID', key: 'id', width: 15 },
                        { header: 'Name', key: 'fullName', width: 20 },
                        { header: 'DOB', key: 'dob', width: 15 },
                        { header: 'Gender', key: 'gender', width: 15 },
                        { header: 'Mobile', key: 'mobile', width: 15 },
                        { header: 'Email', key: 'email', width: 25 },
                        { header: 'Status', key: 'status', width: 15 },
                        { header: 'Target', key: 'target', width: 15 },
                        { header: 'SubscriptionType', key: 'subscriptionPlan', width: 20 },
                    ];

                    // Add rows to worksheet
                    results.forEach((row, i) => {
                        worksheet.addRow({
                            id: i + 1,
                            fullName: row.fullName,
                            dob: row.dob,
                            gender: row.gender,
                            mobile: row.mobile,
                            email: row.email,
                            status: row.isActive ? 'Active' : 'Inactive',
                            target: row.isSetTarget ? "Set" : 'N/A',
                            subscriptionPlan: row.subscriptionType ? row.subscriptionType : 'N/A',
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