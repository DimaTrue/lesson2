const ErrorHandler = require('../errors/ErrorHandler');
const regExpHelper = require('../helpers/stringValidation');
const { User } = require('../models');
const { EMAIL_ALREADY_EXIST, WRONG_SIGNUP, WRONG_LOGIN } = require('../configs/stringConstants');
const { BAD_REQUEST, CONFLICT } = require('../configs/statusCodes.enum');

module.exports = {

    isValidForm: (req, res, next) => {
        const {
            name, age, email, password
        } = req.body;

        try {
            if (!regExpHelper.checkIsValidRegister(name, age, email, password)) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_SIGNUP);
            }
            next();
        } catch (err) {
            next(err);
        }
    },

    isValidLogin: (req, res, next) => {
        const { email, password } = req.body;

        try {
            if (!regExpHelper.checkIsValidLogin(email, password)) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_LOGIN);
            }
            next();
        } catch (err) {
            next(err);
        }
    },

    isEmailExist: async (req, res, next) => {
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
    }

};
