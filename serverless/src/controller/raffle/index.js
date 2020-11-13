const createRaffleService = require('./service/create');

async function createRaffle({ body }) {
    try {
        const responseBody = await createRaffleService({ message: body });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, body: error };
    }
}

module.exports = [{ method: 'post', handler: createRaffle, path: '/raffle/create' }];
