/* Standard and third-party imports */
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

/**
 * @class
 * @description An interface to implemnt methods to use aws-sdk SES functions
 * @author Douglas Eleutério <douglaseleuterio@gmail.com>
 */
class Nodemailer {
    /**
     * @constructor
     * @description Instantiate a SES sdk
     * @param {Object} options
     */
    constructor() {
        // create Nodemailer SES transporter
        this.transporter = nodemailer.createTransport({
            SES: new AWS.SES({ apiVersion: '2010-12-01' }),
        });
    }
}

module.exports = new Nodemailer();
