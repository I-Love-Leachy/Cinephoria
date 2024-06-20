const express = require('express');
const userDashboardRoutes = express.Router();


const {
    checkAuthenticated,
    checkRole,
  } = require("../../../middlewares/autorisation/autorisation");

  const { enrichUserWithInfo } = require("../../../middlewares/enrichUserWithInfo")

userDashboardRoutes.get('/user', (req, res) => {
    res.render('layouts/dashboard/users/users', {
        title: 'Bienvenue Jean.'
    });
});

//users dashboard get review form routes
userDashboardRoutes.get(
  '/user/reviews-form',
  checkAuthenticated,
  checkRole("user"),
  enrichUserWithInfo,
  (req, res) => {
    res.render('layouts/dashboard/users/reviewForm', {
      title: `Laisser un avis.`,
      currentPath: req.path
    });
  }
);

// user reset password routes
userDashboardRoutes.get(
    "/user/reset-pass",
    checkAuthenticated,
    checkRole("user"),
    (req, res) => {
      const userId = req.user.sub;
      res.render("layouts/dashboard/users/userResetPass", {
        title: "Réinitialiser votre mot de passe..",
        id: userId,
      });
    }
  );

module.exports = userDashboardRoutes;
