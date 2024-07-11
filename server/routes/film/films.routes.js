const express = require('express');
const filmsRoutes = express.Router();
const {
    getLastWedMovies,
    getMovies,
    getMoviesAverageRating,
    getMovieById
  } = require("../../controllers/movies/movies.controller");
  const {
    getShowtimesWithMovies,
    getShowtimesByFilm,
    getShowtimesByCinema,
    getShowtimes,
  } = require("../../controllers/showtimes/showtimes.controller");
  const { getCinemas } = require("../../controllers/cinemas/cinemas.controller");
  const decodeData = require("../../services/decodeData.services");
  const {
    getReviewsByMovieId
  } = require('../../controllers/reviews/reviews.controller')
  const {
    filterMovies,
    filterShowtimes
  } = require('../../services/filterMoviesService')

  filmsRoutes.get("/", async (req, res) => {
    try {
      const { genres, days, qualities, cinemaId } = req.query;
      let showtimes = [];
  
      if (cinemaId) {
        showtimes = await getShowtimesByCinema(cinemaId);
      } else {
        showtimes = await getShowtimes();
      }
  
      if (genres || days || qualities) {
        showtimes = filterShowtimes(showtimes, genres, days, qualities);
      }
  
      const lastMovies = await getLastWedMovies(req, res);
      const movies = await getMovies(req, res);
      const cinemas = await getCinemas(req, res);
      const decLastMovies = decodeData(lastMovies);
      const decMovies = decodeData(movies);
      const decShowtimes = decodeData(showtimes);
      console.log(decShowtimes)
      const filteredMovies = filterMovies(decLastMovies, genres, days, qualities);
      console.log(filterMovies)
      const filterCurrentMovies = filterMovies(decMovies, genres, days, qualities);
      console.log(filterCurrentMovies)
   
     
  
      res.render("layouts/films", {
        title: "Les derniers films disponible.",
        lastMovies: filteredMovies,
        cinemas: cinemas,
        showtimes: decShowtimes,
        movies: filterCurrentMovies,
        cinemaId: cinemaId || "",
        currentLocation: req.path,
      });
    } catch (err) {
      console.log("Error while fetching last Wednesday movies:", err);
      res.status(500).render("error", { error: "Internal server error" });
    }
  });

filmsRoutes.get('/disponibiliter',(req, res) =>{
    res.render('film/movie-availability', {
        title: "Films à l'affiche."
    });
});


module.exports = filmsRoutes;