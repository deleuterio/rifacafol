// Service Method
const PaymentCreateOrderService = require('./CreateOrder.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
const PaymentCreateOrder = require('../../../../resource/payment/paypal/CreateOrderWrapper');
const { uuidv4 } = require('../../../../shared/service-util');
const userCreateService = require('../../../user/service/create')
/* Service dependencies end */

module.exports = async ({ userDTO, amountValue }) => {
    const { data } = await userCreateService({ userDTO });
    const paymentCreateOrderService = new PaymentCreateOrderService({
        uuidv4,
        rifaDatalakeRawFileStorage,
        paymentCreateOrder: new PaymentCreateOrder(),
    });
    return await paymentCreateOrderService.execute({ user: data, amountValue });
};
