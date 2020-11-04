
const express = require('express');
/* Modules */
const payment = require('../../controller/payment');
/* End of Modules */


const router = express.Router();

router.post('/payment/order', async (req, res, next) => {
    const data = {
        body: req.body,
        query: req.query,
        params: req.params,
    };
    const response = await payment.createOrder(data);
    res.status(response.statusCode).send(response.body);
    next();
});

module.exports = router;