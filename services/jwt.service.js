const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { configs, statusCodes, strings } = require('../configs');

const generateTokenPair = () => {
    const access_token = jwt.sign({}, configs.ACCESS_TOKEN_SECRET, { expiresIn: configs.ACCESS_TOKEN_LIFE });
    const refresh_token = jwt.sign({}, configs.REFRESH_TOKEN_SECRET, { expiresIn: configs.REFRESH_TOKEN_LIFE });

    return {
        access_token,
        refresh_token
    };
};

const generateConfirmToken = () => {
    const confirmToken = jwt.sign({}, configs.CONFIRM_TOKEN_SECRET, { expiresIn: configs.CONFIRM_TOKEN_LIFE });

    return confirmToken;
};

const generateResetToken = () => {
    const confirmToken = jwt.sign({}, configs.RESET_TOKEN_SECRET, { expiresIn: configs.RESET_TOKEN_LIFE });

    return confirmToken;
};

const verifyToken = (token, secret) => {
    try {
        jwt.verify(token, secret);
    } catch (err) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, strings.INVALID_TOKEN);
    }
};

module.exports = {
    generateConfirmToken,
    generateResetToken,
    generateTokenPair,
    verifyToken
};
