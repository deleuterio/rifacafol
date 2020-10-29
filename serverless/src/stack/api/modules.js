
const express = require('express');
/* Modules */
const user = require('../../controller/user');
/* End of Modules */


const router = express.Router();

router.post('/user', async (req, res, next) => {
    const data = {
        body: req.body,
        query: req.query,
        params: req.params,
    };
    const response = await user.create(data);
    res.status(response.statusCode).send(response.body);
    next();
});

module.exports = router;