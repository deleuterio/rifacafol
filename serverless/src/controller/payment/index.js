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
    try {
        const userDTO = { name, email, phone, address };
        const responseBody = await createOrderService({ userDTO, amountValue });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, body: error };
    }
}

async function confirm({ body }) {
    try {
        const responseBody = await confirmService({ body });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, body: error };
    }
}

module.exports = [{ method: 'post', handler: createOrder, path: '/payment/order' }, { method: 'post', handler: confirm, path: '/payment/confirm' }];
