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

async function compareHashedPassword(password, hashedPassword) {
    try {
        const comparePassword = await bcrypt.compare(password, hashedPassword);
        console.log(comparePassword);
        return comparePassword; 
      } catch (err) {
        console.log(err);
        throw new Error('Comparing password failed');
      }
}

module.exports = {hashPassword, compareHashedPassword};