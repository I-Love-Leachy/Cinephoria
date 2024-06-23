const express = require('express');
const employeeDashboardRoutes = express.Router();
const {
    checkAuthenticated,
    checkRole,
  } = require("../../../middlewares/autorisation/autorisation");
  const {
    enrichUserWithInfo
  } = require('../../../middlewares/enrichUserWithInfo')


//employee dashboard homePage routes
employeeDashboardRoutes.get(
    "/films",
    checkAuthenticated,
    checkRole("employee"),
    enrichUserWithInfo,
    (req, res) => {
      const user = req.user.details;
      res.render("layouts/dashboard/employee/employee", {
        title: `Bienvenue ${user.first_name}.`,
      });
    }
);


//employee dashboard films routes
employeeDashboardRoutes.get(
    "/films/add",
    checkAuthenticated,
    checkRole("employee"),
    enrichUserWithInfo,
    (req, res) => {
      const user = req.user.details;
      res.render("layouts/dashboard/employee/addFilm", {
        title: `Bienvenue ${user.first_name}.`,
      });
    }
);


//Employee update film
employeeDashboardRoutes.get(
    "/films/update",
    checkAuthenticated,
    checkRole("employee"),
    enrichUserWithInfo,
    (req, res) => {
      const user = req.user.details;
      res.render("layouts/dashboard/employee/updateFilm", {
        title: `Bienvenue ${user.first_name}.`,
      });
    }
  );



//Employee update film sub page
employeeDashboardRoutes.get('/films/select-update', (req, res) => {
    res.render('layouts/dashboard/employee/selectUpdate', {
        title: 'Modifier un film.' 
    });
});


//employee dashboard delete films routes
employeeDashboardRoutes.get(
    "/films/delete",
    checkAuthenticated,
    checkRole("employee"),
    enrichUserWithInfo,
    (req, res) => {
      const user = req.user.details;
      res.render("layouts/dashboard/employee/deleteFilm", {
        title: `Bienvenue ${user.first_name}.`,
      });
    }
);




//Employee Rooms
employeeDashboardRoutes.get('/rooms', (req, res) => {
    res.render('layouts/dashboard/employee/rooms', {
        title: 'Ajouter une salle.' 
    });
});

//Employee Add Rooms
employeeDashboardRoutes.get('/rooms/add', (req, res) => {
    res.render('layouts/dashboard/employee/roomsAdd', {
        title: 'Ajouter une salle.' 
    });
});

//Employee Update Rooms
employeeDashboardRoutes.get('/rooms/update', (req, res) => {
    res.render('layouts/dashboard/employee/roomsUpdate', {
        title: 'Modifier une salle.' 
    });
});

//Employee Delete Rooms
employeeDashboardRoutes.get('/rooms/delete', (req, res) => {
    res.render('layouts/dashboard/employee/roomsDelete', {
        title: 'Supprimer une salle.' 
    });
});




//Employee Showtimes
employeeDashboardRoutes.get('/showtimes', (req, res) => {
    res.render('layouts/dashboard/employee/showtimes', {
        title: 'Ajouter une séance.' 
    });
});

//Employee Add Showtimes
employeeDashboardRoutes.get('/showtimes/add', (req, res) => {
    res.render('layouts/dashboard/employee/showtimesAdd', {
        title: 'Ajouter une séance.' 
    });
});

//Employee Update Showtimes
employeeDashboardRoutes.get('/showtimes/update', (req, res) => {
    res.render('layouts/dashboard/employee/showtimesUpdate', {
        title: 'Modifier une séance.' 
    });
});

//Employee Delete Showtimes
employeeDashboardRoutes.get('/showtimes/delete', (req, res) => {
    res.render('layouts/dashboard/employee/showtimesDelete', {
        title: 'Supprimer une séance.' 
    });
});


//Employee Reviews
employeeDashboardRoutes.get('/reviews', (req, res) => {
    res.render('layouts/dashboard/employee/reviews', {
        title: 'Ajouter un avis.' 
    });
});



module.exports = employeeDashboardRoutes;