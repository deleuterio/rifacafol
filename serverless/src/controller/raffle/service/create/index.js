// Service Method
const RaffleCreateService = require('./Create.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
// const rafflePaymentSuccessQueue = require('../../../../resource/queue/sqs/RafflePaymentSuccessQueue');
/* Service dependencies end */


module.exports = async ({ message }) => {
    const raffleCreateService = new RaffleCreateService({ rifaDatalakeRawFileStorage });
    return await raffleCreateService.execute({ message });
}