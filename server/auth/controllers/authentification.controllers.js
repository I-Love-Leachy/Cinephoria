require('dotenv').config({path: '../../../.env'});

const { compareHashedPassword } = require('../../utils/hashPassword');
const jwtToken = require('jsonwebtoken');
const DB = require('../../config/postgres.config');

async function authUser(req, res){
    try {
        const {email, password} = req.body;
        const findUserQuery = "SELECT * FROM users WHERE email = $1";
        const {rows} = await DB.query(findUserQuery, [email]);
        if(rows.length < 0) {
            return res.status(404).json({message: 'User mail not found.'});
        }
        const user = rows[0];
        const verifyPassword = await compareHashedPassword(password, user.password);
        if(!verifyPassword) {
            return res.status(401).json({message: 'Incorrect password.'});
        }
        const token = jwtToken.sign(
            {
                sub: user.user_id,
                role: user.role
            },
                process.env.jwt_secret, 
            {
                expiresIn: '1h',
            }
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 1*60*60*1000,
        });

        switch (user.role) {
            case 'admin':
                return res.redirect('/dashboard/admin');
            case 'employee':
                return res.redirect('/dashboard/employee');
            case 'user':
                return res.redirect('/dashboard/user');
        }

        return res.status(200).json({message:'user logged in.', accessToken: token});

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

module.exports = { authUser };