require('dotenv').config({ path: '../../../.env' });

const { compareHashedPassword } = require('../../utils/hashPassword');
const jwtToken = require('jsonwebtoken');
const DB = require('../../config/postgres.config');

async function authUser(req, res) {
    try {
        const { email, password } = req.body;
        const findUserQuery = "SELECT * FROM users WHERE email = $1";
        const { rows } = await DB.query(findUserQuery, [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User mail not found.' });
        }
        const user = rows[0];
        const verifyPassword = await compareHashedPassword(password, user.password);
        if (!verifyPassword) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }
        const token = jwtToken.sign(
            {
                sub: user.user_id,
                role: user.role
            },
            process.env.JWT_SECRET, 
            {
                expiresIn: '1h',
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 1 * 60 * 60 * 1000,
        });

        if (req.headers['x-react-native-request']) {
            // Réponse JSON pour les requêtes React Native
            return res.status(200).json({
                message: 'user logged in.',
                accessToken: token
            });
        } else {
            // Réponse pour les requêtes web avec redirection
            let redirectUrl = null;
            if (user.must_change_password) {
                switch (user.role) {
                    case "user":
                        redirectUrl = '/dashboard/user/reset-pass';
                        break;
                    case "admin":
                        redirectUrl = '/dashboard/admin/reset-pass';
                        break;
                    case "employee":
                        redirectUrl = '/dashboard/employee/reset-pass';
                        break;
                }
            } else {
                switch (user.role) {
                    case 'admin':
                        redirectUrl = '/dashboard/admin';
                        break;
                    case 'employee':
                        redirectUrl = '/dashboard/employee';
                        break;
                    case 'user':
                        redirectUrl = '/dashboard/user';
                        break;
                }
            }

            console.log("User logged in, token:", token);

            return res.status(200).json({
                message: 'user logged in.',
                accessToken: token,
                redirectUrl: redirectUrl
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { authUser };
