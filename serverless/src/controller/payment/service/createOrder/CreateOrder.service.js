class PaymentCreateOrderService {
    constructor({ rifaDatalakeRawFileStorage, uuidv4, paymentCreateOrder }) {
        this.uuidv4 = uuidv4;
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.paymentCreateOrder = paymentCreateOrder;
        this.remoteKey = 'payment';
        this.now = new Date();
    }

    async execute({ user, amountValue }) {
        const order = await this.paymentCreateOrder.handler({ amountValue });
        const orderDTO = {
            id: order.id,
            status: order.status,
            intent: order.intent,
            application_context: { ...order.application_context },
            content: { ...order.purchase_units[0] },
        };
        await this._createPayment({
            filename: order.id,
            data: { user, order: orderDTO },
        });
        return { ok: true, order: orderDTO };
    }

    /**
     * @private
     * @description Upload user to s3
     * @param {Object} options
     */
    async _createPayment({ filename, data }) {
                                                 const mime = 'json';
                                                 const fullFilename = `${filename}.${mime}`;
                                                 // const remotePath = `${this.remoteKey}/year=${this.now.getFullYear()}/month=${this.now.getMonth()}/day=${this.now.getDate()}/${fullFilename}`;
                                                 const remotePath = `${this.remoteKey}/${fullFilename}`;
                                                 const key = this.rifaDatalakeRawFileStorage.createRemotePath(
                                                     remotePath,
                                                 );
                                                 try {
                                                     const filePath = await this.rifaDatalakeRawFileStorage.createJSONFile(
                                                         fullFilename,
                                                         data,
                                                     );
                                                     return await this.rifaDatalakeRawFileStorage.upload(
                                                         { filePath, key, mime },
                                                     );
                                                 } catch (error) {
                                                     console.error(error);
                                                     throw error;
                                                 } finally {
                                                     this.rifaDatalakeRawFileStorage.deleteJSONfile(
                                                         filename,
                                                     );
                                                 }
                                             }
}

module.exports = PaymentCreateOrderService;
