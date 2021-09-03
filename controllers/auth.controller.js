const { CREATED, NO_CONTENT } = require('../configs/statusCodes.enum');
const ErrorHandler = require('../errors/ErrorHandler');
const { passwordService, jwtService } = require('../services');
const { User, OAuth } = require('../models');
const { userNormalizator } = require('../utils');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
const { WRONG_CREDENTIALS } = require('../configs/stringConstants');
const { AUTHORIZATION } = require('../configs/constants');
const { USER } = require('../configs/dbTables.enum');

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
        res.status(CREATED).json({ user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const normalizedUser = userNormalizator(req.user);
        const { password } = req.body;
        const { _id, password: hashPassword } = req.user;

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

module.exports = {
    loginController,
    logoutFromAllDevicesController,
    logoutController,
    refreshTokenController,
    signUpController
};
