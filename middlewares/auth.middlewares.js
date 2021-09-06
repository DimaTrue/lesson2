const ErrorHandler = require('../errors/ErrorHandler');
const { UNAUTHORIZED } = require('../configs/statusCodes.enum');
const { INVALID_TOKEN } = require('../configs/stringConstants');

const { AUTHORIZATION } = require('../configs/constants');
const { jwtService } = require('../services');
const { OAuth } = require('../models');
const { USER } = require('../configs/dbTables.enum');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs/configs');

const checkAccessToken = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(UNAUTHORIZED, INVALID_TOKEN);
        }

        await jwtService.verifyToken(token, ACCESS_TOKEN_SECRET);

        const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(USER);

        if (!tokenFromDB) {
            throw new ErrorHandler(UNAUTHORIZED, INVALID_TOKEN);
        }

        req.currentUser = tokenFromDB.user;

        next();
    } catch (err) {
        next(err);
    }
};

const checkRefreshToken = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(UNAUTHORIZED, INVALID_TOKEN);
        }

        await jwtService.verifyToken(token, REFRESH_TOKEN_SECRET);

        const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(USER);

        if (!tokenFromDB) {
            throw new ErrorHandler(UNAUTHORIZED, INVALID_TOKEN);
        }

        req.currentUser = tokenFromDB.user;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    checkAccessToken,
    checkRefreshToken,
};
