const db = require('../config/database');
const moment = require('moment');

// Função para criar uma nova reserva
const makeReservation = (req, res) => {
    const { dayOfWeek, room, timeSlot } = req.body;

    if (!dayOfWeek || !room || !timeSlot) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se a sala já está reservada
    const query = `SELECT * FROM reservations WHERE dayOfWeek = ? AND room = ? AND timeSlot = ?`;
    db.get(query, [dayOfWeek, room, timeSlot], (err, row) => {
        if (row) {
            return res.status(409).json({ error: 'A sala já está reservada para esse horário' });
        }

        // Inserir nova reserva
        const insertQuery = `INSERT INTO reservations (dayOfWeek, room, timeSlot, createdAt) VALUES (?, ?, ?, ?)`;
        db.run(insertQuery, [dayOfWeek, room, timeSlot, moment().format()], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Erro ao fazer reserva' });
            }
            res.status(201).json({ message: 'Reserva feita com sucesso', reservationId: this.lastID });
        });
    });
};

// Função para buscar todas as reservas
const getAllReservations = (req, res) => {
    const query = `SELECT * FROM reservations`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar reservas' });
        }
        res.json(rows);
    });
};

module.exports = { makeReservation, getAllReservations };
