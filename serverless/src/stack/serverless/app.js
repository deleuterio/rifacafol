const serverless = require('serverless-http');
const app = require('../api/server');

module.exports = serverless(app);
