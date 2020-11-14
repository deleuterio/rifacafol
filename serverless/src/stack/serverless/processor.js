const raffleCreate = require('../../controller/raffle/service/create');;

module.exports = async (event) => {
    const message = event.Records[0].body;
    const receiptHandle = event.Records[0].receiptHandle;
    await raffleCreate({ receiptHandle, message });
};
