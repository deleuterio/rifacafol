class RaffleCreateReportService {
    constructor({ rifaDatalakeRawFileStorage }) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.remoteKey = 'raffle/orders';
        this.now = new Date();
    }

    async execute({ date }) {
        if (date) {
            this.now = date;
        }
        const s3Keys = await this._getObjects(this.now);
        if (s3Keys) {
            const raffleOrders = await Promise.all(
                s3Keys.map(async key => {
                    const raffleOrder = this.rifaDatalakeRawFileStorage.getJSON({ key });
                    return raffleOrder;
                }),
            );
            return raffleOrders;
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
