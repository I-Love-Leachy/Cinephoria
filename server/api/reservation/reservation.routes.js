const express = require('express');
const reservationApiRoutes = express.Router();
const {getReservation, getReservationById, deleteReservationById, postReservation, updateReservationById, getAllReservationInfoById} = require('../../controllers/reservations/reservation.controller');
// Validator
const { postReservationValidator, validateReservation } = require('../../middlewares/validator/reservation.validator');

// get all reservation
reservationApiRoutes.get('/reservation', getReservation);

// get reservation by Id
reservationApiRoutes.get('/reservation/:id', getReservationById);

// get reservation info by Id using POST
reservationApiRoutes.post("/reservation/info", getAllReservationInfoById);

// delete reservation by Id
reservationApiRoutes.delete('/reservation/:id', deleteReservationById);

// post reservation
reservationApiRoutes.post('/reservation', postReservationValidator(), validateReservation, postReservation);

// update reservation
reservationApiRoutes.put('/reservation/:id', postReservationValidator(), validateReservation, updateReservationById);

module.exports = reservationApiRoutes;