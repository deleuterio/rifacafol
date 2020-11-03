const createService = require('./service/create');

async function create({ body }) {
    const { name, email, phone, address } = body;
    if (!name || !email || !phone) {
        return {
            statusCode: 422,
            body: {
                message: 'Missing information',
                details: { name, email, phone },
            },
        };
    }
    try {
        const userDTO = { name, email, phone, address };
        const responseBody = await createService({ userDTO });
        return { statusCode: 200, body: responseBody };
    } catch (error) {
        return { statusCode: 500, body: error };
    }
}

module.exports = { create };
