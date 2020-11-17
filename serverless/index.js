const app = require('./src/stack/serverless/app');
const processor = require('./src/stack/serverless/processor');
const report = require('./src/stack/serverless/report');

module.exports.handler = app;
module.exports.processor = processor;
module.exports.report = report;
