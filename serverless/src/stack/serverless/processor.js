const raffleCreate = require('../../controller/raffle/service/create');;

module.exports = async (event) => {
    const body = event.Records[0].body;
    const receiptHandle = event.Records[0].receiptHandle;
    const messageId = event.Records[0].messageId;
    await raffleCreate({ messageId, receiptHandle, body });
};
