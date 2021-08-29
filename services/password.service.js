const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
const { WRONG_CREDENTIALS } = require('../configs/stringConstants');

const createHash = (password) => bcrypt.hash(password, 10);

const comparePassword = async (pass, hashPass) => {
    const isPasswordCorrect = await bcrypt.compare(pass, hashPass);

    if (!isPasswordCorrect) {
        throw new ErrorHandler(BAD_REQUEST, WRONG_CREDENTIALS);
    }

    return isPasswordCorrect;
};

module.exports = {
    createHash,
    comparePassword
};
