const db = require('../config/database');
const moment = require('moment');

// Função para criar uma nova reserva
const makeReservation = (req, res) => {
    const { dayOfWeek, room, timeSlot } = req.body;

    console.log('Dados recebidos para reserva:', { dayOfWeek, room, timeSlot });

    if (!dayOfWeek || !room || !timeSlot) {
        console.log('Faltando campos na reserva');
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se a sala já está reservada
    const query = `SELECT * FROM reservations WHERE dayOfWeek = ? AND room = ? AND timeSlot = ?`;
    db.get(query, [dayOfWeek, room, timeSlot], (err, row) => {
        if (row) {
            console.log('Sala já reservada:', row);
            return res.status(409).json({ error: 'A sala já está reservada para esse horário' });
        }

        // Inserir nova reserva
        const insertQuery = `INSERT INTO reservations (dayOfWeek, room, timeSlot, createdAt) VALUES (?, ?, ?, ?)`;
        db.run(insertQuery, [dayOfWeek, room, timeSlot, moment().format()], function (err) {
            if (err) {
                console.log('Erro ao fazer reserva:', err);
                return res.status(500).json({ error: 'Erro ao fazer reserva' });
            }
            console.log('Reserva criada com sucesso:', this.lastID);
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

const getReservedSlots = (req, res) => {
    const { dayOfWeek, room } = req.query; // Supondo que você passe esses parâmetros na URL

    const query = `SELECT timeSlot FROM reservations WHERE dayOfWeek = ? AND room = ?`;
    db.all(query, [dayOfWeek, room], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar horários reservados' });
        }
        // Retorna apenas os horários reservados
        const reservedSlots = rows.map(row => row.timeSlot);
        res.json(reservedSlots);
    });
};

module.exports = { makeReservation, getAllReservations, getReservedSlots };
