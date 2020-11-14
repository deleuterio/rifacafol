const createRaffleService = require('./service/create');

async function createRaffle({ body }) {
    const message = JSON.parse(body.Records[0].body);
    const receiptHandle = body.Records[0].receiptHandle;
    try {
        const responseBody = await createRaffleService({ message, receiptHandle });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, body: error };
    }
}

module.exports = [{ method: 'post', handler: createRaffle, path: '/raffle/create' }];
