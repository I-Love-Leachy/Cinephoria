require('dotenv').config({path:'../.env'});
const http = require('http');
const app = require('../server/app.js');
const PORT = 3000;
const mongoose = require('mongoose');
const connectDB = require('./config/mongodb.config.js');

const server = http.createServer(app);

// Écouter sur toutes les interfaces réseau
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Le serveur écoute sur http://0.0.0.0:${PORT}`)
    connectDB();
});
