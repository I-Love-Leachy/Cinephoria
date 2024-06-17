require('dotenv').config({path: '../../../.env'});
const jwt = require('jsonwebtoken');

function checkAuthenticated(req, res, next){
    const token = req.cookies.token;
    if(!token){
        console.log('No token found, redirecting to login');
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}

function checkRole(role){
    return(req, res, next) => {
        if(req.user.role === role){
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = { checkAuthenticated, checkRole };