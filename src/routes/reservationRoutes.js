const express = require('express');
const router = express.Router();
const { makeReservation, getAllReservations } = require('../controllers/reservationController');

router.post('/reserve', makeReservation);
router.get('/reservations', getAllReservations);

module.exports = router;
