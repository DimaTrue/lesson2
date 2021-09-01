const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG_SIGNUP, WRONG_LOGIN } = require('../configs/stringConstants');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
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

module.exports = {
    isValidUserData,
    isValidLogin
};
