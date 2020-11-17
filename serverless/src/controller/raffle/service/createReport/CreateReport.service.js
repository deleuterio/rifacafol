class RaffleCreateReportService {
    constructor({ rifaDatalakeRawFileStorage }) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.now = new Date();
    }
    async execute({ date }) {
        if (!date) {
            date = this.now;
        }

    }
}

module.exports = RaffleCreateReportService;
