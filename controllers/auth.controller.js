const { CREATED } = require('../configs/statusCodes.enum');
const ErrorHandler = require('../errors/ErrorHandler');
const { passwordService } = require('../services');
const { User } = require('../models');
const { userNormalizator } = require('../utils');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
const { WRONG_CREDENTIALS } = require('../configs/stringConstants');

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
        const { password: hashPassword } = req.user;

        const isPasswordCorrect = await passwordService.comparePassword(password, hashPassword);

        if (!isPasswordCorrect) {
            throw new ErrorHandler(BAD_REQUEST, WRONG_CREDENTIALS);
        }

        res.json({ user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signUpController,
    loginController
};
