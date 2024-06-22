const express = require('express');
const employeeDashboardRoutes = express.Router();

//Employee dashboard 
employeeDashboardRoutes.get('/', (req, res) => {
    res.render('layouts/dashboard/employee/employee', {
        title: 'Bienvenue Emily.' 
    });
});

//Employee add film
employeeDashboardRoutes.get('/films/add', (req, res) => {
    res.render('layouts/dashboard/employee/addFilm', {
        title: 'Ajouter un film.' 
    });
});

//Employee update film
employeeDashboardRoutes.get('/films/update', (req, res) => {
    res.render('layouts/dashboard/employee/updateFilm', {
        title: 'Ajouter un film.' 
    });
});

module.exports = employeeDashboardRoutes;