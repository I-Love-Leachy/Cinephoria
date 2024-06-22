require('dotenv').config({path:'../../.env'});
const JwtStrategy  = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const DB = require('../config/postgres.config');

const jwtOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ['HS256']
}

const Strategy = new JwtStrategy(jwtOption, async (jwtPayload, done) => {
try {
    const query = "SELECT * FROM users WHERE user_id = $1";
    const userResult = DB.query(query, [jwtPayload.sub]);
    if(userResult.rows.length <= 0) {
        return done(error, false, {message: 'No user found with this id.'});
    }
    const user = userResult.rows[0];
    return done(null, user);
} catch (error) {
   return done(error, false);
}
})

module.exports = (passport) => {
    passport.use(Strategy);
}