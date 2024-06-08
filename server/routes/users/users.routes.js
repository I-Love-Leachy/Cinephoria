const express = require('express');
const usersRoutes = express.Router();
const {getUsers, getUserById, deleteUserById, postUser, updateUserById} = require('../../controllers/users/users.controllers');


//get all Users
usersRoutes.get('/users', getUsers);

//get user by id 
usersRoutes.get('/users/:id', getUserById);

//Delete user by id
usersRoutes.delete('/users/:id', deleteUserById);

//Post user by id
usersRoutes.post('/users', postUser);

//Update user by id
usersRoutes.put('/users/:id', updateUserById);

module.exports = usersRoutes;