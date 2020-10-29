const app = require('./src/stack/api');

module.exports.handler = serverless(app);