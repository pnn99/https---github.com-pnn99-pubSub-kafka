const db = require('../config/database');
const moment = require('moment');

// Função para criar uma nova reserva
const makeReservation = (req, res) => {
    
    if (!req.session.user) {
        return res.status(401).json({ message: 'Usuário não está logado.' });
    }

    const { dayOfWeek, room, timeSlot, floor } = req.body;
    const userName = req.session.user.name;
    const userRA = req.session.user.ra;
    const userEmail = req.session.user.email;


    console.log('Usuário que reservou:', userName, userRA, userEmail);
    console.log('Dados recebidos para reserva:', { dayOfWeek, room, timeSlot, floor });
    

    // Verificar se a sala já está reservada para o dia, horário e andar
    const query = `SELECT * FROM reservations WHERE dayOfWeek = ? AND room = ? AND timeSlot = ? AND floor = ?`;
    db.get(query, [dayOfWeek, room, timeSlot, floor], (err, row) => {
        if (row) {
            console.log('Sala já reservada:', row);
            // Retornar uma resposta imediatamente se a sala já está reservada
            return res.status(409).json({ error: 'A sala já está reservada para esse horário neste andar.' });
        }

        // Inserir nova reserva
        const insertQuery = `INSERT INTO reservations (dayOfWeek, room, timeSlot, floor, createdAt) VALUES (?, ?, ?, ?, ?)`;
        db.run(insertQuery, [dayOfWeek, room, timeSlot, floor, new Date().toISOString()], function (err) {
            if (err) {
                console.log('Erro ao fazer reserva:', err);
                return res.status(500).json({ error: 'Erro ao fazer reserva.' });
            }

            console.log('Reserva criada com sucesso:', this.lastID);


            // Retornar a resposta de sucesso
            return res.status(201).json({ message: 'Reserva feita com sucesso!', reservationId: this.lastID });
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

module.exports = { makeReservation, getAllReservations, getReservedSlots};
