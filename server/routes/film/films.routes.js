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

  filmsRoutes.get("/disponibiliter/:id", async (req, res) => {
    const filmId = req.params.id;
  
    try {
      const movie = await getMovieById(req, res);
      const cinemas = await getCinemas(req, res);
      const showtimes = await getShowtimesByFilm(filmId);
      const reviews = await getReviewsByMovieId(req, res) || [];
      const rating = await getMoviesAverageRating(filmId);
      console.log(rating);
  
      if (!movie || !cinemas || !showtimes) {
        throw new Error("Data fetch error");
      }
  
      const confirmedReviews = reviews.filter(review => review.status === true);
      const decReviews = decodeData(confirmedReviews);
  
      const frenchCinemas = cinemas.filter(cinema => cinema.country.toLowerCase() === 'france');
      const cinemaShowtimes = frenchCinemas.map(cinema => {
        const cinemaShowtime = showtimes.find(show => show.cinema_id === cinema.cinema_id);
        return {
          ...cinema,
          showtimes: cinemaShowtime ? cinemaShowtime.showtimes : null
        };
      });
  
      const decMovies = decodeData(movie);
      res.render("film/movie-availability", {
        title: "Les derniers films disponible.",
        movie: decMovies,
        cinemas: cinemaShowtimes,
        filmId: filmId,
        reviews: decReviews,
        rating: rating
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error!" });
    }
  });


module.exports = filmsRoutes;