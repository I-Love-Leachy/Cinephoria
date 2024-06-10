const express = require('express');
const cinemasRoutes = express.Router();
const { getCinemas, getCinemaById, postCinema, updateCinemaById, deleteCinemaById } = require('../../controllers/cinemas/cinemas.controller');

// get all Cinemas
cinemasRoutes.get('/cinemas', getCinemas);

// get Cinema by Id
cinemasRoutes.get('/cinemas/:id', getCinemaById);

// post Cinema
cinemasRoutes.post('/cinemas', postCinema);

// Update Cinema by Id
cinemasRoutes.put('/cinemas/:id', updateCinemaById);

// delete Cinema by Id
cinemasRoutes.delete('/cinemas/:id', deleteCinemaById);


module.exports = cinemasRoutes;