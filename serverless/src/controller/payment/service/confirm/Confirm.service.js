class PaymentConfirmService {
    constructor({ rafflePaymentSuccessQueue }) {
        this.rafflePaymentSuccessQueue = rafflePaymentSuccessQueue;
    }

    async execute({ body }) {
        const { resource } = body;

        const paymentConfirmDTO = {
            eventId: body.id,
            created: body.create_time,
            resourceType: body.resource_type,
            eventType: body.event_type,
            orderId: resource.id,
            amount: resource.amount,
            finalCapture: resource.final_capture,
            orderStatus: resource.status,
        };

        try {
            return await this.rafflePaymentSuccessQueue.send({
                body: JSON.stringify(paymentConfirmDTO),
                messageId: resource.id,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = PaymentConfirmService;
