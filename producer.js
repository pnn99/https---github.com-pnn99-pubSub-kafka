const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

// Reserva de sala simulada
const reserva = {
    sala: 'Sala 101',
    usuario: 'Paulo Nogueira',
    horario: '07:00 - 08:50',
    data: '10-10-2024'
};

// Enviar a mensagem
producer.on('ready', () => {
    const payloads = [
        { topic: 'reservas_sala', messages: JSON.stringify(reserva) }
    ];
    
    producer.send(payloads, (err, data) => {
        if (err) {
            console.log('Erro ao enviar reserva:', err);
        } else {
            console.log('Reserva enviada:', data);
        }
        process.exit();
    });
});

producer.on('error', (err) => {
    console.log('Erro no produtor:', err);
});
