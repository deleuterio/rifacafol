const createRaffleService = require('./service/create');
const createReportRaffleService = require('./service/createReport');

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

async function createReportRaffle({ body }) {
    const { date } = body;
    try {
        const responseBody = await createReportRaffleService({ date: new Date(date) });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, body: error };
    }
}

module.exports = [
    { method: 'post', handler: createRaffle, path: '/raffle/create' },
    { method: 'post', handler: createReportRaffle, path: '/raffle/createReport' },
];
