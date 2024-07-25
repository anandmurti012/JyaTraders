const connection = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { saveimage } = require("../utils/saveimage");
const { extractFullName } = require("../utils/extractFullName");
const { sendPasswordRecoveryEmail } = require("../utils/sendPasswordRecoveryEmail");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.adminController = {
    signup: async (req, res) => {
        try {
            // console.log(req.body);
            const { fullName, adminId, password, type, address, email, mobile } = req.body;

            connection.query(`SELECT adminId FROM admins WHERE adminId='${adminId}'`, async function (error, result) {
                if (error) {
                    // console.log(error)
                    return res.status(404).json({ msg: error.sqlMessage });
                } else {
                    // console.log(result.length);
                    if (result.length > 0) {
                        return res.status(409).json({ msg: "User Already Exist." });
                    } else {
                        const file = await saveimage('admins', req.file);
                        // console.log(file);

                        const adminName = await extractFullName(fullName)

                        const newUsers = {
                            fullName: fullName,
                            firstName: adminName.firstName,
                            middleName: adminName.middleName,
                            lastName: adminName.lastName,
                            adminId: adminId,
                            password: await bcrypt.hash(password, 12),
                            type: type,
                            image: file.newFileName,
                            address: address,
                            mobile: mobile,
                            email: email,
                            createdAt: new Date()
                        };

                        connection.query(`INSERT INTO admins SET?`, newUsers, function (error, results, fields) {
                            if (error) {
                                // console.log(error);
                                return res.status(500).json({ msg: error.sqlMessage });
                            } else {
                                console.log("1 record inserted");
                                return res.status(201).json({ msg: "Admin Successfully Created" });
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
            const { adminId, password } = req.body;

            connection.query(`SELECT * FROM admins WHERE adminId='${adminId}'`, async (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: error.sqlMessage || 'Database query error' });
                } else {
                    if (results.length === 0) {
                        // No user found with that adminId
                        return res.status(404).json({ msg: 'User not found' });
                    }
                    const user = results[0];

                    try {
                        // Compare the provided password with the hashed password in the database
                        const isMatch = await bcrypt.compare(password, user.password);

                        if (isMatch) {

                            const token = jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '30d' });
                            // console.log(jwt.verify(token,JWT_SECRET))

                            return res.status(200).json({ token: token, user: user, msg: 'Login successful' });
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
            console.log(req.body);
            const { email } = req.body;

            connection.query(`SELECT email,fullName FROM admins WHERE email='${email}'`, async (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: error.sqlMessage || 'Database query error' });
                } else {
                    if (results.length === 0) {
                        // No user found with that email
                        return res.status(404).json({ msg: 'User not found' });
                    }
                    const user = results[0];
                    const token = jwt.sign({ type: 'admin', email: user.email }, JWT_SECRET, { expiresIn: '5m' });
                    // console.log(jwt.verify(token,JWT_SECRET))


                    await sendPasswordRecoveryEmail({
                        user: {
                            name: user.fullName,
                            email: user.email,
                            resetLink: `http://localhost:3000/adminNewPwd/${token}`
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
                connection.query(`SELECT email FROM admins WHERE email='${email}'`, async (error, results) => {
                    if (error) {
                        return res.status(500).json({ msg: error.sqlMessage || 'Database query error' });
                    } else {
                        if (results.length === 0) {
                            // No user found with that email
                            return res.status(404).json({ msg: 'User not found' });
                        }
                        // const user = results[0];
                        connection.query(`UPDATE admins SET password = '${await bcrypt.hash(nPassword, 12)}' WHERE email='${email}'`, function (err, result) {
                            if (err) {
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

}