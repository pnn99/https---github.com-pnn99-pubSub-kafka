const kafkaConsumer = require('../services/kafkaConsumer');

exports.consumeMessages = (req, res) => {
    const { topic } = req.body;
    kafkaConsumer.consume(topic);
    res.status(200).json({ message: 'Consumindo mensagens...' });
};
