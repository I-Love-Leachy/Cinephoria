require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const accueilRoutes = require('./routes/accueil/accueil.routes');
const filmsRoutes = require('./routes/film/films.routes');
const reservationRoutes = require('./routes/reservation/reservation.routes');
const contactRoutes = require('./routes/contact/contact.routes');
const loginRoutes = require('./routes/components/login.routes');
const registerRoutes = require('./routes/components/register.routes');


//Api routes
const usersRoutes = require('./api/users/users.routes');
const moviesRoutes = require('./api/movies/movies.routes');
const cinemasRoutes = require('./api/cinemas/cinemas.routes');
const incidentRoutes = require('./api/incident/incident.routes');
const reservationApiRoutes = require('./api/reservation/reservation.routes');
const reviewsRoutes = require('./api/reviews/reviews.routes');
const roomsRoutes = require('./api/rooms/rooms.routes');
const seatsRoutes = require('./api/seats/seats.routes');
const showtimesRoutes = require('./api/showtimes/showtimes.routes');

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));

//Application's routes
app.get('/',(req, res) =>{
    res.redirect('/accueil');
});

app.use('/accueil', accueilRoutes);
app.use('/films', filmsRoutes);
app.use('/reservation', reservationRoutes);
app.use('/contact', contactRoutes);

app.get('/login',(req, res) =>{
    res.render('auth/login', {
        title: "Connectez-vous à votre compte."
    });
});

//API routes
app.use('/api/v1', usersRoutes);
app.use('/api/v1', moviesRoutes);
app.use('/api/v1', cinemasRoutes);
app.use('/api/v1', incidentRoutes);
app.use('/api/v1', reservationApiRoutes);
app.use('/api/v1', reviewsRoutes);
app.use('/api/v1', roomsRoutes);
app.use('/api/v1', seatsRoutes);
app.use('/api/v1', showtimesRoutes);


//Form components routes 
app.use('/components/login-form.ejs', loginRoutes);
app.use('/components/register-form.ejs', registerRoutes);

module.exports = app;