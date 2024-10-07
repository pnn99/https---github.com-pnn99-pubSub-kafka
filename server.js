const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const kafkaRoutes = require('./src/routes/kafkaRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes'); // Importa as rotas de reserva

const app = express();
app.use(bodyParser.json());
// Rota principal
app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema de reserva de salas!');
});

app.use('/auth', authRoutes);
app.use('/kafka', kafkaRoutes);
app.use('/reservations', reservationRoutes);  // Adiciona as rotas de reserva

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
