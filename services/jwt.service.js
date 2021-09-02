const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { UNAUTHORIZED } = require('../configs/statusCodes.enum');
const { INVALID_TOKEN } = require('../configs/stringConstants');
const {
    ACCESS, ACCESS_TOKEN_LIFE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_LIFE, REFRESH_TOKEN_SECRET
} = require('../configs/configs');

const generateTokenPair = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE });

    return {
        access_token,
        refresh_token
    };
};

const verifyToken = (token, tokenType = ACCESS) => {
    try {
        const secret = tokenType === ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

        jwt.verify(token, secret);
    } catch (err) {
        throw new ErrorHandler(UNAUTHORIZED, INVALID_TOKEN);
    }
};

module.exports = {
    generateTokenPair,
    verifyToken
};
