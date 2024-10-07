const kafka = require('kafka-node');
const client = new kafka.KafkaClient();
const Producer = kafka.Producer;
const producer = new Producer(client);

producer.on('ready', function () {
    console.log('Producer está pronto');
});

producer.on('error', function (err) {
    console.error('Erro no producer:', err);
});

module.exports = { producer };
