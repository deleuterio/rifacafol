// Service Method
const PaymentFinishService = require('./Finish.service');

/* Service dependencies */
const rafflePaymentSuccessQueue = require('../../../../resource/queue/sqs/RafflePaymentSuccessQueue');
/* Service dependencies end */

module.exports = async ({ body }) => {
    const paymentFinishService = new PaymentFinishService({ rafflePaymentSuccessQueue });
    return await paymentFinishService.execute({ body });
};
