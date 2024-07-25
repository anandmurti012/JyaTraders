const express = require('express');
const { verifyUserToken } = require('../middleware/VerifyUser');
const { paymentController } = require('../controllers/paymentController');

const paymentRouter = express.Router();

paymentRouter.post('/paymenyCheckout',verifyUserToken,paymentController.checkout );
paymentRouter.post('/paymenyVerify',verifyUserToken,paymentController.verify );


module.exports = { paymentRouter };