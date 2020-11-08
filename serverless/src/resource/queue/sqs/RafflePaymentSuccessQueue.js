/*Class dependencies*/
const SQS = require('./sqs-interface');
const config = require('../../../shared/config');
/*Class dependencies end*/


class RafflePaymentSuccessQueue extends SQS {
    constructor() {
        super({ queueUrl: config.SQS_QUEUE_URL_RAFFLE_PAYMENT_SUCCESS });
    }
}

module.exports = new RafflePaymentSuccessQueue();