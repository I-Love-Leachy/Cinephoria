const express = require('express');
const userDashboardRoutes = express.Router();

userDashboardRoutes.get('/users', (req, res) => {
    res.render('layouts/dashboard/users/users', {
        title: 'Bienvenue Jean.'
    });
});

module.exports = userDashboardRoutes;
