const bcrypt = require('bcrypt');

const createHash = (password) => bcrypt.hash(password, 10);

const comparePassword = async (pass, hashPass) => {
    const isPasswordCorrect = await bcrypt.compare(pass, hashPass);

    return isPasswordCorrect;
};

module.exports = {
    createHash,
    comparePassword
};
