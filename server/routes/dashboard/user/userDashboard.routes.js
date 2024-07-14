const express = require("express");
const userDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo
} = require('../../../middlewares/enrichUserWithInfo');
const {
  getReservationByUserId
} = require('../../../controllers/reservations/reservation.controller');
const {
  getMovieById
} = require('../../../controllers/movies/movies.controller')
const decodeData = require('../../../services/decodeData.services');

//users dashboard homePage routes
userDashboardRoutes.get(
  "/",
  checkAuthenticated,
  checkRole("user"),
  enrichUserWithInfo,
  async (req, res) => {
    const user = req.user.details
    const userId = req.user.sub
    const reservation = await getReservationByUserId(userId);
    const decReservation = decodeData(reservation)
    res.render("layouts/dashboard/users/users", {
      title: `Bienvenue ${user.first_name}.`,
      reservations: decReservation
    });
  }
);

//users dashboard get review form routes
userDashboardRoutes.get(
  "/reviews-form/:id",
  checkAuthenticated,
  checkRole("user"),
  enrichUserWithInfo,
  async (req, res) => {
    const movies = await getMovieById(req, res);
    const decMovies = decodeData(movies);
    res.render("layouts/dashboard/users/reviewForm", {
      title: `Laisser un avis.`,
      currentPath: req.path,
      movies: decMovies
    });
  }
);

// user reset password routes
userDashboardRoutes.get(
  "/reset-pass/:id",
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
