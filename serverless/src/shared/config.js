const dotenv = require('dotenv');

const NODE_ENV = process.env.NODE_ENV;
const config = {};

if (NODE_ENV === 'test') {
    config.path = './.env.test';
}

// TODO I can remove the runtime dependency on dotenv as long as I preload the environment variables.
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
dotenv.config(config);

const requiredVariables = {
    NODE_ENV: process.env.NODE_ENV,
    BUCKET_RIFA_DATALAKE_RAW: process.env.BUCKET_RIFA_DATALAKE_RAW,
};

const optionalVariables = {};

if (NODE_ENV !== 'test') {
    const missingEnvWarn = Object.keys(optionalVariables).filter(v => optionalVariables[v] === undefined);
    if (missingEnvWarn.length > 0) {
        const missingEnvsMsg = `[WARNING] Missing optional environment variables (${missingEnvWarn.length}): ${missingEnvWarn.join(', ')}\n`;
        console.warn(missingEnvsMsg); // YOU FORGOT ENVIRONMENT VARIABLES
    }

    const missingEnvException = Object.keys(requiredVariables).filter(v => requiredVariables[v] === undefined);
    if (missingEnvException.length > 0) {
        const missingEnvExceptionMsg = `[ERROR] Missing required environment variables (${missingEnvException.length}): ${missingEnvException.join(', ')}\n`;
        throw missingEnvExceptionMsg; // YOU FORGOT ENVIRONMENT VARIABLES
    }
}

module.exports = Object.freeze({ ...requiredVariables, ...optionalVariables });