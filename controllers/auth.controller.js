const { CREATED, NO_CONTENT, FORBIDDEN } = require('../configs/statusCodes.enum');
const ErrorHandler = require('../errors/ErrorHandler');
const { emailService, passwordService, jwtService } = require('../services');
const { ConfirmToken, User, OAuth } = require('../models');
const { userNormalizator, getCurrentYear } = require('../utils');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
const { NOT_CONFIRMED, WRONG_CREDENTIALS, INVALID_TOKEN } = require('../configs/stringConstants');
const { AUTHORIZATION } = require('../configs/constants');
const { USER } = require('../configs/dbTables.enum');
const emailActionsEnum = require('../configs/emailActions.enum');
const configs = require('../configs/configs');

const signUpController = async (req, res, next) => {
    const {
        name, age, email, password, role
    } = req.body;

    try {
        const hashPassword = await passwordService.createHash(password);

        const user = await User.create({
            name, age, email, role, password: hashPassword
        });

        const normalizedUser = userNormalizator(user);

        const confirm_token = jwtService.generateConfirmToken();

        await ConfirmToken.create({
            confirm_token,
            [USER]: user._id
        });

        await emailService.sendMail(
            email,
            emailActionsEnum.WELCOME,
            {
                userName: name,
                currentYear: getCurrentYear(),
                frontendUrl: `${configs.FRONTEND_URL}confirm?confirm_token=${confirm_token}`
            }
        );
        res.status(CREATED).json({ user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const normalizedUser = userNormalizator(req.user);
        const { password } = req.body;
        const { _id, confirmed, password: hashPassword } = req.user;

        if (!confirmed) {
            throw new ErrorHandler(FORBIDDEN, NOT_CONFIRMED);
        }

        const isPasswordCorrect = await passwordService.comparePassword(password, hashPassword);

        if (!isPasswordCorrect) {
            throw new ErrorHandler(BAD_REQUEST, WRONG_CREDENTIALS);
        }

        const tokenPair = jwtService.generateTokenPair();

        await OAuth.create({ ...tokenPair, user: _id });

        res.json({ ...tokenPair, user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

const logoutController = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        await OAuth.deleteOne({ access_token: token });

        res.sendStatus(NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const logoutFromAllDevicesController = async (req, res, next) => {
    try {
        const { currentUser } = req;

        await OAuth.deleteMany({ [USER]: currentUser });

        res.sendStatus(NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const refreshTokenController = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);
        const { currentUser } = req;
        const normalizedUser = userNormalizator(currentUser);

        const tokenPair = jwtService.generateTokenPair();

        await OAuth.updateOne(
            { refresh_token: token },
            {
                $set: { ...tokenPair }
            }
        );

        res.json({
            ...tokenPair,
            user: normalizedUser
        });
    } catch (err) {
        next(err);
    }
};

const confirmController = async (req, res, next) => {
    try {
        const { confirm_token } = req.query;

        await jwtService.verifyToken(confirm_token, configs.CONFIRM_TOKEN_SECRET);

        const token = await ConfirmToken.findOne({ confirm_token }).populate(USER);

        if (!token) {
            throw new ErrorHandler(BAD_REQUEST, INVALID_TOKEN);
        }

        token.user.confirmed = true;
        await token.user.save();

        await ConfirmToken.deleteMany({ [USER]: token.user._id });

        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    confirmController,
    loginController,
    logoutFromAllDevicesController,
    logoutController,
    refreshTokenController,
    signUpController
};
