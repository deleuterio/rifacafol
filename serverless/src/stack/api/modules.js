
const express = require('express');
/* Modules */
const payment = require('../../controller/payment');
const raffle = require('../../controller/raffle');
/* End of Modules */


const router = express.Router();

[...payment, ...raffle].forEach(({ path, method, handler }) => {
    router[method](path, async (req, res, next) => {
        const data = {
            body: req.body,
            query: req.query,
            params: req.params,
        };
        const response = await handler(data);
        res.status(response.statusCode).send(response.body);
        next();
    });
});

module.exports = router;