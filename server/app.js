require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const configurePassportJWT = require('./config/passport.jwt.config');
const { checkUser } = require('./middlewares/enrichUserWithInfo');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const cors = require('cors');

const accueilRoutes = require('./routes/accueil/accueil.routes');
const filmsRoutes = require('./routes/film/films.routes');
const reservationRoutes = require('./routes/reservation/reservation.routes');
const contactRoutes = require('./routes/contact/contact.routes');
const loginRoutes = require('./routes/components/login.routes');
const registerRoutes = require('./routes/components/register.routes');
const userDashboardRoutes = require('./routes/dashboard/user/userDashboard.routes');
const resetPasswordRoutes = require('./routes/resetPassword/resetPass.routes');
const employeeDashboardRoutes = require('./routes/dashboard/employee/employeeDashboard.routes');
const adminDashboardRoutes = require('./routes/dashboard/admin/adminDashboard.routes');

//components routes
const theater = require('./routes/components/theater.routes')

// API routes
const usersRoutes = require('./api/users/users.routes');
const moviesRoutes = require('./api/movies/movies.routes');
const cinemasRoutes = require('./api/cinemas/cinemas.routes');
const incidentRoutes = require('./api/incident/incident.routes');
const reservationApiRoutes = require('./api/reservation/reservation.routes');
const reviewsRoutes = require('./api/reviews/reviews.routes');
const roomsRoutes = require('./api/rooms/rooms.routes');
const seatsRoutes = require('./api/seats/seats.routes');
const showtimesRoutes = require('./api/showtimes/showtimes.routes');
const resetPassApiRoutes = require('./api/resetPassword/resetPassApi.routes');
const assignRouter = require('./api/assign/assignRouter.routes');

// Login & Logout APIs
const authRouter = require('./auth/login.api');
const logoutRouter = require('./auth/logout.api');

const app = express();

// Utilisation de CORS pour autoriser les requêtes provenant de toutes les origines
app.use(cors());

// Middleware pour gérer les types MIME des fichiers CSS et JS
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.type('text/css');
    } else if (req.url.endsWith('.js')) {
        res.type('text/javascript');
    }
    next();
});

app.use(methodOverride('_method'));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/dashboard', express.static(path.join(__dirname, '..', 'client', 'public')));
app.use(express.json());

//form components routes
app.use("/", loginRoutes);
app.use("/", registerRoutes);
app.use("/", theater);

app.use(passport.initialize());
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
configurePassportJWT(passport);

app.use(checkUser);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Application's routes
app.get('/', (req, res) => {
    res.redirect('/accueil');
});

app.use('/accueil', accueilRoutes);
app.use('/films', filmsRoutes);
app.use('/reservation', reservationRoutes);
app.use('/contact', contactRoutes);

app.get('/login', (req, res) => {
    res.render('auth/login', {
        title: "Connectez-vous à votre compte."
    });
});

app.use('/reset', resetPasswordRoutes);

// Dashboard's routes
app.get('/dashboard/employee', (req, res) => {
    res.redirect('/dashboard/employee/films');
});
app.use('/dashboard', userDashboardRoutes);
app.use('/dashboard/employee', employeeDashboardRoutes);
app.use('/dashboard/admin', adminDashboardRoutes);

// API routes
app.use('/api/v1', usersRoutes);
app.use('/api/v1', moviesRoutes);
app.use('/api/v1', cinemasRoutes);
app.use('/api/v1', incidentRoutes);
app.use('/api/v1', reservationApiRoutes);
app.use('/api/v1', reviewsRoutes);
app.use('/api/v1', roomsRoutes);
app.use('/api/v1', seatsRoutes);
app.use('/api/v1', showtimesRoutes);
app.use('/api/v1', resetPassApiRoutes);
app.use("/api/v1", assignRouter);

// Login & Logout API
app.use('/api/v1', authRouter);
app.use('/api/v1', logoutRouter);

// Form components routes 
app.use('/components/login-form.ejs', loginRoutes);
app.use('/components/register-form.ejs', registerRoutes);

module.exports = app;
