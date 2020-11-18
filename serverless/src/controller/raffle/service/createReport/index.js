// Service Method
const RaffleCreateService = require('./CreateReport.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
/* Service dependencies end */

module.exports = async ({ date }) => {
    const raffleCreateService = new RaffleCreateService({ rifaDatalakeRawFileStorage });
    return await raffleCreateService.execute({ date });
};
