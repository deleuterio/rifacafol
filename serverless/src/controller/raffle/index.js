const createRaffleService = require('./service/create');
const createReportRaffleService = require('./service/createReport');

async function createRaffle({ body }) {
    const messageBody = JSON.parse(body.Records[0].body);
    const receiptHandle = body.Records[0].receiptHandle;
    const messageId = body.Records[0].messageId;
    const responseBody = await createRaffleService({ messageId, body: messageBody, receiptHandle });
    return { statusCode: 200, body: responseBody };
}

async function createReportRaffle({ body }) {
    const { date } = body;
    const responseBody = await createReportRaffleService({ date: new Date(date) });
    return { statusCode: 200, body: responseBody };
}

module.exports = [
    { method: 'post', handler: createRaffle, path: '/raffle/create' },
    { method: 'post', handler: createReportRaffle, path: '/raffle/createReport' },
];
