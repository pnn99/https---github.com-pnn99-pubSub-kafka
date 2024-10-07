const kafka = require('kafka-node');
const client = new kafka.KafkaClient();
const Consumer = kafka.Consumer;

const consumer = new Consumer(
    client,
    [{ topic: 'room-reservation-topic', partition: 0 }],
    { autoCommit: true }
);

consumer.on('message', function (message) {
    const reservation = JSON.parse(message.value);
    console.log('Reserva consumida:', reservation);
});

module.exports = { consumer };
