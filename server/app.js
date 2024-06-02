const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));

// Application's routes
app.get('/',(req, res) =>{
    res.redirect('/accueil');
});

app.get('/accueil',(req, res) =>{
    res.render('layouts/accueil', {title: "Bienvenue à Cinéphoria."});
});

app.get('/reservation',(req, res) =>{
    res.render('layouts/reservation', {
        title: "Réserver un film."
    });
});

app.get('/contact',(req, res) =>{
    res.render('layouts/contact', {title: "Contactez-Nous."});
});

app.get('/login',(req, res) =>{
    res.render('layouts/login', {title: "Connectez-Vous."}); 
});

app.get('/register',(req, res) =>{
    res.render('layouts/register', {title: "Inscrivez-Vous."}); 
});

module.exports = app;