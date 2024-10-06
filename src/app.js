const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const kafkaRoutes = require('./routes/kafkaRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/kafka', kafkaRoutes);

module.exports = app;
