// Service Method
const PaymentCreateOrderService = require('./CreateOrder.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
const PaymentCreateOrder = require('../../../../resource/payment/paypal/create-order-wrapper');
const { uuidv4 } = require('../../../../shared/service-util');
const userCreateService = require('../../../user/service/create')
/* Service dependencies end */

module.exports = async ({ userDTO, amountValue }) => {
    const user = await userCreateService({ userDTO });
    const paymentCreateOrderService = new PaymentCreateOrderService({
        uuidv4,
        rifaDatalakeRawFileStorage,
        paymentCreateOrder: new PaymentCreateOrder(),
    });
    return await paymentCreateOrderService.execute({ user, amountValue });
};
