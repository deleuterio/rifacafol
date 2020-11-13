// Service Method
const RaffleCreateService = require('./Create.service');

/* Service dependencies */
// const rafflePaymentSuccessQueue = require('../../../../resource/queue/sqs/RafflePaymentSuccessQueue');
/* Service dependencies end */


module.exports = async ({ message }) => {
    const raffleCreateService = new RaffleCreateService();
    return await raffleCreateService.execute({ message });
}