const createService = require('./service/create');

async function create(body) {
    const responseBody = await createService(body);
    return {
        statusCode: 200,
        body: responseBody,
    };
}

module.exports = { create };