const express = require("express");
const logoutRouter = express.Router();

logoutRouter.post("/logout", (req, res) => {
    console.log('Deconnection wanted');
    res.clearCookie('token');
    res.redirect('/accueil')
});

module.exports = logoutRouter;