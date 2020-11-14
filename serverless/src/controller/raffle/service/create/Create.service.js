class RaffleCreateService {
    constructor({ rifaDatalakeRawFileStorage, rifaCafolSuccessEmail, rafflePaymentSuccessQueue }) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.rifaCafolSuccessEmail = rifaCafolSuccessEmail;
        this.rafflePaymentSuccessQueue = rafflePaymentSuccessQueue;
        this.remoteKey = 'raffle/orders';
        this.now = new Date();
    }
    async execute({ message, receiptHandle }) {
        const { eventType, orderId } = message;

        try {
            if (eventType === 'CHECKOUT.ORDER.APPROVED') {
                // Get user info
                const { user, order } = await this.rifaDatalakeRawFileStorage.getJSON({ key: `payment/${orderId}.json` });

                // Get raffle numbers
                const raffle = await this.rifaDatalakeRawFileStorage.getJSON({ key: `raffle/index.json` });
                const raffleUnits = Number(order.content.amount.value) / 15;
                const raffleIds = [];
                await Promise.all([
                    // Set raffle index
                    this._updateRaffleIndex({ number: raffle.number + raffleUnits }),
                    [...new Array(raffleUnits)].map((_value, index) => {
                        const raffleId = index + raffle.number;
                        raffleIds.push(raffleId);
                        return this._createRaffle({ filename: raffleId, data: { user, order, raffleId } });
                    }),
                ]);

                // Send email
                await this._sendEmail({ user, order, raffleIds });

                return { raffleUnits, raffle, order, user };
            } else {
                throw new Error('Order not approved');
            }
        } catch (error) {
            // Send fail email
            // Send message to dead letter queue

            console.error(error);
            throw error;
        } finally {
            this.rafflePaymentSuccessQueue.delete({ receiptHandle });
        }
    }

    /**
     * @private
     * @description Upload user to s3
     * @param {Object} options
     */
    async _createRaffle({ filename, data }) {
        const mime = 'json';
        const fullFilename = `${filename}.${mime}`;
        const remotePath = `${this.remoteKey}/year=${this.now.getFullYear()}/month=${this.now.getMonth()}/day=${this.now.getDate()}/${fullFilename}`;
        const key = this.rifaDatalakeRawFileStorage.createRemotePath(remotePath);
        try {
            const filePath = await this.rifaDatalakeRawFileStorage.createJSONFile(fullFilename, data);
            return await this.rifaDatalakeRawFileStorage.upload({ filePath, key, mime });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            this.rifaDatalakeRawFileStorage.deleteJSONfile(filename);
        }
    }

    /**
     * @private
     * @description Upload user to s3
     * @param {Object} options
     */
    async _updateRaffleIndex({ number }) {
        const mime = 'json';
        const fullFilename = `index.${mime}`;
        const remotePath = `raffle/${fullFilename}`;
        const key = this.rifaDatalakeRawFileStorage.createRemotePath(remotePath);
        try {
            const filePath = await this.rifaDatalakeRawFileStorage.createJSONFile(fullFilename, { number });
            return await this.rifaDatalakeRawFileStorage.upload({ filePath, key, mime });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            this.rifaDatalakeRawFileStorage.deleteJSONfile(fullFilename);
        }
    }

    async _sendEmail({ user, order, raffleIds }) {
        return await this.rifaCafolSuccessEmail.sendEmail({
            email: user.email,
            templateData: {
                numbers: raffleIds.join(', '),
                amount: order.content.amount.value,
                email: user.email,
                phone: user.phone,
                address: user.address,
                date: '25 de Janeiro de 2021',
            },
        });
    }
}

module.exports = RaffleCreateService;
