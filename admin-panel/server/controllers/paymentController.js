const Razorpay = require('razorpay');
const connection = require('../database/db');
const crypto = require('crypto');
const { BSON } = require('bson');
const dotenv = require('dotenv');
dotenv.config();


module.exports.paymentController = {
    checkout: async (req, res) => {
        try {
            const { id, plan, amount, } = req.body.data;
            const { fullName, email, mobile, aadharId } = req.rootUser;

            var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })
            const d = await instance.orders.create({
                amount: Number(amount) * 100,
                currency: "INR",
                receipt: email + '_' + Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1,
                notes: {
                    subscriptionId: id,
                    userId: req.rootUser.id,
                    amount: Number(amount),
                    subscriptionType: plan,
                    fullName: fullName,
                    email: email,
                    mobile: mobile,
                    aadharId: aadharId,
                },
            });
            // console.log(d);

            res.status(200).json({ msg: 'success', data: d });
        } catch (error) {
            console.log('Backend Server Error', error);
            res.status(500).json({ msg: 'Backend Server Error' });
        }
    },
    verify: async (req, res) => {
        try {
            let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

            var expectedSignature = crypto.createHmac('sha256', process.env.key_secret)
                .update(body.toString())
                .digest('hex');

            if (expectedSignature === req.body.response.razorpay_signature) {

                const { subscriptionId, userId, amount, subscriptionType, fullName, email, mobile, aadharId } = req.body.data.notes
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body.response

                const purchaseData = {
                    subscriptionId: subscriptionId,
                    userId: userId,
                    amount: amount,
                    subscriptionType: subscriptionType,
                    fullName: fullName,
                    email: email,
                    mobile: mobile,
                    aadharId: aadharId,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_order_id: razorpay_order_id,
                    razorpay_signature: razorpay_signature,
                    createdAt: new Date(),
                    expiryDate: new Date(new Date().getFullYear(), 11, 31)
                }

                connection.query(`INSERT INTO purchase_history SET?`, purchaseData, function (error, results, fields) {
                    if (error) {
                        // console.log(error);
                        return res.status(404).json({ msg: error.sqlMessage });
                    } else {
                        // console.log(userId, subscriptionType, new Date(), new Date(new Date().getFullYear(), 11, 31), amount);
                        connection.query(`UPDATE users SET isSubscribe=${true}, subscriptionType='${subscriptionType}', subscriptionDate='${new Date()}', subscriptionAmount='${amount}', subscriptionExpiryDate='${new Date(new Date().getFullYear(), 11, 31)}' WHERE id='${userId}'`, async (error, results) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ msg: error.sqlMessage });
                            } else {
                                // console.log('verify', results);
                                connection.query(`SELECT * FROM users WHERE id='${userId}'`, async (error, results) => {
                                    if (error) {
                                        console.log(error);
                                        return res.status(500).json({ msg: error.sqlMessage });
                                    } else {
                                        // console.log('verify', results);
                                        return res.status(200).json({
                                            result: results[0], msg: 'Sign Valid'
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                console.log('failed')
                return res.status(500).json({ msg: 'Sign Invalid' });
            }
        } catch (error) {
            console.log('Backend Server Error', error);
            res.status(500).json({ msg: 'Backend Server Error' });
        }
    }

}