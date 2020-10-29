const express = require('express');

const modules = require('./modules');

const namespace = 'app';

const app = express();
app.use(express.json());

app.use(modules);

/**
 * Handles promise rejections that were not handled anywhere else by the application.
 * It throws an exception that will be caught by the 'uncaughtException' handler.
 */
process.on('unhandledRejection', reason => {
    // I just caught an unhandled promise rejection, since we already have fallback handler for unhandled errors (see below), let throw and let him handle that
    console.error({ namespace, msg: 'Unhandled Rejection!', stackTrace: reason });
    throw reason;
});

/**
 * Handles uncaught exceptions from the code. The application will crash in order to prevent corrupted application state.
 * https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
 */
process.on('uncaughtException', error => {
    if (!error.trustedError) {
        console.error({ namespace, msg: 'Uncaught Exception!', stackTrace: error });
        process.exit(1);
    } else {
        console.warn({ namespace, msg: 'Uncaught Exception!', stackTrace: error });
    }
});

module.exports = app;