class RaffleCreateReportService {
    constructor({ rifaDatalakeRawFileStorage, workbook, rifaCafolReportEmail }) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.rifaCafolReportEmail = rifaCafolReportEmail;
        this.workbook = workbook;
        this.header = [
            { header: 'Raffle ID', key: 'raffleId' },
            { header: 'User ID', key: 'userId' },
            { header: 'Order ID', key: 'orderId' },
            { header: 'Name', key: 'name' },
            { header: 'E-mail', key: 'email' },
            { header: 'Phone', key: 'phone' },
            { header: 'Address', key: 'address' },
            { header: 'Amount', key: 'amount' },
        ];
        this.remoteKey = 'raffle/orders';
    }

    async execute({ date = new Date() }) {
        const s3Keys = await this._getObjects(date);
        if (s3Keys && s3Keys.length) {
            const sheet = this.workbook.addWorksheet('RaffleOrders');
            sheet.columns = this.header;

            const raffleOrders = await Promise.all(
                s3Keys.map(async key => {
                    const { raffleId, user, order } = await this.rifaDatalakeRawFileStorage.getJSON({ key });
                    sheet.addRow({
                        raffleId,
                        userId: user.userId,
                        orderId: order.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                        amount: order.content.amount.value,
                    });
                    return { raffleId, user, order };
                }),
            );
            const buffer = await this.workbook.csv.writeBuffer();
            await this.rifaCafolReportEmail.sendEmail({ date, count: raffleOrders.length, body: buffer });
        }
    }

    /**
     * @private
     * @description Get a list of s3 keys from requested date
     * @param {Date} date The date to create report
     * @return {Array.String} The keys
     */
    async _getObjects(date) {
        const remotePath = `${this.remoteKey}/year=${date.getFullYear()}/month=${date.getMonth() + 1}/day=${date.getDate()}`;
        const key = this.rifaDatalakeRawFileStorage.createRemotePath(remotePath);
        try {
            const { Contents } = await this.rifaDatalakeRawFileStorage.listObjects({ key });
            return Contents.map(({ Key }) => Key);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = RaffleCreateReportService;
