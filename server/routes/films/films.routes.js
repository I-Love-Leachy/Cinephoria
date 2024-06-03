const express = require('express');
const filmRoutes = express.Router();

filmRoutes.get('/',(req, res) =>{
    res.render('layouts/films', {
        title: "Films à l'affiche."
    });
});

module.exports = filmRoutes;