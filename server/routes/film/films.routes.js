const express = require('express');
const filmsRoutes = express.Router();

filmsRoutes.get('/',(req, res) =>{
    res.render('layouts/films', {
        title: "Films à l'affiche."
    });
});
filmsRoutes.get('/disponibiliter',(req, res) =>{
    res.render('film/movie-availability', {
        title: "Films à l'affiche."
    });
});


module.exports = filmsRoutes