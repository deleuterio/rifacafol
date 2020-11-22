const { Pool } = require('pg');

const pgPool = new Pool();

const psqlClient = {
    async query(text, values) {
        const client = await pgPool.connect();
        const result = await client.query(text, values);
        client.release();
        return result.rows;
    },

    async testConnection() {
        try {
            const client = await pgPool.connect();
            const result = await client.query('SELECT now()');
            client.release();
            return result.rows;
        } catch (error) {
            console.error(error)
            throw error;
        }
    },
};

psqlClient.testConnection().then(() => {
    console.log('Database connected');
});

module.exports = { psqlClient };