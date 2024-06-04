const express = require('express');
const registerRoutes = express.Router();

registerRoutes.get('/', (req, res) => {
    res.render('components/register-form');
});

module.exports = registerRoutes;