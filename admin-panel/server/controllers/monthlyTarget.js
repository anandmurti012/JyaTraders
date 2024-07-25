const connection = require("../database/db");
const dotenv = require('dotenv');
dotenv.config();


module.exports.monthlyTargetController = {
    setTarget: async (req, res) => {
        try {
            const { id } = req.rootUser
            const userId = id;
            const createdAt = new Date()

            const monthlyTargets = req.body
            const values = Object.keys(monthlyTargets).map((month) => [
                userId,
                month,
                monthlyTargets[month].mdrtcomm,
                monthlyTargets[month].nop,
                monthlyTargets[month].fpi_sp,
                monthlyTargets[month].fpi_nsp,
                createdAt
            ]);

            //---------------------------------

            await connection.query(`SELECT * FROM monthly_targets WHERE userId ='${userId}'`, async (err, result) => {
                if (err) {
                    return res.status(500).json({ msg: err.sqlMessage });
                } else {
                    if (result.length > 0) {
                        // Execute the update query for each monthly target
                        for (let month in monthlyTargets) {
                            const { mdrtcomm, nop, fpi_sp, fpi_nsp } = monthlyTargets[month];
                            const updatedAt = new Date();
                            const params = [month, mdrtcomm, nop, fpi_sp, fpi_nsp, updatedAt, userId, month];

                            await connection.query(`UPDATE monthly_targets SET 
                                month = ?,
                                mdrtcomm = ?,
                                nop = ?,
                                fpi_sp = ?,
                                fpi_nsp = ?,
                                updatedAt = ? WHERE userId = ? AND month = ?`, params, (err, result) => {
                                if (err) {
                                    return res.status(500).json({ msg: err.sqlMessage });
                                } else {
                                    // console.log(`${result.affectedRows} record(s) updated for month ${month}`);
                                }
                            });
                        }
                        return res.status(201).json({ msg: 'Monthly targets saved successfully!' });
                    } else {
                        // SQL query to insert or update monthly targets
                        const sql = `
                            INSERT INTO monthly_targets (userId, month, mdrtcomm, nop, fpi_sp, fpi_nsp,createdAt)
                            VALUES ?
                            ON DUPLICATE KEY UPDATE
                                mdrtcomm = VALUES(mdrtcomm),
                                nop = VALUES(nop),
                                fpi_sp = VALUES(fpi_sp),
                                fpi_nsp = VALUES(fpi_nsp),
                                createdAt = VALUES(createdAt)`;
                        // Execute the query using the database connection pool
                        await connection.query(sql, [values]);
                        return res.status(201).json({ msg: 'Monthly targets saved successfully!' });
                    }
                }
            });

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getTargets: async (req, res) => {
        try {
            const { id } = req.rootUser
            await connection.query(`SELECT * FROM monthly_targets WHERE userId=${id}`, async (err, results) => {
                if (err) {
                    return res.status(500).json({ msg: err.sqlMessage });
                } else {
                    return res.status(200).json({ msg: "Successfully fetch", results: results });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },


}