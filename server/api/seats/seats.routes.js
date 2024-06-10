const express = require('express');
const seatsRoutes = express.Router();
const {getSeats, getSeatsById, deleteSeatsById, postSeats, updateSeatsById} = require('../../controllers/seats/seats.controller');

// Validator
const { postSeatsValidator, updateSeatsValidator, validateSeats } = require('../../middlewares/validator/seats.validator');


// get all seats
seatsRoutes.get('/seats', getSeats);

// get seats by Id
seatsRoutes.get('/seats/:id', getSeatsById);

// delete seats by Id
seatsRoutes.delete('/seats/:id',  deleteSeatsById);

// post seats
seatsRoutes.post('/seats', postSeatsValidator(), updateSeatsValidator(), validateSeats, postSeats);

// update seats
seatsRoutes.put('/seats/:id', postSeatsValidator(), updateSeatsValidator(), validateSeats, updateSeatsById);

module.exports = seatsRoutes;