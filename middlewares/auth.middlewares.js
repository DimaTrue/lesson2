const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST, UNAUTHORIZED } = require('../configs/statusCodes.enum');
const { INVALID_TOKEN } = require('../configs/stringConstants');
const { AUTHORIZATION } = require('../configs/constants');
const { jwtService } = require('../services');
const { ConfirmToken, OAuth, ResetToken } = require('../models');
const { USER } = require('../configs/dbTables.enum');
const {
    ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CONFIRM_TOKEN_SECRET, RESET_TOKEN_SECRET
} = require('../configs/configs');

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

const checkConfirmToken = async (req, res, next) => {
    try {
        const { confirm_token } = req.query;

        await jwtService.verifyToken(confirm_token, CONFIRM_TOKEN_SECRET);

        const token = await ConfirmToken.findOne({ confirm_token }).populate(USER);

        if (!token) {
            throw new ErrorHandler(BAD_REQUEST, INVALID_TOKEN);
        }

        req.confirmUser = token.user;

        next();
    } catch (err) {
        next(err);
    }
};

const checkResetToken = async (req, res, next) => {
    try {
        const { reset_token } = req.query;

        await jwtService.verifyToken(reset_token, RESET_TOKEN_SECRET);

        const token = await ResetToken.findOne({ reset_token }).populate(USER);

        if (!token) {
            throw new ErrorHandler(BAD_REQUEST, INVALID_TOKEN);
        }

        req.resetPassUser = token.user;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    checkAccessToken,
    checkConfirmToken,
    checkRefreshToken,
    checkResetToken
};
