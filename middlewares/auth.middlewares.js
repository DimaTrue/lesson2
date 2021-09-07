const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService } = require('../services');
const { ConfirmToken, OAuth, ResetToken } = require('../models');
const {
    configs, constants, dbTables: { USER }, strings, statusCodes
} = require('../configs');

const checkAccessToken = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, strings.INVALID_TOKEN);
        }

        await jwtService.verifyToken(token, configs.ACCESS_TOKEN_SECRET);

        const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(USER);

        if (!tokenFromDB) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, strings.INVALID_TOKEN);
        }

        req.currentUser = tokenFromDB.user;

        next();
    } catch (err) {
        next(err);
    }
};

const checkRefreshToken = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, strings.INVALID_TOKEN);
        }

        await jwtService.verifyToken(token, configs.REFRESH_TOKEN_SECRET);

        const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(USER);

        if (!tokenFromDB) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, strings.INVALID_TOKEN);
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

        await jwtService.verifyToken(confirm_token, configs.CONFIRM_TOKEN_SECRET);

        const token = await ConfirmToken.findOne({ confirm_token }).populate(USER);

        if (!token) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, strings.INVALID_TOKEN);
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

        await jwtService.verifyToken(reset_token, configs.RESET_TOKEN_SECRET);

        const token = await ResetToken.findOne({ reset_token }).populate(USER);

        if (!token) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, strings.INVALID_TOKEN);
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
