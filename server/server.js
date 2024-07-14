require('dotenv').config({path:'../.env'});
const http = require('http');
const app = require('../server/app.js');
const PORT = 3000;
const mongoose = require('mongoose');

const server = http.createServer(app);

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée', err));

// Écouter sur toutes les interfaces réseau
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Le serveur écoute sur http://0.0.0.0:${PORT}`)
});
