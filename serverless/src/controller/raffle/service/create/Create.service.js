class RaffleCreateService {
    constructor({
        rifaDatalakeRawFileStorage,
        rifaCafolSuccessEmail,
        rifaCafolErrorEmail,
        rafflePaymentSuccessQueue,
        rafflePaymentSuccessQueueDLT,
        psqlClient,
    }) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.rifaCafolSuccessEmail = rifaCafolSuccessEmail;
        this.rifaCafolErrorEmail = rifaCafolErrorEmail;
        this.rafflePaymentSuccessQueue = rafflePaymentSuccessQueue;
        this.rafflePaymentSuccessQueueDLT = rafflePaymentSuccessQueueDLT;
        this.remoteKey = 'raffle/orders';
        this.psqlClient = psqlClient;
        this.now = new Date();
    }
    async execute({ messageId, body, receiptHandle }) {
        const { eventType, orderId } = body;
        console.log('Received event', orderId);
        let [user, order] = [null, null];

        try {
            // Get user info
            const payment = await this.rifaDatalakeRawFileStorage.getJSON({ key: `payment/${orderId}.json` });
            console.log('Get payment on s3');
            user = payment.user;
            order = payment.order;
            if (eventType === 'CHECKOUT.ORDER.APPROVED') {
                console.log('Order approved!');
                // Get raffle numbers
                const raffleUnits = Number(order.content.amount.value) / 15;
                const rafflaUnitsMap = [...new Array(raffleUnits)];
                console.log('Create raffle units array', rafflaUnitsMap);
                const query = /*SQL*/ `
                    INSERT INTO raffle(order_id)
                    VALUES ${rafflaUnitsMap.map((_v, index) => `($${index + 1})`)}
                    RETURNING id`;
                const values = rafflaUnitsMap.map(() => orderId);
                const raffles = await this.psqlClient.query(query, values);
                console.log('Raffles Created');
                console.log(JSON.stringify(raffles));
                const raffleIds = raffles.map(({ id }) => id);
                await Promise.all(raffleIds.map(id => this._createRaffle({ filename: id, data: { user, order, raffleId: id } })));
                console.log('Everything created on s3');

                // Send email
                await this._sendEmail({ user, order, raffleIds });
                console.log('Send email');
            } else {
                throw new Error('Order not approved');
            }
        } catch (error) {
            // Send fail email
            if (user && order) {
                try {
                    console.log('Send Error email');
                    await this._sendErrorEmail({ user, order, orderId });
                } catch (er) {
                    console.error(er);
                }
            }
            // Send message to dead letter queue
            console.log('Send to DTL');
            this.rafflePaymentSuccessQueueDLT.send({
                body: JSON.stringify({ body, error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }),
                messageId,
            });
            console.error(error);
            throw error;
        } finally {
            console.log('Delete from queue');
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
        const remotePath = `${this.remoteKey}/year=${this.now.getFullYear()}/month=${this.now.getMonth() +
            1}/day=${this.now.getDate()}/${fullFilename}`;
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

    async _sendErrorEmail({ user, order, orderId }) {
        return await this.rifaCafolErrorEmail.sendEmail({
            email: user.email,
            templateData: {
                orderId: orderId,
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
