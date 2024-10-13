const express = require("express");
const loginRoute = express.Router();

loginRoute.get("/", (req, res) => {
  const redirectUrl = req.query.redirect || "";
  res.render("auth/login", {
    title: "Connectez-vous à votre compte.",
    redirectUrl,
  });
});

module.exports = loginRoute;
