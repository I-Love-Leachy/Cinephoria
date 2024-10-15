const express = require("express");
const loginRoutes = express.Router();

loginRoutes.get("/components/login-form.ejs", (req, res) => {
  const redirectUrl = req.query.redirect || "";
  res.render("components/login-form", { redirectUrl });
});

module.exports = loginRoutes;
