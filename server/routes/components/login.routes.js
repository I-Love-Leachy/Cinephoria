const express = require('express');
const loginRoutes = express.Router();

loginRoutes.get('/', (req, res) => {
    res.render('components/login-form');
});

module.exports = loginRoutes;