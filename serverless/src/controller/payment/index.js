const createOrderService = require('./service/createOrder');
const confirmService = require('./service/confirm');

async function createOrder({ body }) {
    const { name, email, phone, address, amountValue } = body;
    if (!name || !email || !phone || !amountValue) {
        return {
            statusCode: 422,
            body: {
                message: 'Missing information',
                details: { name, email, phone, amountValue },
            },
        };
    }
    const userDTO = { name, email, phone, address };
    const responseBody = await createOrderService({ userDTO, amountValue });
    return { statusCode: 200, body: responseBody };
}

async function confirm({ body }) {
    const responseBody = await confirmService({ body });
    return { statusCode: 200, body: responseBody };
}

module.exports = [{ method: 'post', handler: createOrder, path: '/payment/order' }, { method: 'post', handler: confirm, path: '/payment/confirm' }];
