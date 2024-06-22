const express = require('express');
const employeeDashboardRoutes = express.Router();

//Employee dashboard 
employeeDashboardRoutes.get('/films', (req, res) => {
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
        title: 'Modifier un film.' 
    });
});

//Employee select-update film
employeeDashboardRoutes.get('/films/select-update', (req, res) => {
    res.render('layouts/dashboard/employee/selectUpdate', {
        title: 'Modifier un film.' 
    });
});

//Employee delete film
employeeDashboardRoutes.get('/films/delete', (req, res) => {
    res.render('layouts/dashboard/employee/deleteFilm', {
        title: 'Supprimer un film.' 
    });
});

module.exports = employeeDashboardRoutes;