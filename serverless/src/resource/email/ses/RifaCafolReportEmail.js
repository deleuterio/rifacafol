/* Standard and third-party imports */
// const fs = require('fs');

/*Class dependencies*/
const config = require('../../../shared/config');
const nodemailer = require('./nodemailer-interface')
/*Class dependencies end*/

/**
 * @class
 * @description An interface to implemnt methods to use aws-sdk SES functions
 * @author Douglas Eleutério <douglaseleuterio@gmail.com>
 */
class RifaCafolReportEmail {
    /**
     * @description Send email
     * @param {Object} options
     */
    async sendEmail({ date, count, body }) {
        const mailOptions = {
            from: config.SES_EMAIL_SOURCE,
            subject: `Relatório ${date.toLocaleDateString()}`,
            html: `<p>Segue relatório diário com <b>${count}</b> novas rifas vendidas</p>`,
            to: config.SES_EMAIL_SOURCE,
            attachments: [
                {
                    filename: `${date.toISOString().substring(0, date.toISOString().indexOf('T'))}.csv`,
                    content: body,
                    contentType: 'text/csv',
                },
            ],
        };

        return await nodemailer.transporter.sendMail(mailOptions);
    }
}

module.exports = new RifaCafolReportEmail();
