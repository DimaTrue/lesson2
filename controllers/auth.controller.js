const { CREATED, BAD_REQUEST } = require('../configs/statusCodes.enum');
const { ACCOUNT_CREATED, WRONG_LOGIN } = require('../configs/stringConstants');
const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../models');

module.exports = {

    signUpController: async (req, res, next) => {
        const {
            name, age, email, password
        } = req.body;

        try {
            await User.create({
                name, age, email, password
            });

            res.status(CREATED).json({ message: ACCOUNT_CREATED });
        } catch (err) {
            next(err);
        }
    },

    loginController: async (req, res, next) => {
        const { email = '' } = req.body;

        try {
            const user = await User.findOne({ email: email.trim() });

            if (!user) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_LOGIN);
            }

            res.redirect('/users');
        } catch (err) {
            next(err);
        }
    }

};
