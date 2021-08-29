const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../models');
const { EMAIL_ALREADY_EXIST, WRONG_SIGNUP, WRONG_LOGIN } = require('../configs/stringConstants');
const { BAD_REQUEST, CONFLICT } = require('../configs/statusCodes.enum');
const { loginValidator, signupValidator, } = require('../validators');

const isValidUserData = (req, res, next) => {
    try {
        const { error } = signupValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, `${WRONG_SIGNUP} ${error.details[0].message}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const isValidLogin = (req, res, next) => {
    try {
        const { error } = loginValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, `${WRONG_LOGIN} ${error.details[0].message}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const isEmailExist = async (req, res, next) => {
    try {
        const { email = '' } = req.body;

        const userByEmail = await User.findOne({ email: email.trim() });

        if (userByEmail) {
            throw new ErrorHandler(CONFLICT, EMAIL_ALREADY_EXIST);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const isAccountExist = async (req, res, next) => {
    try {
        const { email = '' } = req.body;

        const user = await User.findOne({ email: email.trim() });

        if (!user) {
            throw new ErrorHandler(BAD_REQUEST, WRONG_LOGIN);
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    isValidUserData,
    isValidLogin,
    isEmailExist,
    isAccountExist,
};
