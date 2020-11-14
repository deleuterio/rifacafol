/*Class dependencies*/
const SQS = require('./sqs-interface');
const config = require('../../../shared/config');
/*Class dependencies end*/


class RafflePaymentSuccessDLTQueue extends SQS {
    constructor() {
        super({ queueUrl: config.SQS_QUEUE_URL_RAFFLE_PAYMENT_SUCCESS_DLT });
    }
}

module.exports = new RafflePaymentSuccessDLTQueue();