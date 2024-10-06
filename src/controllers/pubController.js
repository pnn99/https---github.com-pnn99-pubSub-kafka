const kafkaProducer = require('../services/kafkaProducer');

exports.publishMessage = (req, res) => {
    const { topic, message } = req.body;
    kafkaProducer.sendMessage(topic, message);
    res.status(200).json({ message: 'Mensagem publicada com sucesso!' });
};
