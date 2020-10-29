const serverless = require('serverless-http');
const app = require('./src/stack/api');

module.exports.handler = serverless(app);
