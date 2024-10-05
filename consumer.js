const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(
    client,
    [{ topic: 'reservas_sala', partition: 0 }],
    { autoCommit: true }
);

consumer.on('message', (message) => {
    const reserva = JSON.parse(message.value);
    console.log('Nova reserva recebida:', reserva);
});

consumer.on('error', (err) => {
    console.log('Erro no consumidor:', err);
});
