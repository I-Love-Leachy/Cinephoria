const express = require("express");
const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
  const redirectUrl = req.query.redirect || '';
  res.render("components/login-form", { redirectUrl });
});

module.exports = loginRoutes;