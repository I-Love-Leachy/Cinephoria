const express = require('express');
const employeeDashboardRoutes = express.Router();

//Employee dashboard 
employeeDashboardRoutes.get('/employee', (req, res) => {
    res.render('layouts/dashboard/employee/employee', {
        title: 'Bienvenue Emily.' 
    });
});

module.exports = employeeDashboardRoutes;