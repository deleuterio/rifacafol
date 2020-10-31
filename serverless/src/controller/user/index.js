const createService = require('./service/create');

async function create(body) {
    const { name, email, phone, address } = body;
    if (!name || !email || !phone) {
        return { statusCode: 422, details: 'Missing information' };
    } 
    try {
        const userDTO = { name, email, phone, address };
        const responseBody = await createService({ userDTO });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, stackTrace: error };
    }
}

module.exports = { create };