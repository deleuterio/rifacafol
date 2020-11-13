class RaffleCreateService {
    constructor({ rifaDatalakeRawFileStorage }) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
    }
    async execute({ message }) {
        const { eventId, created, resourceType, eventType, orderId, orderStatus } = message;

        try {
            if (eventType === 'CHECKOUT.ORDER.APPROVED') {
                // Get user info

                const payment = this.rifaDatalakeRawFileStorage.getJSON({ key: `payment/${orderId}.json` });
                return payment;
                // Get raffle numbers
                // Send email
            } else {
                // Send fail email
            }
        } catch (error) {
            // Send message to dead letter queue
        } finally {
            // Delete message
        }
    }
}

module.exports = RaffleCreateService;