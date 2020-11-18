// Service Method
const PaymentConfirmService = require('./Confirm.service');

/* Service dependencies */
const rafflePaymentSuccessQueue = require('../../../../resource/queue/sqs/RafflePaymentSuccessQueue');
/* Service dependencies end */

module.exports = async ({ body }) => {
    const paymentConfirmService = new PaymentConfirmService({ rafflePaymentSuccessQueue });
    return await paymentConfirmService.execute({ body });
};
