const raffleCreate = require('../../controller/raffle/service/create');;

module.exports = async (event) => {
    const message = event.Records[0].body;
    await raffleCreate({ message });
};
