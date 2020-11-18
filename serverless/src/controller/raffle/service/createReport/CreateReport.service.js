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
        const urls = await this._getObjects(this.now);
        return urls;
    }

    async _getObjects(date) {
        const remotePath = `${this.remoteKey}/year=${date.getFullYear()}/month=${date.getMonth() + 1}/day=${date.getDate()}`;
        const key = this.rifaDatalakeRawFileStorage.createRemotePath(remotePath);
        try {
            return await this.rifaDatalakeRawFileStorage.listObjects({ key });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = RaffleCreateReportService;
