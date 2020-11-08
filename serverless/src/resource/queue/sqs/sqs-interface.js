/* Standard and third-party imports */
const AWS = require('aws-sdk');

/*Class dependencies*/
const config = require('../../../shared/config');
/*Class dependencies end*/

/**
 * @class
 * @description An interface to implemnt methods to use aws-sdk sqs functions
 * @author Douglas Eleutério <douglaseleuterio@gmail.com>
 */
class SQS {
    constructor({ queueUrl }) {
        this.queueUrl = queueUrl;
        this.sqs = new AWS.SQS({ region: config.AWS_REGION });
    }

    async send({ body, messageId }) {
        return await this.sqs
            .sendMessage({
                QueueUrl: this.queueUrl,
                MessageBody: body,
                MessageAttributes: {
                    messageId: {
                        DataType: 'String',
                        StringValue: messageId,
                    },
                },
            })
            .promise();
    }
}

module.exports = SQS;