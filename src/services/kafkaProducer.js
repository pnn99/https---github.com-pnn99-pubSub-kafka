const kafka = require('kafka-node');

exports.sendMessage = (topic, message) => {
    const client = new kafka.KafkaClient();
    const producer = new kafka.Producer(client);

    producer.on('ready', () => {
        producer.send([{ topic, messages: [message] }], (err, data) => {
            if (err) console.error('Erro ao enviar mensagem:', err);
            console.log('Mensagem enviada:', data);
        });
    });
};
