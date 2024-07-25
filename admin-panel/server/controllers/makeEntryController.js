const connection = require("../database/db");
const dotenv = require('dotenv');
const excel = require('exceljs');
dotenv.config();


module.exports.makeEntryController = {
    makeEntry: async (req, res) => {
        try {
            const { mdrtComm, nop, fpiSp, fpiNsp, date } = req.body

            const { id } = req.rootUser

            const newdata = {
                userId: id,
                mdrtComm: mdrtComm,
                nop: nop,
                fpiSp: fpiSp,
                fpiNsp: fpiNsp,
                createdAt: new Date(date),
            };

            connection.query(`INSERT INTO make_entry SET?`, newdata, function (error, results, fields) {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    console.log("1 record inserted");
                    return res.status(201).json({ msg: "Today's entry successfully saved" });
                }
            });

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateEntry: async (req, res) => {
        try {
            const { id, mdrtComm, fpiSp, fpiNsp, nop } = req.body

            connection.query(`UPDATE make_entry SET mdrtComm='${mdrtComm}', fpiSp='${fpiSp}', fpiNsp='${fpiNsp}', nop='${nop}' WHERE id='${id}'`, async (error, results) => {
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
    getEntry: async (req, res) => {
        try {

            const { id } = req.rootUser;
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const startDate = new Date();
            const currentYear = startDate.getFullYear();
            const fromDateDefault = `${currentYear}-01-01`; // January 1st of last year

            const fromDate = req.query.fromDate || fromDateDefault
            // new Date().toISOString().split('T')[0];

            const today = req.query.toDate ? new Date(req.query.toDate) : new Date()
            today.setDate(today.getDate() + 1); // Add 1 day to the current date
            const tomorrow = today.toISOString().split('T')[0];

            const toDate = tomorrow;

            const countQuery = `SELECT COUNT(*) AS total FROM make_entry WHERE userId = ? AND createdAt BETWEEN ? AND ?`;
            const dataQuery = `SELECT * FROM make_entry WHERE userId = ? AND createdAt BETWEEN ? AND ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`;

            connection.query(countQuery, [id, fromDate, toDate], (error, countResults) => {
                if (error) {
                    console.error('Error counting entries:', error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const totalEntries = countResults[0].total;
                    const totalPages = Math.ceil(totalEntries / limit);

                    connection.query(dataQuery, [id, fromDate, toDate, limit, offset], (error, results) => {
                        if (error) {
                            console.error('Error fetching entries:', error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            return res.status(200).json({ results: results, totalPages: totalPages, msg: "Successfully fetched entries" });
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Backend Server Error:', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    exportEntries: async (req, res) => {
        try {
            const { id } = req.rootUser;
            const startDate = new Date();

            const currentYear = startDate.getFullYear();
            const fromDateDefault = `${currentYear - 1}-01-01`; // January 1st of last year

            const fromDate = req.query.fromDate || fromDateDefault
            // new Date().toISOString().split('T')[0];

            const today = req.query.toDate ? new Date(req.query.toDate) : new Date()
            today.setDate(today.getDate() + 1); // Add 1 day to the current date
            const tomorrow = today.toISOString().split('T')[0];

            const toDate = tomorrow;

            const query = `SELECT * FROM make_entry WHERE userId = ? AND createdAt BETWEEN ? AND ? ORDER BY createdAt DESC`;
            connection.query(query, [id, fromDate, toDate], (error, results) => {
                if (error) {
                    console.error('Error fetching entries:', error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const workbook = new excel.Workbook();
                    const worksheet = workbook.addWorksheet('Entries');

                    worksheet.columns = [
                        { header: 'Entry Date', key: 'createdAt', width: 15 },
                        { header: 'MDRT Commission', key: 'mdrtComm', width: 20 },
                        { header: 'NOP', key: 'nop', width: 15 },
                        { header: 'FPI(SP)', key: 'fpiSp', width: 15 },
                        { header: 'FPI(NSP)', key: 'fpiNsp', width: 15 },
                    ];

                    results.forEach(entry => {
                        worksheet.addRow({
                            createdAt: entry.createdAt,
                            mdrtComm: entry.mdrtComm,
                            nop: entry.nop,
                            fpiSp: entry.fpiSp,
                            fpiNsp: entry.fpiNsp,
                        });
                    });

                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.setHeader('Content-Disposition', 'attachment; filename=entries.xlsx');

                    workbook.xlsx.write(res).then(() => {
                        res.end();
                    });
                }
            });
        } catch (error) {
            console.error('Backend Server Error:', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    getCommissions: async (req, res) => {
        try {
            const { id } = req.rootUser;
            const { type } = req.query;

            // Ensure type is valid
            const validTypes = ['mdrtComm', 'nop', 'fpiSp', 'fpiNsp'];
            if (!validTypes.includes(type)) {
                return res.status(400).json({ msg: "Invalid commission type" });
            }

            // Get the current year
            const currentYear = new Date().getFullYear();

            // Function to get month name from month number (1-12)
            const getMonthName = (monthNumber) => {
                const months = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];
                return months[monthNumber - 1] || '';
            };

            try {
                // Query to fetch data grouped by month for the current year
                const query = `SELECT 
                                    MONTH(createdAt) AS month,
                                    SUM(mdrtComm) AS mdrtCommTotal,
                                    SUM(nop) AS nopTotal,
                                    SUM(fpiSp) AS fpiSpTotal,
                                    SUM(fpiNsp) AS fpiNspTotal
                                FROM 
                                    make_entry 
                                WHERE userId=${id} AND YEAR(createdAt)=${currentYear}
                                GROUP BY 
                                    MONTH(createdAt)
                                ORDER BY 
                                    MONTH(createdAt)`;

                // Execute query
                const results = await new Promise((resolve, reject) => {
                    connection.query(query, (error, results, fields) => {
                        if (error) {
                            console.error('Error fetching monthly aggregates:', error);
                            reject(error);
                        }
                        resolve(results);
                    });
                });

                // Prepare response with all months from Jan to Dec
                const monthlyAggregates = [];
                const months = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];

                // Initialize with zeros for all months
                months.forEach(month => {
                    monthlyAggregates.push({
                        month: month,
                        mdrtCommTotal: 0,
                        nopTotal: 0,
                        fpiSpTotal: 0,
                        fpiNspTotal: 0
                    });
                });

                // Update totals from database results
                let mdrtCommSum = 0, nopSum = 0, fpiSpSum = 0, fpiNspSum = 0;
                results.forEach(entry => {
                    const monthIndex = entry.month - 1; // Convert month number to index (0-based)
                    monthlyAggregates[monthIndex] = {
                        month: getMonthName(entry.month),
                        mdrtCommTotal: entry.mdrtCommTotal || 0,
                        nopTotal: entry.nopTotal || 0,
                        fpiSpTotal: entry.fpiSpTotal || 0,
                        fpiNspTotal: entry.fpiNspTotal || 0
                    };
                    // Calculate sums
                    mdrtCommSum += entry.mdrtCommTotal || 0;
                    nopSum += entry.nopTotal || 0;
                    fpiSpSum += entry.fpiSpTotal || 0;
                    fpiNspSum += entry.fpiNspTotal || 0;
                });

                // Add sums to the response
                const totals = {
                    mdrtCommSum,
                    nopSum,
                    fpiSpSum,
                    fpiNspSum
                };

                // Return JSON response
                return res.status(200).json({ monthlyAggregates, totals });

            } catch (error) {
                console.error('Backend Server Error:', error);
                return res.status(500).json({ msg: "Backend Server Error" });
            }
        } catch (error) {
            console.error('Backend Server Error:', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    getMdrtCommissions: async (req, res) => {
        try {
            const { id } = req.rootUser;
            const { type } = req.query;

            // Ensure type is valid
            const validTypes = ['mdrtComm', 'nop', 'fpiSp', 'fpiNsp'];
            if (!validTypes.includes(type)) {
                return res.status(400).json({ msg: "Invalid commission type" });
            }

            // Get the current year
            const currentYear = new Date().getFullYear();

            // Function to get month name from month number (1-12)
            const getMonthName = (monthNumber) => {
                const months = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];
                return months[monthNumber - 1] || '';
            };

            try {
                // Query to fetch data grouped by month for the current year
                const query = `SELECT 
                                    MONTH(createdAt) AS month,
                                    SUM(mdrtComm) AS mdrtCommTotal,
                                    SUM(nop) AS nopTotal,
                                    SUM(fpiSp) AS fpiSpTotal,
                                    SUM(fpiNsp) AS fpiNspTotal
                                FROM 
                                    make_entry 
                                WHERE userId=${id} AND YEAR(createdAt)=${currentYear}
                                GROUP BY 
                                    MONTH(createdAt)
                                ORDER BY 
                                    MONTH(createdAt)`;

                // Execute query
                const results = await new Promise((resolve, reject) => {
                    connection.query(query, (error, results, fields) => {
                        if (error) {
                            console.error('Error fetching monthly aggregates:', error);
                            reject(error);
                        }
                        resolve(results);
                    });
                });

                // Update totals from database results
                let mdrtCommSum = 0;
                results.forEach(entry => {
                    // Calculate sums
                    mdrtCommSum += entry.mdrtCommTotal || 0;
                });

                // Add sums to the response
                const totals = {
                    mdrtCommSum
                };

                // Return JSON response
                return res.status(200).json({ totals });

            } catch (error) {
                console.error('Backend Server Error:', error);
                return res.status(500).json({ msg: "Backend Server Error" });
            }
        } catch (error) {
            console.error('Backend Server Error:', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },




}