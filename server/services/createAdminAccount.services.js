require('dotenv').config({path:'../.env'});
const{ hashPassword } = require('../utils/hashPassword');
const DB = require('../config/postgres.config');


async function createAdminAccount(first_name, last_name, email, password) {
    try {
        const hashedPassword = await hashPassword(password);
        const query = "INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4,'admin')";
        await DB.query(query, [first_name, last_name, email, hashedPassword]);
        console.log('Admin account created.');
    } catch (error) {
        console.log('Error with admin account creation', error);
    }
}

const first_name = process.argv[2];
const last_name = process.argv[3];
const email = process.argv[4];
const password = process.argv[5];
console.log(process.argv[2])

if (!first_name || !last_name || !email || !password) {
    console.log('Please provide all fields')
} else {
    createAdminAccount(first_name, last_name, email, password);
}
