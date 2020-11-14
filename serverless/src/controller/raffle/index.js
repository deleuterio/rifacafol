const createRaffleService = require('./service/create');

async function createRaffle({ body }) {
    const messageBody = JSON.parse(body.Records[0].body);
    const receiptHandle = body.Records[0].receiptHandle;
    const messageId = body.Records[0].messageId;
    try {
        const responseBody = await createRaffleService({ messageId, body: messageBody, receiptHandle });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, body: error };
    }
}

module.exports = [{ method: 'post', handler: createRaffle, path: '/raffle/create' }];
