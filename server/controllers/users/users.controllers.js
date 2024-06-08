const DB = require('../../config/postgres.config');
const hashPassword = require('../../utils/hashPassword');

async function getUsers(req, res) {
    try {
        const query = 'SELECT * FROM users';
        const results = await DB.query(query);
        if(results.rows.length <= 0) {
            res.status(404).send('No users found !');
            return;
        }
        res.status(200).send(results.rows)
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal server error !')
    }
}

async function getUserById(req, res) {
    try {
    const id = req.params.id;
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const results = await DB.query(query, [id]);
    if (results.rows.length <= 0) {
        res.status(404).send('No user id found !');
        return;
    }
    res.status(200).send(results.rows);
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal server error !')
    }
}

async function deleteUserById(req, res) {
    try {
        const id = req.params.id;
        const foundUserQuery = 'SELECT * FROM users WHERE user_id = $1';
        const user = await DB.query(foundUserQuery, [id]);
        if (user.rows.length !== 0) {
            const query = 'DELETE FROM users WHERE user_id = $1';
            await DB.query(query, [id]);
            return res.status(200).send('User deleted successfully !');
        } else {
            return res.status(404).send('No user id found !'); 
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal server error !')
    }
}

async function postUser(req, res) {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (!first_name || !last_name || !email || !password || !role) {
            return res.status(400).send('All fields are required');
        }

        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result = await DB.query(query, [first_name, last_name, email, hashedPassword, role]);

        res.status(201).json(result.rows[0]); 
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal server error');
    }
}

async function updateUserById(req, res) {
    const id = req.params.id;
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (first_name || last_name || email || password || role) {
            const hashedPassword = await hashPassword(password);
            const query = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, role = $5 WHERE user_id = $6 RETURNING *';
            const result = await DB.query(query, [first_name, last_name, email, hashedPassword, role, id]);
    
            res.status(201).json(result.rows[0]);
        } else {
            res.status(400).send('All fields are required');
        }

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal server error');
    }
}


module.exports = { getUsers, getUserById, deleteUserById, postUser, updateUserById };