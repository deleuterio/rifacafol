// Service Method
const RaffleCreateService = require('./Create.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
const rifaCafolSuccessEmail = require('../../../../resource/email/ses/RifaCafolSuccessEmail');
/* Service dependencies end */


module.exports = async ({ message }) => {
    const raffleCreateService = new RaffleCreateService({ rifaDatalakeRawFileStorage, rifaCafolSuccessEmail });
    return await raffleCreateService.execute({ message });
}