/* Standard and third-party imports */
const AWS = require('aws-sdk');

/*Class dependencies*/
const config = require('../../../shared/config');
/*Class dependencies end*/

/**
 * @class
 * @description An interface to implemnt methods to use aws-sdk SES functions
 * @author Douglas Eleutério <douglaseleuterio@gmail.com>
 */
class SES {
    /**
     * @constructor
     * @description Instantiate a SES sdk
     * @param {Object} options
     * @param {String} options.templateId - The template identifier
     */
    constructor({ templateId }) {
        this.templateId = templateId;
        this.ses = new AWS.SES({ apiVersion: '2010-12-01' });
    }

    /**
     * @description Send email
     * @param {Object} options
     * @param {String} options.email - The email destination
     * @param {Object} options.templateData - The data to override on template tags
     */
    async sendEmail({ email, templateData }) {
        if (config.NODE_ENV === 'local') {
            return true;
        } else {
            return await this.ses
                .sendTemplatedEmail({
                    Destination: {
                        /* required */
                        BccAddresses: [config.SES_EMAIL_SOURCE],
                        ToAddresses: [email],
                    },
                    Source: config.SES_EMAIL_SOURCE,
                    Template: this.templateId,
                    TemplateData: JSON.stringify(templateData),
                })
                .promise();
        }
    }
}

module.exports = SES;
