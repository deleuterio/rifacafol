const queue = require('./src/resource/queue/sqs/RafflePaymentSuccessQueue');


queue.receive().then(data => {
    console.log(JSON.stringify(data));
});