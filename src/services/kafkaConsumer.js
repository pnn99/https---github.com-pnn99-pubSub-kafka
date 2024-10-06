const kafka = require('kafka-node');

exports.consume = (topic) => {
    const client = new kafka.KafkaClient();
    const consumer = new kafka.Consumer(
        client,
        [{ topic }],
        { autoCommit: true }
    );

    consumer.on('message', (message) => {
        console.log('Mensagem recebida:', message);
    });
};
