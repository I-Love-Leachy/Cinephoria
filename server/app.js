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
const usersRoutes = require('./routes/users/users.routes');


const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));

// Application's routes
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

//form components routes 
app.use('/components/login-form.ejs', loginRoutes);
app.use('/components/register-form.ejs', registerRoutes);

module.exports = app;