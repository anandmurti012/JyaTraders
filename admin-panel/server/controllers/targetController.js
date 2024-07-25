const connection = require("../database/db");
const dotenv = require('dotenv');
dotenv.config();


module.exports.targetController = {
    setTarget: async (req, res) => {
        try {
            const { MDRT, COT, TOT } = req.body
            const newdata = {
                mdrt: MDRT,
                cot: COT,
                tot: TOT,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            connection.query(`INSERT INTO targets SET?`, newdata, function (error, results, fields) {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    console.log("1 record inserted");
                    return res.status(201).json({ msg: "Target Successfully Created" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getTargets: async (req, res) => {
        try {
            connection.query(`SELECT * FROM targets LIMIT 1`, async (error, results) => {
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
    updateTarget: async (req, res) => {
        try {
            const { id, mdrt, cot, tot } = req.body

            connection.query(`UPDATE targets SET mdrt='${mdrt}',cot='${cot}',tot='${tot}', updatedAt='${new Date()}' WHERE id='${id}'`, async (error, results) => {
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
    addTarget: async (req, res) => {
        try {
            const { id } = req.rootUser
            const { type, amount } = req.body

            connection.query(`UPDATE users SET isSetTarget=${true} WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const newdata = {
                        userId: id,
                        type: type,
                        amount: amount,
                        createdAt: new Date()
                    };
                    connection.query(`INSERT INTO targets_history SET?`, newdata, function (error, results, fields) {
                        if (error) {
                            // console.log(error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            console.log("1 record inserted");
                            return res.status(201).json({ results: { isSetTarget: 1 }, msg: "Target Successfully Set" });
                        }
                    });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getMyTargets: async (req, res) => {
        try {
            const { id } = req.rootUser
            connection.query(`SELECT * FROM targets_history WHERE userId='${id}' ORDER BY createdAt DESC LIMIT 1`, async (error, results) => {
                if (error) {
                    console.log(error);
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
    getTargetsDetails: async (req, res) => {
        try {
            const { id } = req.rootUser
            connection.query(`SELECT * FROM targets_history WHERE userId='${id}' ORDER BY id DESC LIMIT 1`, async (error, results) => {
                if (error) {
                    console.log(error);
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


}