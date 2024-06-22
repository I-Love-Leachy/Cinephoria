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

//Employee update film sub page
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




//Employee Rooms
employeeDashboardRoutes.get('/rooms', (req, res) => {
    res.render('layouts/dashboard/employee/rooms', {
        title: 'Ajouter une salle.' 
    });
});

//Employee Add Rooms
employeeDashboardRoutes.get('/rooms/add', (req, res) => {
    res.render('layouts/dashboard/employee/roomsAdd', {
        title: 'Ajouter une salle.' 
    });
});

//Employee Update Rooms
employeeDashboardRoutes.get('/rooms/update', (req, res) => {
    res.render('layouts/dashboard/employee/roomsUpdate', {
        title: 'Modifier une salle.' 
    });
});

//Employee Delete Rooms
employeeDashboardRoutes.get('/rooms/delete', (req, res) => {
    res.render('layouts/dashboard/employee/roomsDelete', {
        title: 'Supprimer une salle.' 
    });
});




//Employee Showtimes
employeeDashboardRoutes.get('/showtimes', (req, res) => {
    res.render('layouts/dashboard/employee/showtimes', {
        title: 'Ajouter une séance.' 
    });
});

//Employee Add Showtimes
employeeDashboardRoutes.get('/showtimes/add', (req, res) => {
    res.render('layouts/dashboard/employee/showtimesAdd', {
        title: 'Ajouter une séance.' 
    });
});

//Employee Update Showtimes
employeeDashboardRoutes.get('/showtimes/update', (req, res) => {
    res.render('layouts/dashboard/employee/showtimesUpdate', {
        title: 'Modifier une séance.' 
    });
});

//Employee Delete Showtimes
employeeDashboardRoutes.get('/showtimes/delete', (req, res) => {
    res.render('layouts/dashboard/employee/showtimesDelete', {
        title: 'Supprimer une séance.' 
    });
});


//Employee Reviews
employeeDashboardRoutes.get('/reviews', (req, res) => {
    res.render('layouts/dashboard/employee/reviews', {
        title: 'Ajouter un avis.' 
    });
});



module.exports = employeeDashboardRoutes;