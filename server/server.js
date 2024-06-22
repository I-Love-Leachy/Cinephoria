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

server.listen(PORT, () => {
    console.log(`Vous êtes connecté au port ${PORT}`)
});