// Service Method
const RaffleCreateService = require('./Create.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
const rifaCafolSuccessEmail = require('../../../../resource/email/ses/RifaCafolSuccessEmail');
const rafflePaymentSuccessQueue = require('../../../../resource/queue/sqs/RafflePaymentSuccessQueue');
/* Service dependencies end */


module.exports = async ({ message, receiptHandle }) => {
    const raffleCreateService = new RaffleCreateService({ rifaDatalakeRawFileStorage, rifaCafolSuccessEmail, rafflePaymentSuccessQueue });
    return await raffleCreateService.execute({ message, receiptHandle });
};