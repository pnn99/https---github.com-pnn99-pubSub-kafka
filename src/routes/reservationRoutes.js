const express = require('express');
const { makeReservation, getAllReservations, getReservedSlots } = require('../controllers/reservationController');
const router = express.Router();

// Rota para fazer uma nova reserva
router.post('/', makeReservation);

// Rota para buscar todas as reservas
router.get('/', getAllReservations);

// Rota para buscar horários reservados
router.get('/reserved-slots', getReservedSlots);

module.exports = router;
