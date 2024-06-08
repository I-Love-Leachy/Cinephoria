const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        console.log(err);
    }
}

module.exports = hashPassword;