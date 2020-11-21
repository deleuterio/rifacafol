// Service Method
const RaffleCreateService = require('./Create.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
const rifaCafolSuccessEmail = require('../../../../resource/email/ses/RifaCafolSuccessEmail');
const rifaCafolErrorEmail = require('../../../../resource/email/ses/RifaCafolErrorEmail');
const rafflePaymentSuccessQueue = require('../../../../resource/queue/sqs/RafflePaymentSuccessQueue');
const rafflePaymentSuccessQueueDLT = require('../../../../resource/queue/sqs/RafflePaymentSuccessQueueDLT');
const { pgPool } = require('../../../../resource/database/postgres/pg-interface');
/* Service dependencies end */


module.exports = async ({ messageId, body, receiptHandle }) => {
    const raffleCreateService = new RaffleCreateService({
        rifaDatalakeRawFileStorage,
        rifaCafolSuccessEmail,
        rifaCafolErrorEmail,
        rafflePaymentSuccessQueue,
        rafflePaymentSuccessQueueDLT,
        pgPool,
    });
    return await raffleCreateService.execute({ messageId, body, receiptHandle });
};