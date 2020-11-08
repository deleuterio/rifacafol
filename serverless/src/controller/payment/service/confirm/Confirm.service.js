class PaymentConfirmService {
    constructor({ rafflePaymentSuccessQueue }) {
        this.rafflePaymentSuccessQueue = rafflePaymentSuccessQueue;
    }

    async execute({ body }) {
        const { resource } = body;

        try {
            return await this.rafflePaymentSuccessQueue.send({
                body: JSON.stringify(body),
                messageId: resource.id,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = PaymentConfirmService;
