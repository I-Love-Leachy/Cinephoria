const express = require('express');
const userDashboardRoutes = express.Router();

userDashboardRoutes.get('/users', (req, res) => {
    res.render('layouts/dashboard/users/users', {
        title: 'Bienvenue Jean.'
    });
});

userDashboardRoutes.get('/users/reviews', (req, res) => {
    res.render('layouts/dashboard/users/users-reviews', {
        title: 'Laisser un avis.'
    });
});

module.exports = userDashboardRoutes;
