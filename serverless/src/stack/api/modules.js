
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
        try {
            const response = await handler(data);
            res.status(response.statusCode).send(response.body);
            if (response.statusCode >= 400) {
                next(new Error(response.body.message));
            }
            next();
        } catch (error) {
            if (typeof error === 'object') {
                res.status(500).send(JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))));
            } else {
                res.status(500).send(error);
            }
            next(error);
        }
    });
});

module.exports = router;